/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export function generateFactualExplanation({
  food,
  emotion,
  context = null,
  constraints = {},
  factorBreakdown = {},
  matchedIngredients = []
}) {
  if (!food) return "Selected based on balanced culinary profiling.";

  const reasons = [];

  if (emotion === "stress" || emotion === "fear") {
    if (food.nutrition?.warmTherapeutic) {
      reasons.push(`offers warm, grounding comfort to help lower nervous tension`);
    } else {
      reasons.push(`provides gentle, steady nourishment suitable for stressful moments`);
    }
  } else if (emotion === "anger") {
    if (food.spiceLevel === "high" || food.tags?.includes("spicy")) {
      reasons.push(`delivers a fiery, crunchy sensory release to vent pent-up irritation`);
    } else if (food.tags?.includes("cooling")) {
      reasons.push(`acts as a cooling countermeasure to soothe internal heat and agitation`);
    } else {
      reasons.push(`provides bold flavor stimulation to redirect intense emotional energy`);
    }
  } else if (emotion === "sadness" || emotion === "loneliness") {
    if (food.category === "dessert" || food.tags?.includes("serotonin")) {
      reasons.push(`stimulates natural serotonin release to gently elevate melancholy feelings`);
    } else {
      reasons.push(`brings warm, nostalgic soul-food comfort when you need an emotional lift`);
    }
  } else if (emotion === "joy" || emotion === "excitement") {
    reasons.push(`complements your celebratory state with rich, festive flavors`);
  } else if (emotion === "calm") {
    reasons.push(`maintains your peaceful equilibrium with light, balanced nutrition`);
  } else if (emotion === "boredom") {
    reasons.push(`awakens sluggish senses with vibrant textures and tangy notes`);
  } else {
    reasons.push(`provides wholesome, balanced sustenance`);
  }

  let contextClause = "";
  if (context === "academic") {
    contextClause = "given your academic deadlines";
  } else if (context === "professional") {
    contextClause = "to help navigate workday pressures";
  } else if (context === "fatigue") {
    contextClause = "since you're feeling depleted and fatigued";
  }

  let dietClause = "";
  if (constraints.dietary === "vegetarian" || constraints.dietary === "veg") {
    dietClause = "respects your vegetarian preference";
  } else if (constraints.dietary === "vegan") {
    dietClause = "strictly adheres to your vegan lifestyle";
  } else if (constraints.dietary === "jain") {
    dietClause = "is compliant with your Jain dietary needs";
  }

  let availClause = "";
  if (matchedIngredients && matchedIngredients.length > 0) {
    availClause = `makes optimal use of your available ingredients (${matchedIngredients.slice(0, 3).join(", ")})`;
  } else if (constraints.availability === "home") {
    availClause = `is quick and realistic to prepare at home (${food.prepTimeMinutes || 20} mins)`;
  } else if (constraints.availability === "delivery" || constraints.availability === "order") {
    availClause = "is readily available for local delivery";
  }

  const clauses = [contextClause, dietClause, availClause].filter(Boolean);

  let explanation = `"${food.name}" was recommended because it ${reasons[0]}`;
  if (clauses.length > 0) {
    explanation += `, and ${clauses.join(", ")}.`;
  } else {
    explanation += `.`;
  }

  return explanation;
}

