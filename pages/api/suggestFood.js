// pages/api/suggestFood.js
// PUBLIC API: Powered by Offline Expert System (28 Emotions)

import { judgeEmotion } from '../../evm/judge';
import { getFoodSuggestion } from '../../evm/foodEngine';
import { generateReason } from '../../evm/reasonEngine';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { text, ingredients } = req.body;
    if (!text || !text.trim()) {
        return res.status(400).json({ message: 'Text input is required' });
    }

    try {
        console.log(`[MoodBite] Analyzing: "${text.substring(0, 50)}..." (Fridge: ${ingredients || "Empty"})`);
        const startTime = Date.now();

        // 1. THE JUDGE (Detect Emotion & Vector)
        const judgment = judgeEmotion(text);
        const { mood, confidence, vector, context, source } = judgment;

        // 2. FOOD ENGINE (Select Food Strategy)
        const foodData = getFoodSuggestion(mood, text, ingredients);

        // 3. REASONING ENGINE (Explain Why)
        // We append fridge info to context if used
        let finalContext = context;
        if (foodData.sourceMethod === "Fridge Match") finalContext = "fridge";

        const reason = generateReason(mood, foodData.strategyLabel, foodData.suggestedFood, finalContext);

        const processingTime = Date.now() - startTime;
        console.log(`[MoodBite] Result: ${mood} (${processingTime}ms)`);

        // 4. RESPONSE
        res.status(200).json({
            predictedMood: mood,           // e.g. "anger"
            strategy: foodData.strategyLabel, // e.g. "Spicy Release"
            suggestedFood: foodData.suggestedFood,
            reason: reason,
            confidenceScore: confidence,
            otherSuggestions: foodData.otherSuggestions,
            source: source, // e.g. "Direct Match" or "Inferred Logic"
            vector: vector
        });

    } catch (error) {
        console.error("[MoodBite] System Error:", error);
        res.status(500).json({ message: "Internal Processing Error", error: error.message });
    }
}
