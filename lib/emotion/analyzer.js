/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { CANONICAL_EMOTIONS, CANONICAL_VECTORS, normalizeEmotion } from './ontology.js';
import { splitIntoClauses, checkNegation } from './negation.js';
import { extractSemanticSignals } from './semantic.js';
import { calculateConfidenceAndIntensity } from './confidence.js';
import { EMOTION_LEXICON, STRONG_CONFLICT_WORDS, MEDIUM_CONFLICT_WORDS } from '../../evm/dictionaries.js';

export function analyzeEmotion(text, options = {}) {
  if (!text || typeof text !== "string" || !text.trim()) {
    return {
      mood: "unknown",
      dominantEmotion: "unknown",
      confidence: 0.1,
      intensity: 0.1,
      isAmbiguous: false,
      isNegated: false,
      emotions: [],
      alternatives: [],
      vector: CANONICAL_VECTORS.unknown,
      context: null,
      source: "Empty Input"
    };
  }

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();
  const words = lower.split(/\s+|[.,!?;:]+/).filter(Boolean);
  const clauses = splitIntoClauses(trimmed);

  let directEmotion = null;
  let directMatched = false;

  for (const clause of clauses) {
    const clauseWords = clause.toLowerCase().split(/\s+/);
    for (const [rawEmotion, keywords] of Object.entries(EMOTION_LEXICON)) {
      for (const kw of [rawEmotion, ...keywords.slice(0, 4)]) {
        const isExactWord = clause.trim().toLowerCase() === kw;
        const directRegex = new RegExp(`\\b(?:i feel|i am feeling|i'm feeling|i am|i'm|feeling)\\s+(?:so|very|extremely|really|a bit)?\\s*${kw}\\b`, 'i');
        if (isExactWord || directRegex.test(clause)) {

          const neg = checkNegation(clause, kw);
          if (!neg.isNegated || neg.isDoubleNegation) {
            directEmotion = normalizeEmotion(rawEmotion);
            directMatched = true;
            break;
          }
        }
      }
      if (directMatched) break;
    }
    if (directMatched) break;
  }

  const scores = {};
  for (const emo of CANONICAL_EMOTIONS) {
    scores[emo] = 0;
  }

  let totalNegatedHits = 0;

  for (const clause of clauses) {
    const clauseWords = clause.toLowerCase().split(/\s+/);

    for (const [rawEmotion, keywords] of Object.entries(EMOTION_LEXICON)) {
      const canonical = normalizeEmotion(rawEmotion);

      for (const kw of keywords) {

        const kwRegex = new RegExp(`\\b${kw}\\b`, 'i');
        if (kwRegex.test(clause)) {
          const neg = checkNegation(clause, kw);
          if (neg.isNegated && !neg.isDoubleNegation) {

            totalNegatedHits++;

            if (["sadness", "anger", "fear", "stress"].includes(canonical)) {
              scores.calm = (scores.calm || 0) + 0.3;
            }
          } else {

            const boost = clauseWords.includes(kw) ? 1.5 : 1.0;
            scores[canonical] = (scores[canonical] || 0) + boost;
          }
        }
      }
    }
  }

  const semantic = extractSemanticSignals(trimmed);
  const semanticMatched = Object.keys(semantic.signals).length > 0;

  for (const [emo, val] of Object.entries(semantic.signals)) {
    const canonical = normalizeEmotion(emo);
    scores[canonical] = (scores[canonical] || 0) + val;
  }

  let arousalBoost = 0;
  let conflictLevel = "none";
  if (STRONG_CONFLICT_WORDS.some(w => new RegExp(`\\b${w}\\b`, 'i').test(lower))) {
    arousalBoost = 0.50;
    conflictLevel = "strong";
    scores.anger = (scores.anger || 0) + 1.5;
  } else if (MEDIUM_CONFLICT_WORDS.some(w => new RegExp(`\\b${w}\\b`, 'i').test(lower))) {
    arousalBoost = 0.30;
    conflictLevel = "medium";
    scores.stress = (scores.stress || 0) + 1.0;
  }

  if (directMatched && directEmotion) {
    scores[directEmotion] = (scores[directEmotion] || 0) + 2.0;
  }

  const sortedScores = Object.entries(scores)
    .filter(([_, s]) => s > 0)
    .sort((a, b) => b[1] - a[1]);

  if (sortedScores.length === 0) {
    if (totalNegatedHits > 0) {
      return {
        mood: "neutral",
        dominantEmotion: "neutral",
        confidence: 0.65,
        intensity: 0.35,
        isAmbiguous: false,
        isNegated: true,
        emotions: [{ emotion: "neutral", intensity: 0.35 }],
        alternatives: [],
        vector: CANONICAL_VECTORS.neutral,
        context: null,
        source: "Negation Resolution"
      };
    }

    return {
      mood: "unknown",
      dominantEmotion: "unknown",
      confidence: 0.20,
      intensity: 0.15,
      isAmbiguous: false,
      isNegated: false,
      emotions: [],
      alternatives: [],
      vector: CANONICAL_VECTORS.unknown,
      context: null,
      source: "No Evidence Found"
    };
  }

  if (sortedScores[0][0] === "ambiguous" || (lower.includes("weird") && sortedScores[0][1] < 1.5)) {
    return {
      mood: "ambiguous",
      dominantEmotion: "ambiguous",
      confidence: 0.50,
      intensity: 0.40,
      isAmbiguous: true,
      isNegated: false,
      emotions: [{ emotion: "ambiguous", intensity: 0.40 }],
      alternatives: sortedScores.slice(1, 3).map(([e]) => ({ emotion: e, confidence: 0.35 })),
      vector: CANONICAL_VECTORS.ambiguous,
      context: semantic.detectedContext || "ambiguous",
      source: "Ambiguous Evidence"
    };
  }

  const confidenceResult = calculateConfidenceAndIntensity({
    sortedScores,
    directMatched,
    semanticMatched,
    conflictBoost: arousalBoost,
    intensityModifier: semantic.intensityModifier,
    wordCount: words.length
  });

  const dominantEmotion = confidenceResult.topEmotion;

  const baseVector = CANONICAL_VECTORS[dominantEmotion] || CANONICAL_VECTORS.neutral;
  const vector = {
    valence: parseFloat(baseVector.valence.toFixed(2)),
    arousal: parseFloat(Math.min(1.0, Math.max(-1.0, baseVector.arousal + arousalBoost)).toFixed(2)),
    control: parseFloat(baseVector.control.toFixed(2)),
    certainty: parseFloat(confidenceResult.confidence.toFixed(2))
  };

  let finalContext = semantic.detectedContext;
  if (conflictLevel !== "none") {
    vector.control = parseFloat(Math.max(0.1, vector.control - (conflictLevel === "strong" ? 0.25 : 0.15)).toFixed(2));
    finalContext = finalContext || "conflict";
  }

  const allEmotions = [
    { emotion: dominantEmotion, intensity: confidenceResult.intensity },
    ...confidenceResult.alternatives.map(a => ({ emotion: a.emotion, intensity: a.intensity }))
  ];

  return {
    mood: dominantEmotion,
    dominantEmotion,
    confidence: confidenceResult.confidence,
    intensity: confidenceResult.intensity,
    isAmbiguous: dominantEmotion === "ambiguous",
    isNegated: totalNegatedHits > 0,
    emotions: allEmotions,
    alternatives: confidenceResult.alternatives,
    vector,
    context: finalContext,
    source: directMatched ? "Direct Semantic Match" : semanticMatched ? "Contextual Inference" : "Lexical EVM Logic"
  };
}
