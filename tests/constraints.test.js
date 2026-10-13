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
import { FOOD_DATABASE } from '../lib/food/database.js';
import { filterHardConstraints } from '../lib/food/filter.js';
import { generateRecommendation } from '../lib/recommendation/engine.js';

test('Hard Constraints - Strict Vegetarian Filter Never Contains Meat', () => {
  const filtered = filterHardConstraints(FOOD_DATABASE, { dietary: "vegetarian" });

  assert.ok(filtered.length > 0);
  for (const food of filtered) {
    assert.equal(food.dietary.vegetarian, true, `${food.name} should be vegetarian`);
    assert.equal(food.dietary.containsMeat, false, `${food.name} must not contain meat`);
  }
});

test('Hard Constraints - Vegan Filter Strictly Excludes Dairy, Eggs, and Meat', () => {
  const filtered = filterHardConstraints(FOOD_DATABASE, { dietary: "vegan" });

  assert.ok(filtered.length > 0);
  for (const food of filtered) {
    assert.equal(food.dietary.vegan, true, `${food.name} should be vegan`);
    assert.equal(food.dietary.containsMeat, false);
    assert.equal(food.dietary.containsEgg, false);
  }
});

test('Hard Constraints - Recommendation Pipeline Never Violates Vegetarian Constraint', () => {

  const emotions = ["joy", "anger", "sadness", "stress", "calm", "fear"];

  for (const emotion of emotions) {
    const result = generateRecommendation({
      emotion,
      constraints: { dietary: "vegetarian" }
    });

    assert.equal(result.success, true);
    assert.equal(result.recommendedFood.dietary.vegetarian, true, `Recommended food ${result.recommendedFood.name} must be vegetarian`);
    assert.equal(result.recommendedFood.dietary.containsMeat, false);

    for (const alt of result.alternatives) {
      const dbFood = FOOD_DATABASE.find(f => f.id === alt.id);
      if (dbFood) {
        assert.equal(dbFood.dietary.vegetarian, true, `Alternative ${alt.name} must be vegetarian`);
      }
    }
  }
});

test('Hard Constraints - Availability Home vs Delivery', () => {
  const homeFiltered = filterHardConstraints(FOOD_DATABASE, { availability: "home" });
  for (const food of homeFiltered) {
    assert.equal(food.availability.home, true, `${food.name} must be makeable at home`);
  }

  const deliveryFiltered = filterHardConstraints(FOOD_DATABASE, { availability: "delivery" });
  for (const food of deliveryFiltered) {
    assert.ok(food.availability.delivery || food.availability.restaurant, `${food.name} must be deliverable`);
  }
});

test('Hard Constraints - Budget Ceiling', () => {
  const lowBudget = filterHardConstraints(FOOD_DATABASE, { maxBudget: 50 });
  for (const food of lowBudget) {
    assert.ok(food.priceRange.min <= 50, `${food.name} minimum price must be <= 50`);
  }
});

test('Hard Constraints - Ingredient Exclusion', () => {
  const filtered = filterHardConstraints(FOOD_DATABASE, { excludedIngredients: ["potato"] });
  for (const food of filtered) {
    const hasPotato = food.ingredients.some(i => i.toLowerCase().includes("potato"));
    assert.equal(hasPotato, false, `${food.name} must not contain potato`);
  }
});

test('Hard Constraints - Non-Veg Filter Strictly Returns Foods with Meat or Egg', () => {
  const filtered = filterHardConstraints(FOOD_DATABASE, { dietary: "non-vegetarian" });
  assert.ok(filtered.length > 0, 'Should have non-veg candidates');
  for (const food of filtered) {
    assert.ok(food.dietary.containsMeat || food.dietary.containsEgg, `${food.name} must contain meat or egg`);
  }

  const recResult = generateRecommendation({
    emotion: "joy",
    constraints: { dietary: "non-vegetarian" }
  });
  assert.equal(recResult.success, true);
  assert.ok(recResult.recommendedFood.dietary.containsMeat || recResult.recommendedFood.dietary.containsEgg);
});

