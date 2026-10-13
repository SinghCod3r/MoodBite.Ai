/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import test from 'node:test';
import assert from 'node:assert/strict';
import { generateRecommendation } from '../lib/recommendation/engine.js';
import { generateFactualExplanation } from '../lib/recommendation/explainer.js';

test('Recommendation Engine - Generates Best Match and Valid Alternatives', () => {
  const result = generateRecommendation({
    emotion: "stress",
    intensity: 0.8,
    constraints: { dietary: "vegetarian" }
  });

  assert.equal(result.success, true);
  assert.ok(result.recommendedFood);
  assert.equal(result.alternatives.length, 2, "Expected 2 alternatives");
  assert.ok(result.reason.length > 10, "Expected non-empty explanation");
});

test('Recommendation Engine - Factually Grounded Explanations', () => {
  const explanation = generateFactualExplanation({
    food: { name: "Comforting Khichdi", prepTimeMinutes: 20 },
    emotion: "stress",
    context: "academic",
    constraints: { dietary: "vegetarian", availability: "home" }
  });

  assert.ok(explanation.includes("Comforting Khichdi"));
  assert.ok(explanation.includes("vegetarian"));
  assert.ok(explanation.includes("home"));
  assert.ok(explanation.includes("academic"));
});

test('Recommendation Engine - Fridge Ingredients Boost Availability Match', () => {
  const result = generateRecommendation({
    emotion: "stress",
    ingredients: ["rice", "curd"],
    constraints: { dietary: "vegetarian" }
  });

  assert.equal(result.success, true);

  assert.ok(["Tempered Curd Rice (Thayir Sadam)", "Comforting Khichdi", "Dal Chawal with Ghee"].includes(result.recommendedFood.name));
});

test('Recommendation Engine - Handles Impossible Constraints Gracefully', () => {
  const result = generateRecommendation({
    emotion: "joy",
    constraints: {
      dietary: "vegan",
      maxBudget: 10
    }
  });

  assert.equal(result.success, false);
  assert.equal(result.recommendedFood, null);
  assert.ok(result.reason.includes("constraints"));
});

