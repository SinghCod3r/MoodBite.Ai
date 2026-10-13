/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export function filterHardConstraints(candidates, constraints = {}) {
  if (!Array.isArray(candidates)) return [];
  if (!constraints || Object.keys(constraints).length === 0) return [...candidates];

  const dietary = (constraints.dietary || "").toLowerCase().trim();
  const availability = (constraints.availability || "any").toLowerCase().trim();
  const allergies = (constraints.allergies || []).map(a => a.toLowerCase().trim());
  const excludedIngredients = (constraints.excludedIngredients || []).map(e => e.toLowerCase().trim());
  const maxBudget = constraints.maxBudget || Infinity;

  return candidates.filter(food => {

    if (dietary === "vegetarian" || dietary === "veg") {
      if (!food.dietary.vegetarian || food.dietary.containsMeat) return false;
    }

    if (dietary === "vegan") {
      if (!food.dietary.vegan || food.dietary.containsMeat || food.dietary.containsEgg) return false;
    }

    if (dietary === "non-vegetarian" || dietary === "non-veg") {

      if (!food.dietary.containsMeat && !food.dietary.containsEgg) return false;
    }

    if (dietary === "egg-free" || dietary === "no-egg") {
      if (food.dietary.containsEgg) return false;
    }

    if (dietary === "jain") {
      if (food.dietary.jainFriendly === false) return false;

      if (!food.dietary.vegetarian) return false;
    }

    if (allergies.length > 0 || excludedIngredients.length > 0) {
      const forbidden = [...allergies, ...excludedIngredients];
      const hasForbidden = food.ingredients.some(ing =>
        forbidden.some(ban => ing.toLowerCase().includes(ban) || ban.includes(ing.toLowerCase()))
      );
      if (hasForbidden) return false;
    }

    if (availability === "home") {

      if (!food.availability.home) return false;
    } else if (availability === "delivery" || availability === "order") {

      if (!food.availability.delivery && !food.availability.restaurant) return false;
    } else if (availability === "local" || availability === "localmarket") {
      if (!food.availability.localMarket) return false;
    }

    if (food.priceRange && food.priceRange.min > maxBudget) {
      return false;
    }

    return true;
  });
}

