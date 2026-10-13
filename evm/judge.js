/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { analyzeEmotion } from '../lib/emotion/analyzer.js';

export function judgeEmotion(text) {
  const result = analyzeEmotion(text);

  return {
    mood: result.mood,
    dominantEmotion: result.dominantEmotion,
    confidence: Math.round(result.confidence * 100),
    confidenceNormalized: result.confidence,
    intensity: result.intensity,
    source: result.source,
    vector: result.vector,
    context: result.context,
    alternatives: result.alternatives,
    emotions: result.emotions,
    isAmbiguous: result.isAmbiguous,
    isNegated: result.isNegated
  };
}
