/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { FOOD_DATABASE } from '../food/database.js';
import { filterHardConstraints } from '../food/filter.js';
import { rankFoodCandidates } from '../food/ranker.js';
import { generateFactualExplanation } from './explainer.js';

export function generateRecommendation({
  emotion = "neutral",
  intensity = 0.5,
  context = null,
  constraints = {},
  ingredients = [],
  userProfile = {},
  recentRecommendations = []
}) {

  const allCandidates = FOOD_DATABASE;

  const filteredCandidates = filterHardConstraints(allCandidates, constraints);

  if (filteredCandidates.length === 0) {
    return {
      success: false,
      recommendedFood: null,
      alternatives: [],
      reason: "No foods matched your strict combination of constraints. Try relaxing dietary or budget restrictions.",
      strategyLabel: "Constraint Conflict",
      confidence: 0.0
    };
  }

  const rankingContext = {
    emotion,
    intensity,
    availabilityPreference: constraints.availability || "any",
    userIngredients: ingredients,
    userProfile,
    recentRecommendations
  };

  const rankedCandidates = rankFoodCandidates(filteredCandidates, rankingContext);
  const bestMatch = rankedCandidates[0];

  const alternatives = rankedCandidates.slice(1, 3).map(item => ({
    id: item.food.id,
    name: item.food.name,
    score: item.score,
    category: item.food.category,
    region: item.food.region,
    prepTimeMinutes: item.food.prepTimeMinutes,
    comfortDescription: item.food.comfortDescription
  }));

  let matchedIngredients = [];
  if (ingredients.length > 0 && bestMatch.food.ingredients) {
    matchedIngredients = bestMatch.food.ingredients.filter(ing =>
      ingredients.some(userItem => ing.toLowerCase().includes(userItem.toLowerCase()) || userItem.toLowerCase().includes(ing.toLowerCase()))
    );
  }

  const reason = generateFactualExplanation({
    food: bestMatch.food,
    emotion,
    context,
    constraints,
    factorBreakdown: bestMatch.factorBreakdown,
    matchedIngredients
  });

  const strategyMap = {
    anger: "Spicy & Crunchy Sensory Venting",
    stress: "Warm & Calming Therapeutic Relief",
    fear: "Grounding & Soothing Stability",
    sadness: "Serotonin & Warm Nostalgic Comfort",
    joy: "Celebratory Feast & High Vibrations",
    excitement: "Festive Energy & Indulgence",
    calm: "Mindful & Balanced Nourishment",
    boredom: "Tangy & Textural Sensory Awakening",
    loneliness: "Warm Soul Food & Comfort",
    neutral: "Balanced Daily Sustenance",
    ambiguous: "Sensory Reset",
    unknown: "Wholesome Nourishment"
  };

  return {
    success: true,
    recommendedFood: {
      id: bestMatch.food.id,
      name: bestMatch.food.name,
      category: bestMatch.food.category,
      region: bestMatch.food.region,
      dietary: bestMatch.food.dietary,
      availability: bestMatch.food.availability,
      priceRange: bestMatch.food.priceRange,
      spiceLevel: bestMatch.food.spiceLevel,
      nutrition: bestMatch.food.nutrition,
      prepTimeMinutes: bestMatch.food.prepTimeMinutes,
      comfortDescription: bestMatch.food.comfortDescription,
      ingredients: bestMatch.food.ingredients
    },
    alternatives,
    strategyLabel: strategyMap[emotion] || "Harmonizing Nutrition",
    score: bestMatch.score,
    factors: bestMatch.factorBreakdown,
    reason
  };
}
