/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export function calculateConfidenceAndIntensity({
  sortedScores = [],
  directMatched = false,
  semanticMatched = false,
  conflictBoost = 0,
  intensityModifier = 1.0,
  wordCount = 1
}) {
  if (sortedScores.length === 0 || sortedScores[0][1] <= 0) {
    return {
      topEmotion: "unknown",
      confidence: 0.2,
      intensity: 0.2,
      alternatives: []
    };
  }

  const [topEmotion, topScore] = sortedScores[0];
  const secondScore = sortedScores.length > 1 ? sortedScores[1][1] : 0;
  const secondEmotion = sortedScores.length > 1 ? sortedScores[1][0] : null;

  const margin = topScore - secondScore;
  const separationRatio = topScore > 0 ? Math.min(1.0, margin / topScore) : 0;

  let baseEvidence = Math.min(1.0, topScore / 3.0);

  let agreementBonus = 0;
  if (directMatched && semanticMatched) {
    agreementBonus = 0.15;
  } else if (directMatched) {
    agreementBonus = 0.10;
  } else if (semanticMatched) {
    agreementBonus = 0.08;
  }

  let marginFactor = 0.5 + 0.5 * separationRatio;

  let qualityFactor = 1.0;
  if (wordCount < 2 && !directMatched) {
    qualityFactor = 0.65;
  } else if (wordCount > 6) {
    qualityFactor = 1.05;
  }

  let rawConfidence = (baseEvidence * 0.45 + agreementBonus + marginFactor * 0.45) * qualityFactor;
  rawConfidence = Math.max(0.20, Math.min(0.98, rawConfidence));

  if (margin === 0 && topScore > 0) {
    rawConfidence = Math.min(rawConfidence, 0.55);
  }

  let rawIntensity = (Math.min(1.0, topScore / 2.5) * 0.6 + conflictBoost * 0.3 + (intensityModifier - 1.0) * 0.4);
  rawIntensity = Math.max(0.20, Math.min(0.99, rawIntensity));

  const alternatives = [];
  for (const [altEmotion, altScore] of sortedScores.slice(1, 4)) {
    if (altScore > 0 && altScore >= topScore * 0.25) {
      const altConf = Math.max(0.25, Math.min(0.90, rawConfidence * (altScore / topScore)));
      const altInt = Math.max(0.20, Math.min(0.90, rawIntensity * (altScore / topScore)));
      alternatives.push({
        emotion: altEmotion,
        confidence: parseFloat(altConf.toFixed(2)),
        intensity: parseFloat(altInt.toFixed(2))
      });
    }
  }

  return {
    topEmotion,
    confidence: parseFloat(rawConfidence.toFixed(2)),
    intensity: parseFloat(rawIntensity.toFixed(2)),
    alternatives
  };
}
