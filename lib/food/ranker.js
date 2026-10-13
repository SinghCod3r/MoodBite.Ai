/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

const DEFAULT_WEIGHTS = {
  moodMatch: 0.35,
  availability: 0.15,
  userPreference: 0.15,
  budget: 0.10,
  nutrition: 0.10,
  culturalRelevance: 0.10,
  variety: 0.05
};

export function rankFoodCandidates(candidates, context = {}, customWeights = {}) {
  if (!Array.isArray(candidates) || candidates.length === 0) return [];

  const weights = { ...DEFAULT_WEIGHTS, ...customWeights };
  const emotion = (context.emotion || "neutral").toLowerCase();
  const intensity = context.intensity ?? 0.5;
  const availPref = (context.availabilityPreference || "any").toLowerCase();
  const userIngredients = (context.userIngredients || []).map(i => i.toLowerCase().trim()).filter(Boolean);
  const userProfile = context.userProfile || {};
  const recentRecs = (context.recentRecommendations || []).map(r => r.toLowerCase().trim());

  const scoredFoods = candidates.map(food => {

    const baseMoodMatch = (food.moodProfile && food.moodProfile[emotion]) ?? 0.5;

    const therapeuticBonus = food.nutrition?.warmTherapeutic && intensity > 0.6 ? 0.15 : 0;
    const moodMatchScore = Math.min(1.0, baseMoodMatch + therapeuticBonus);

    let availScore = 0.7;
    if (availPref === "home") {
      availScore = food.availability.home ? 1.0 : 0.2;
    } else if (availPref === "delivery" || availPref === "order") {
      availScore = food.availability.delivery ? 1.0 : 0.4;
    }

    if (userIngredients.length > 0 && food.ingredients) {
      let matchedCount = 0;
      food.ingredients.forEach(ing => {
        if (userIngredients.some(userItem => ing.toLowerCase().includes(userItem) || userItem.includes(ing.toLowerCase()))) {
          matchedCount++;
        }
      });
      const fridgeRatio = matchedCount / Math.max(1, food.ingredients.length);
      availScore = Math.min(1.0, availScore * 0.4 + fridgeRatio * 0.6);
    }

    let prefScore = 0.5;
    if (userProfile.preferredCuisines && userProfile.preferredCuisines.includes(food.region)) {
      prefScore += 0.25;
    }
    if (userProfile.favoriteFoods && userProfile.favoriteFoods.includes(food.id)) {
      prefScore += 0.35;
    }
    if (userProfile.dislikedFoods && userProfile.dislikedFoods.includes(food.id)) {
      prefScore -= 0.40;
    }
    if (userProfile.spicePreference && userProfile.spicePreference === food.spiceLevel) {
      prefScore += 0.20;
    }
    prefScore = Math.max(0.1, Math.min(1.0, prefScore));

    let budgetScore = 0.8;
    if (userProfile.budgetPreference) {
      const avgPrice = (food.priceRange.min + food.priceRange.max) / 2;
      if (avgPrice <= userProfile.budgetPreference.max) {
        budgetScore = 1.0;
      } else {
        budgetScore = Math.max(0.2, 1.0 - (avgPrice - userProfile.budgetPreference.max) / 100);
      }
    }

    const comfortScore = food.nutrition?.comfortScore ?? 0.75;
    const nutritionScore = comfortScore;

    const culturalScore = food.cuisine === "indian" ? 0.95 : 0.70;

    let varietyScore = 1.0;
    if (recentRecs.includes(food.id) || recentRecs.includes(food.name.toLowerCase())) {
      varietyScore = 0.3;
    }

    const totalScore = (
      moodMatchScore * weights.moodMatch +
      availScore * weights.availability +
      prefScore * weights.userPreference +
      budgetScore * weights.budget +
      nutritionScore * weights.nutrition +
      culturalScore * weights.culturalRelevance +
      varietyScore * weights.variety
    );

    return {
      food,
      score: parseFloat(totalScore.toFixed(3)),
      factorBreakdown: {
        moodMatch: parseFloat(moodMatchScore.toFixed(2)),
        availability: parseFloat(availScore.toFixed(2)),
        preference: parseFloat(prefScore.toFixed(2)),
        budget: parseFloat(budgetScore.toFixed(2)),
        nutrition: parseFloat(nutritionScore.toFixed(2)),
        cultural: parseFloat(culturalScore.toFixed(2)),
        variety: parseFloat(varietyScore.toFixed(2))
      }
    };
  });

  scoredFoods.sort((a, b) => b.score - a.score);

  return scoredFoods;
}

