/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    const { images } = req.body;
    if (!images || images.length === 0) return res.status(400).json({ ingredients: [] });

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


        const imageParts = images.map(base64 => ({
            inlineData: {
                data: base64.split(',')[1],
                mimeType: "image/jpeg"
            }
        }));

        const prompt = "Look at these images of food/fridge. Identify all distinct raw ingredients visible (e.g. eggs, milk, tomato, spinach). Return ONLY a simple comma-separated list of English ingredient names. Do not include quantities or explanations.";

        const result = await model.generateContent([prompt, ...imageParts]);
        const text = result.response.text();


        const ingredients = text.split(',')
            .map(s => s.trim().toLowerCase())
            .filter(s => s.length > 0)
            .filter((v, i, a) => a.indexOf(v) === i);

        res.status(200).json({ ingredients });

    } catch (error) {
        console.error("Vision API Error:", error);
        res.status(500).json({ error: "Failed to analyze images" });
    }
}
