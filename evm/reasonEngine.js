/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { generateFactualExplanation } from '../lib/recommendation/explainer.js';

export function generateReason(emotion, strategyLabel, foodName, context, constraints = {}) {
  return generateFactualExplanation({
    food: { name: foodName },
    emotion,
    context,
    constraints
  });
}
