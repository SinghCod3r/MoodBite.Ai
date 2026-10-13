/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import fs from 'fs';
import path from 'path';
import { updateUserProfile, getUserProfile } from './profile.js';
import { recordFoodEvent } from './history.js';

const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.json');

export function recordFeedback({
  userId = "guest",
  feedback = "good",
  suggestedFood = "",
  predictedMood = "",
  foodId = null,
  context = null
}) {
  const entry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    userId,
    feedback,
    suggestedFood,
    predictedMood,
    foodId,
    context
  };

  try {
    let list = [];
    if (fs.existsSync(FEEDBACK_FILE)) {
      list = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf8'));
    }
    list.push(entry);
    fs.mkdirSync(path.dirname(FEEDBACK_FILE), { recursive: true });
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (e) {
    console.warn("[Feedback] Failed to write feedback entry:", e.message);
  }

  recordFoodEvent(userId, {
    recommendedFood: suggestedFood,
    predictedMood,
    feedback
  });

  if (foodId) {
    const profile = getUserProfile(userId);
    let favs = [...(profile.favoriteFoods || [])];
    let dislikes = [...(profile.dislikedFoods || [])];

    if (feedback === 'loved' || feedback === 'good') {
      if (!favs.includes(foodId)) favs.push(foodId);
      dislikes = dislikes.filter(id => id !== foodId);
    } else if (feedback === 'bad') {
      if (!dislikes.includes(foodId)) dislikes.push(foodId);
      favs = favs.filter(id => id !== foodId);
    }

    updateUserProfile(userId, {
      favoriteFoods: favs,
      dislikedFoods: dislikes
    });
  }

  return { success: true, entry };
}
