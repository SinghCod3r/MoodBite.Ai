/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { emotionWeights } from './weights';


const foodDatabase = {
    anger: {
        strategy: "Spicy Release",
        foods: [
            "Spicy Chaat",
            "Crispy Samosa",
            "Hot Pakora",
            "Chilli Paneer",
            "Masala Maggi"
        ]
    },
    stress: {
        strategy: "Calming & Warmth",
        foods: [
            "Masala Chai",
            "Ginger Tea",
            "Hot Vegetable Soup",
            "Comforting Khichdi",
            "Dal Rice"
        ]
    },
    sadness: {
        strategy: "Comfort & Warmth",
        foods: [
            "Comforting Khichdi",
            "Dal Rice",
            "Warm Soup",
            "Gajar Ka Halwa",
            "Sweet Kheer"
        ]
    },
    fear: {
        strategy: "Grounding Stability",
        foods: [
            "Warm Milk",
            "Herbal Tea",
            "Plain Rice",
            "Warm Oats Porridge"
        ]
    },
    joy: {
        strategy: "Celebration Feast",
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


export function nameEmotion(vector, feedbackAdjustments = []) {

    if (vector.valence <= -0.6 && vector.arousal > 0.6) return "anger";
    if (vector.valence < -0.4 && vector.control < 0.4) return "stress";
    if (vector.valence <= -0.6 && vector.arousal < 0.3) return "sadness";
    if (vector.valence > 0.4) return "joy";



    if (Math.abs(vector.valence) < 0.2 && Math.abs(vector.arousal) < 0.2) return "neutral";

    return "mixed";
}

export function foodFromEVM(vector) {
    const e = nameEmotion(vector);
    return manualStrategy(e);
}
