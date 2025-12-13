// evm/strategy.js (Clean Food Lists + Tuned Logic)
import { emotionWeights } from './weights';

// 3️⃣ CLEAN FOOD LISTS (NO WRONG FOOD ANYMORE)
const foodDatabase = {
    anger: {
        strategy: "Spicy Release", // "Release food"
        foods: [
            "Spicy Chaat",
            "Crispy Samosa",
            "Hot Pakora",
            "Chilli Paneer",
            "Masala Maggi"
        ]
    },
    stress: {
        strategy: "Calming & Warmth", // "Calming & familiar"
        foods: [
            "Masala Chai",
            "Ginger Tea",
            "Hot Vegetable Soup",
            "Comforting Khichdi",
            "Dal Rice"
        ]
    },
    sadness: {
        strategy: "Comfort & Warmth", // "Comfort"
        foods: [
            "Comforting Khichdi",
            "Dal Rice",
            "Warm Soup",
            "Gajar Ka Halwa",
            "Sweet Kheer"
        ]
    },
    fear: {
        strategy: "Grounding Stability", // "Grounding"
        foods: [
            "Warm Milk",
            "Herbal Tea",
            "Plain Rice",
            "Warm Oats Porridge"
        ]
    },
    joy: {
        strategy: "Celebration Feast", // "Celebration"
        foods: [
            "Vegetable Biryani",
            "Cheesy Pizza",
            "Sweets Box (Mithai)",
            "Ice Cream Sundae",
            "Chocolate Truffles"
        ]
    },
    neutral: {
        strategy: "Balanced Energy",
        foods: ["Fresh Seasonal Fruit Bowl", "Handful of Mixed Nuts", "Vegetable Sandwich", "Coconut Water", "Rice and Curry"]
    },
    mixed: {
        strategy: "Sensory Reset",
        foods: ["Fresh Lime Soda", "Vegetable Stir Fry", "Yogurt Parfait"]
    },
    unknown: {
        strategy: "Safe Comfort",
        foods: ["Warm Buttered Toast", "Plain Rice with Yogurt", "Clear Vegetable Soup"]
    }
};

export function manualStrategy(emotion) {
    const e = emotion?.toLowerCase() || 'neutral';
    return foodDatabase[e]?.strategy || "Balanced Energy";
}

export function pickFood(strategy, userInput) {
    let emotionKey = 'neutral';
    for (const [key, data] of Object.entries(foodDatabase)) {
        if (data.strategy === strategy) emotionKey = key;
    }
    const foods = foodDatabase[emotionKey]?.foods || foodDatabase.neutral.foods;
    const index = userInput ? userInput.length % foods.length : 0;
    return foods[index];
}

export function getRelatedFoods(strategy, mainFood) {
    let emotionKey = 'neutral';
    for (const [key, data] of Object.entries(foodDatabase)) {
        if (data.strategy === strategy) emotionKey = key;
    }
    const foods = foodDatabase[emotionKey]?.foods || [];
    return foods.filter(f => f !== mainFood).slice(0, 3);
}

export function buildReason(text, strategy, food) {
    const reasons = [
        `Based on the conflict intensity, a "${strategy}" approach helps vent the energy.`,
        `"${food}" matches the high arousal state, providing necessary sensory feedback.`,
        `Your words show strong emotion. "${food}" aligns with the "${strategy}" principle.`
    ];
    const index = text ? text.length % reasons.length : 0;
    return reasons[index];
}

// 4D / Weighted Logic Helpers
export function nameEmotion(vector, feedbackAdjustments = []) {
    // Step 3: Strict Emotion Naming Logic (Conflict Boost Aware)
    if (vector.valence <= -0.6 && vector.arousal > 0.6) return "anger";
    if (vector.valence < -0.4 && vector.control < 0.4) return "stress";
    if (vector.valence <= -0.6 && vector.arousal < 0.3) return "sadness";
    if (vector.valence > 0.4) return "joy";

    // Fallback based on weights if needed, but Step 3 suggests strict rules first.
    // If strict rules fail, we fall back to:
    if (Math.abs(vector.valence) < 0.2 && Math.abs(vector.arousal) < 0.2) return "neutral";

    return "mixed";
}

export function foodFromEVM(vector) {
    const e = nameEmotion(vector);
    return manualStrategy(e); // Returns strategy string
}
