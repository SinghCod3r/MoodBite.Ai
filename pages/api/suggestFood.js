/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { classifyIntent, INTENTS } from '../../lib/intent/classifier';
import { analyzeEmotion } from '../../lib/emotion/analyzer';
import { generateRecommendation } from '../../lib/recommendation/engine';
import { getUserProfile } from '../../lib/user/profile';
import { recordMoodEvent, recordFoodEvent, getUserHistory } from '../../lib/user/history';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { text, ingredients, userId = 'guest', userConstraints = {} } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ message: 'Text input is required' });
  }

  try {
    const startTime = Date.now();
    const userProfile = getUserProfile(userId);

    const intentResult = classifyIntent(text);

    if (intentResult.intent === INTENTS.OFF_TOPIC) {
      return res.status(200).json({
        intent: INTENTS.OFF_TOPIC,
        isOffTopic: true,
        clarificationMessage: intentResult.message || "MoodBite is designed to recommend food based on your emotions and preferences. How are you feeling today?",
        predictedMood: "neutral",
        suggestedFood: null
      });
    }

    if (intentResult.intent === INTENTS.GREETING) {
      return res.status(200).json({
        intent: INTENTS.GREETING,
        isGreeting: true,
        clarificationMessage: intentResult.message || "Hello! Tell me about your day or how you're feeling, and I'll recommend the right meal for you.",
        predictedMood: "neutral",
        suggestedFood: null
      });
    }

    if (intentResult.intent === INTENTS.UNKNOWN) {
      return res.status(200).json({
        intent: INTENTS.UNKNOWN,
        isUnknown: true,
        clarificationMessage: intentResult.message || "I didn't quite understand that. Could you describe your mood or food cravings?",
        predictedMood: "unknown",
        confidenceScore: 20,
        suggestedFood: null
      });
    }

    const judgment = analyzeEmotion(text);
    const { dominantEmotion, confidence, intensity, vector, context, source, alternatives: altEmotions, emotions } = judgment;

    if (dominantEmotion === 'unknown' || (confidence < 0.35 && dominantEmotion === 'neutral' && !judgment.isNegated)) {
      return res.status(200).json({
        intent: intentResult.intent,
        isAmbiguous: true,
        predictedMood: "unknown",
        confidenceScore: Math.round(confidence * 100),
        confidenceNormalized: confidence,
        clarificationMessage: "I sense what you're sharing, but I want to be certain before recommending food. Are you feeling more stressed, down, or simply looking for comfort?",
        suggestedFood: null,
        vector
      });
    }

    const activeConstraints = {
      dietary: userConstraints.dietary || intentResult.extractedConstraints.dietary || userProfile.dietaryPreference || "vegetarian",
      availability: userConstraints.availability || intentResult.extractedConstraints.availability || userProfile.availabilityPreference || "any",
      spice: userConstraints.spice || intentResult.extractedConstraints.spice || userProfile.spicePreference,
      allergies: userConstraints.allergies || userProfile.allergies || [],
      maxBudget: userConstraints.maxBudget || userProfile.budgetPreference?.max || Infinity,
      userProfile
    };

    const userIngredientsList = ingredients
      ? ingredients.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
      : [];

    const userHistory = getUserHistory(userId);
    const recentFoodNames = (userHistory.foodEvents || []).slice(-5).map(e => e.recommendedFood);

    const recommendation = generateRecommendation({
      emotion: dominantEmotion,
      intensity,
      context,
      constraints: activeConstraints,
      ingredients: userIngredientsList,
      userProfile,
      recentRecommendations: recentFoodNames
    });

    if (!recommendation.success) {
      return res.status(200).json({
        intent: intentResult.intent,
        predictedMood: dominantEmotion,
        confidenceScore: Math.round(confidence * 100),
        confidenceNormalized: confidence,
        strategy: "No Constraint Match",
        reason: recommendation.reason,
        suggestedFood: null,
        alternatives: []
      });
    }

    recordMoodEvent(userId, {
      input: text,
      detectedEmotion: dominantEmotion,
      intensity,
      confidence,
      context
    });

    recordFoodEvent(userId, {
      recommendedFood: recommendation.recommendedFood.name,
      predictedMood: dominantEmotion
    });

    const processingTime = Date.now() - startTime;
    console.log(`[MoodBite] Analyzed: "${text.substring(0, 40)}" -> ${dominantEmotion} (Conf: ${(confidence * 100).toFixed(0)}%, Int: ${(intensity * 100).toFixed(0)}%) in ${processingTime}ms`);

    return res.status(200).json({
      intent: intentResult.intent,
      predictedMood: dominantEmotion,
      strategy: recommendation.strategyLabel,
      suggestedFood: recommendation.recommendedFood.name,
      recommendedFood: recommendation.recommendedFood,
      reason: recommendation.reason,
      confidenceScore: Math.round(confidence * 100),
      confidenceNormalized: confidence,
      intensity,
      alternatives: recommendation.alternatives,
      otherSuggestions: recommendation.alternatives.map(a => a.name),
      source,
      vector,
      context,
      emotions,
      alternativeEmotions: altEmotions,
      factors: recommendation.factors,
      constraintsUsed: {
        dietary: activeConstraints.dietary,
        availability: activeConstraints.availability
      }
    });

  } catch (error) {
    console.error("[MoodBite] Pipeline Error:", error);
    return res.status(500).json({ message: "Internal Processing Error", error: error.message });
  }
}
