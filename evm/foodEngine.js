/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { generateRecommendation } from '../lib/recommendation/engine.js';

export function getFoodSuggestion(emotion, userInput = "", ingredientsString = "", constraints = {}) {
  const ingredients = ingredientsString
    ? ingredientsString.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
    : [];

  const result = generateRecommendation({
    emotion: emotion || "neutral",
    ingredients,
    constraints,
    userProfile: constraints.userProfile || {}
  });

  if (!result.success || !result.recommendedFood) {
    return {
      strategyLabel: "Balanced Sustenance",
      suggestedFood: "Warm Vegetable Soup",
      otherSuggestions: ["Masala Chai", "Comforting Khichdi"],
      sourceMethod: "Universal Fallback",
      reason: result.reason || "Gentle comfort food to reset your system."
    };
  }

  return {
    strategyLabel: result.strategyLabel,
    suggestedFood: result.recommendedFood.name,
    otherSuggestions: result.alternatives.map(a => a.name),
    sourceMethod: ingredients.length > 0 ? "Fridge & Context Match" : "Multi-Factor Scoring",
    recommendedFood: result.recommendedFood,
    alternatives: result.alternatives,
    score: result.score,
    factors: result.factors,
    reason: result.reason
  };
}
