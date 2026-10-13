/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export const INTENTS = {
  MOOD: "MOOD",
  FOOD_REQUEST: "FOOD_REQUEST",
  DIETARY_CONSTRAINT: "DIETARY_CONSTRAINT",
  FOOD_PREFERENCE: "FOOD_PREFERENCE",
  AVAILABILITY_REQUEST: "AVAILABILITY_REQUEST",
  FRIDGE_QUERY: "FRIDGE_QUERY",
  GREETING: "GREETING",
  OFF_TOPIC: "OFF_TOPIC",
  UNKNOWN: "UNKNOWN"
};

const GREETINGS = [
  "hello", "hi", "hey", "hola", "namaste", "good morning", "good evening",
  "good afternoon", "sup", "what's up", "yo", "greetings"
];

const OFF_TOPIC_PATTERNS = [
  /\b(python|javascript|typescript|c\+\+|coding|code|function|algorithm|bug|compiler)\b/i,
  /\b(president|prime minister|election|politics|government|parliament)\b/i,
  /\b(quantum|physics|relativity|calculus|derivative|integral|equation)\b/i,
  /\b(capital of|population of|distance between|currency of|who is|who was|what is a)\b/i,
  /\b(movie review|football match|cricket score|stock market|crypto|bitcoin)\b/i,
  /\b(translate|write an essay|write a poem|write code|debug this)\b/i
];

