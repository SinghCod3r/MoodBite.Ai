/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { resolveFoodImage } from '../../lib/image/validator';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { foodName, category } = req.query;

  try {
    const result = await resolveFoodImage(foodName, category);
    return res.status(200).json(result);
  } catch (error) {
    console.error("[generateFoodImage] Error resolving image:", error);

    return res.status(200).json({
      imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      isCached: false,
      isValidated: false,
      confidence: 0.60
    });
  }
}
