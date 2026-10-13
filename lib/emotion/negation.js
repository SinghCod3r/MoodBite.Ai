/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

const NEGATION_CUES = [
  "not", "n't", "no", "never", "no longer", "hardly", "barely",
  "scarcely", "cannot", "can't", "ain't", "don't", "doesn't", "didn't",
  "won't", "wouldn't", "shouldn't", "isn't", "aren't", "wasn't",
  "weren't", "without", "stop", "stopped", "quit"
];

const CLAUSE_SEPARATORS = [
  "but", "however", "although", "though", "yet", "except", "instead",
  "while", "whereas", ";", ".", "!", "?"
];

export function splitIntoClauses(text) {
  if (!text) return [];

  const pattern = /(?:[,.!?;]|\b(?:but|however|although|though|yet|except|instead|while|whereas)\b)/gi;
  const parts = text.split(pattern).map(s => s.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [text.trim()];
}

export function checkNegation(clause, targetWord) {
  if (!clause || !targetWord) {
    return { isNegated: false, isDoubleNegation: false, negationCue: null };
  }

  const lowerClause = clause.toLowerCase();
  const lowerTarget = targetWord.toLowerCase();
  const tokens = lowerClause.split(/\s+/);

  const targetIndex = tokens.findIndex(t => t.includes(lowerTarget));
  if (targetIndex === -1) {
    return { isNegated: false, isDoubleNegation: false, negationCue: null };
  }

  const precedingTokens = tokens.slice(0, targetIndex);

  let negCount = 0;
  let lastCue = null;

  for (const token of precedingTokens) {
    const cleanToken = token.replace(/[^a-z']/g, "");
    if (NEGATION_CUES.some(cue => cleanToken === cue || cleanToken.endsWith("n't"))) {
      negCount++;
      lastCue = cleanToken;
    }
  }

  const precedingStr = precedingTokens.join(" ");
  if (precedingStr.includes("no longer")) {
    negCount = Math.max(negCount, 1);
    lastCue = "no longer";
  }

  const isDoubleNegation = negCount > 0 && negCount % 2 === 0;
  const isNegated = negCount > 0 && negCount % 2 === 1;

  return {
    isNegated,
    isDoubleNegation,
    negationCue: lastCue
  };
}