const DIETARY_PATTERNS = [
  /\b(?:i am|i'm)?\s*(?:strictly|only)?\s*(?:vegetarian|veg|vegan|non-veg|non vegetarian|jain|halal)\b/i,
  /\b(no meat|don't eat meat|egg-free|dairy-free|gluten-free|nut allergy|allergic to)\b/i
];

const PREFERENCE_PATTERNS = [
  /\b(don't want|no|not too|less)\s+(spicy|sweet|heavy|oily|sour|fried)\b/i,
  /\b(crave|craving|in the mood for|want something)\s+(spicy|sweet|warm|hot|cold|tangy|light|crunchy|comforting)\b/i
];

const AVAILABILITY_PATTERNS = [
  /\b(make at home|cook at home|homemade|quick to make|pantry|have at home)\b/i,
  /\b(order|delivery|takeout|zomato|swiggy|restaurant|nearby)\b/i
];

const FRIDGE_PATTERNS = [
  /\b(in my fridge|what do i have|fridge ingredients|pantry check|in the refrigerator)\b/i
];

const FOOD_REQUEST_PATTERNS = [
  /\b(what can i eat|what should i eat|recommend (me )?(food|something|a snack|dinner|lunch|breakfast))\b/i,
  /\b(suggest (a )?(meal|snack|dish|drink|beverage)|i want food|give me food|hungry)\b/i,
  /\b(i want to eat|looking for something to eat|want something .* to eat|want something comforting)\b/i
];

const MOOD_INDICATORS = [
  /\b(i feel|i am feeling|i'm feeling|feeling)\s+[a-z]+/i,
  /\b(i am|i'm)\s+(feeling|so|very|extremely|really|a bit|quite|deeply)?\s*(happy|sad|stressed|angry|calm|tired|scared|worried|down|lonely|bored|lost|anxious|good|bad|terrible|great|exhausted)\b/i,
  /\b(stress|stressed|pressure|anxious|anxiety|worried|worry|fear|scared|terrified)\b/i,
  /\b(sad|depressed|unhappy|crying|tears|grief|heartbroken|down|lonely|alone)\b/i,
  /\b(angry|furious|mad|irritated|annoyed|frustrated|rage|pissed)\b/i,
  /\b(happy|joy|excited|thrilled|grateful|proud|peaceful|calm|relaxed)\b/i,
  /\b(exam|test|studied|failed|burnout|exhausted|tired|drained|overwhelmed|long day)\b/i,
  /\b(weird|terrible day|rough day|great day|bad day|tough day)\b/i
];

export function classifyIntent(text) {
  if (!text || typeof text !== "string") {
    return {
      intent: INTENTS.UNKNOWN,
      confidence: 1.0,
      extractedConstraints: {},
      message: "Please enter how you are feeling or what you'd like to eat."
    };
  }

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  const alphaChars = trimmed.replace(/[^a-zA-Z]/g, "");
  if (trimmed.length < 2 || alphaChars.length < 2) {
    return {
      intent: INTENTS.UNKNOWN,
      confidence: 0.95,
      extractedConstraints: {},
      message: "I didn't quite catch that. Could you describe your mood or food cravings?"
    };
  }

  const vowels = lower.match(/[aeiouy]/g);
  if (alphaChars.length >= 5 && (!vowels || vowels.length / alphaChars.length < 0.15)) {
    return {
      intent: INTENTS.UNKNOWN,
      confidence: 0.9,
      extractedConstraints: {},
      message: "That looks like an unclear input. Tell me how you're feeling or what kind of food you're looking for."
    };
  }

  const words = lower.split(/\s+|[.,!?]+/).filter(Boolean);
  if (words.length <= 2 && GREETINGS.some(g => lower === g || words.includes(g))) {
    return {
      intent: INTENTS.GREETING,
      confidence: 0.98,
      extractedConstraints: {},
      message: "Hello! Tell me how your day is going or how you're feeling, and I'll find the right food for you."
    };
  }

  const extractedConstraints = extractInlineConstraints(lower);

  const isOffTopic = OFF_TOPIC_PATTERNS.some(pat => pat.test(lower));

  const hasMoodIndicator = MOOD_INDICATORS.some(pat => pat.test(lower));

  if (isOffTopic && !hasMoodIndicator) {
    return {
      intent: INTENTS.OFF_TOPIC,
      confidence: 0.92,
      extractedConstraints,
      message: "MoodBite specializes in culinary recommendations based on your mood and dietary preferences. How are you feeling today?"
    };
  }

  if (FRIDGE_PATTERNS.some(pat => pat.test(lower))) {
    return {
      intent: INTENTS.FRIDGE_QUERY,
      confidence: 0.88,
      extractedConstraints,
      message: "Let's check your available ingredients to suggest something fitting."
    };
  }

  if (DIETARY_PATTERNS.some(pat => pat.test(lower)) && !hasMoodIndicator && words.length <= 6) {
    return {
      intent: INTENTS.DIETARY_CONSTRAINT,
      confidence: 0.9,
      extractedConstraints,
      message: `Noted your dietary preference (${extractedConstraints.dietary || 'diet'}). How are you feeling today?`
    };
  }

  if (AVAILABILITY_PATTERNS.some(pat => pat.test(lower)) && !hasMoodIndicator && words.length <= 6) {
    return {
      intent: INTENTS.AVAILABILITY_REQUEST,
      confidence: 0.85,
      extractedConstraints,
      message: "Got it! Tell me how you're feeling or what vibe you want, and I'll recommend the best dish."
    };
  }

  if (FOOD_REQUEST_PATTERNS.some(pat => pat.test(lower))) {
    return {
      intent: INTENTS.FOOD_REQUEST,
      confidence: 0.85,
      extractedConstraints,
      message: null
    };
  }

  if (hasMoodIndicator || words.length >= 3) {
    return {
      intent: INTENTS.MOOD,
      confidence: 0.88,
      extractedConstraints,
      message: null
    };
  }

  return {
    intent: INTENTS.UNKNOWN,
    confidence: 0.5,
    extractedConstraints,
    message: "I'm here to recommend food that matches your mood. Tell me how you feel or what you're craving!"
  };
}

function extractInlineConstraints(lower) {
  const constraints = {};

  if (/\b(vegetarian|veg)\b/i.test(lower) && !/\b(non-veg|non vegetarian)\b/i.test(lower)) {
    constraints.dietary = "vegetarian";
  } else if (/\b(vegan)\b/i.test(lower)) {
    constraints.dietary = "vegan";
  } else if (/\b(non-veg|non vegetarian|meat|chicken|mutton|fish)\b/i.test(lower)) {
    constraints.dietary = "non-vegetarian";
  }

  if (/\b(make at home|cook at home|homemade|home)\b/i.test(lower)) {
    constraints.availability = "home";
  } else if (/\b(order|delivery|takeout|zomato|swiggy|restaurant)\b/i.test(lower)) {
    constraints.availability = "delivery";
  }

  if (/\b(not spicy|mild|non-spicy|no spice|less spicy)\b/i.test(lower)) {
    constraints.spice = "mild";
  } else if (/\b(spicy|very spicy|extra spicy|super spicy|hot)\b/i.test(lower)) {
    constraints.spice = "high";
  }

  if (/\b(budget|cheap|affordable|pocket friendly|low cost)\b/i.test(lower)) {
    constraints.budget = "low";
  }

  return constraints;
}
