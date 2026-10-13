/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { splitIntoClauses, checkNegation } from './negation.js';
import { normalizeEmotion } from './ontology.js';

export const IMPLICIT_SCENARIOS = [
  {
    category: "academic",
    triggers: [
      /\b(?:exam|exams|test|tests|finals|midterms|viva)\b/i,
      /\b(?:preparing for this exam|studied everything|studying)\b/i,
      /haven't studied/i,
      /haven't prepared/i,
      /failed (my )?(test|exam|midterm|finals)/i,
      /flunked/i,
      /studying all night/i,
      /pulled an all-?nighter/i,
      /assignment due/i,
      /semester result/i
    ],
    emotions: { stress: 0.85, fear: 0.75 },
    context: "academic"
  },
  {
    category: "fatigue_burnout",
    triggers: [
      /barely slept/i,
      /couldn't sleep/i,
      /running on empty/i,
      /brain is fried/i,
      /so drained/i,
      /need a break/i,
      /overworked/i,
      /long grueling day/i
    ],
    emotions: { stress: 0.80, sadness: 0.40 },
    context: "fatigue"
  },
  {
    category: "career_pressure",
    triggers: [
      /boss (is |was )?(screaming|yelling|angry|pissed)/i,
      /laid off|lost my job|fired from/i,
      /interview (is )?(tomorrow|today)/i,
      /presentation tomorrow/i,
      /deadline (in an hour|tonight|approaching)/i,
      /deal fell through/i
    ],
    emotions: { stress: 0.85, fear: 0.65 },
    context: "professional"
  },
  {
    category: "social_loneliness",
    triggers: [
      /nobody to talk to/i,
      /eating alone/i,
      /miss (my )?(mom|dad|family|home|friends)/i,
      /homesick/i,
      /no one cares/i,
      /isolated/i,
      /by myself on a weekend/i
    ],
    emotions: { loneliness: 0.85, sadness: 0.70 },
    context: "social"
  },
  {
    category: "celebration_success",
    triggers: [
      /cleared (the )?(exam|interview|test|round)/i,
      /got the job|got hired|offer letter/i,
      /promoted|promotion/i,
      /we won|i won/i,
      /finally finished|it's over and done/i,
      /celebrating/i
    ],
    emotions: { joy: 0.85, excitement: 0.80 },
    context: "achievement"
  },
  {
    category: "conflict",
    triggers: [
      /had a huge (fight|argument)/i,
      /yelled at me|screamed at me/i,
      /infuriating/i,
      /can't stand them/i,
      /ruined my day/i
    ],
    emotions: { anger: 0.90, stress: 0.50 },
    context: "conflict"
  },
  {
    category: "ambiguous",
    triggers: [
      /today was weird/i,
      /feeling (?:a bit|kind of|kinda|sort of)?\s*strange/i,
      /strange about/i,
      /don't know how i feel/i,
      /peculiar day/i,
      /mixed feelings/i,
      /not sure what to think/i
    ],
    emotions: { ambiguous: 0.80 },
    context: "ambiguous"
  }
];

export const INTENSIFIERS = {
  very: 1.25,
  really: 1.25,
  so: 1.2,
  extremely: 1.4,
  terribly: 1.4,
  deeply: 1.3,
  completely: 1.35,
  totally: 1.3,
  insanely: 1.4,
  super: 1.25,
  barely: 1.2,
  terrified: 1.35
};

export const DAMPENERS = {
  slightly: 0.75,
  somewhat: 0.8,
  mildly: 0.7,
  "a bit": 0.8,
  "kind of": 0.8,
  kinda: 0.8,
  "sort of": 0.8
};

export function extractSemanticSignals(text) {
  if (!text) return { signals: {}, detectedContext: null, intensityModifier: 1.0 };

  const lower = text.toLowerCase();
  const signals = {};
  let detectedContext = null;
  let intensityModifier = 1.0;

  for (const [word, mult] of Object.entries(INTENSIFIERS)) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(lower)) {
      intensityModifier = Math.max(intensityModifier, mult);
    }
  }
  for (const [word, mult] of Object.entries(DAMPENERS)) {
    if (new RegExp(`\\b${word}\\b`, 'i').test(lower)) {
      intensityModifier = Math.min(intensityModifier, mult);
    }
  }

  const clauses = splitIntoClauses(text);

  for (const scenario of IMPLICIT_SCENARIOS) {
    for (const clause of clauses) {
      for (const pattern of scenario.triggers) {
        if (pattern.test(clause)) {

          const negation = checkNegation(clause, pattern.source.replace(/[^a-z0-9 ]/gi, ""));
          if (!negation.isNegated || negation.isDoubleNegation) {
            detectedContext = detectedContext || scenario.context;
            for (const [emo, score] of Object.entries(scenario.emotions)) {
              signals[emo] = (signals[emo] || 0) + score * intensityModifier;
            }
          }
        }
      }
    }
  }

  return { signals, detectedContext, intensityModifier };
}
