/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeEmotion } from '../lib/emotion/analyzer.js';
import { checkNegation, splitIntoClauses } from '../lib/emotion/negation.js';

test('Negation Unit - checkNegation Helper', () => {
  const r1 = checkNegation("I am not sad", "sad");
  assert.equal(r1.isNegated, true);
  assert.equal(r1.isDoubleNegation, false);

  const r2 = checkNegation("I am really sad", "sad");
  assert.equal(r2.isNegated, false);

  const r3 = checkNegation("I am no longer angry", "angry");
  assert.equal(r3.isNegated, true);

  const r4 = checkNegation("I cannot say I am not happy", "happy");
  assert.equal(r4.isDoubleNegation, true);
});

test('Negation - Positive vs Negative Emotions', () => {
  const positive = analyzeEmotion("I am sad");
  assert.equal(positive.dominantEmotion, "sadness");

  const negative = analyzeEmotion("I am not sad");
  assert.notEqual(negative.dominantEmotion, "sadness", "'I am not sad' must not be classified as sadness");
});

test('Negation - Multiple Negated Emotion Phrasings', () => {
  const r1 = analyzeEmotion("I am not angry");
  assert.notEqual(r1.dominantEmotion, "anger");

  const r2 = analyzeEmotion("I don't feel stressed");
  assert.notEqual(r2.dominantEmotion, "stress");

  const r3 = analyzeEmotion("I am no longer upset");
  assert.notEqual(r3.dominantEmotion, "anger");
});

test('Negation - Contextual Boundary Crossing Clauses', () => {
  const r = analyzeEmotion("I am not sad, but I am completely exhausted");

  assert.notEqual(r.dominantEmotion, "sadness");
  assert.equal(r.dominantEmotion, "stress");
});

