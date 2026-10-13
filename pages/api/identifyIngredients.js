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

function bufferToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType,
        },
    };
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {

        const imageBuffer = await new Promise((resolve, reject) => {
            const chunks = [];
            req.on('data', chunk => chunks.push(chunk));
            req.on('end', () => resolve(Buffer.concat(chunks)));
            req.on('error', err => reject(err));
        });

        const mimeType = req.headers['content-type'];

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        const prompt = "Analyze this image and list only the food ingredients you see. Exclude any non-food items like bowls, plates, or utensils. Please provide the list as a simple comma-separated string. For example: 'apples, milk, cheese, bread'.";

        const imagePart = bufferToGenerativePart(imageBuffer, mimeType);

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        const ingredients = text.split(',').map(item => item.trim().toLowerCase());

        res.status(200).json({ ingredients });

    } catch (error) {
        console.error("----------- DETAILED ERROR -----------");
        console.error(error);
        console.error("--------------------------------------");
        res.status(500).json({ message: 'Failed to identify ingredients.' });
    }
}