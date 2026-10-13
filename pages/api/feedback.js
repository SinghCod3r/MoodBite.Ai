/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { recordFeedback } from '../../lib/user/feedback';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, feedback, suggestedFood, predictedMood, foodId, context } = req.body;

  if (!feedback || !suggestedFood) {
    return res.status(400).json({ message: 'Missing feedback or suggestedFood in payload' });
  }

  try {
    const result = recordFeedback({
      userId: userId || 'guest',
      feedback,
      suggestedFood,
      predictedMood,
      foodId,
      context
    });

    return res.status(200).json({ success: true, entry: result.entry });
  } catch (error) {
    console.error("[api/feedback] Error recording feedback:", error);
    return res.status(500).json({ message: 'Failed to record feedback', error: error.message });
  }
}

