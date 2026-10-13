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

test('Emotion Analyzer - Direct Emotion Phrases', () => {
  const r1 = analyzeEmotion("I am so sad");
  assert.equal(r1.dominantEmotion, "sadness");
  assert.ok(r1.confidence > 0.6);

  const r2 = analyzeEmotion("I am furious right now");
  assert.equal(r2.dominantEmotion, "anger");
  assert.ok(r2.confidence > 0.6);

  const r3 = analyzeEmotion("I feel joy and gratitude");
  assert.equal(r3.dominantEmotion, "joy");
});

test('Emotion Analyzer - Implicit Emotion Without Explicit Emotion Words', () => {
  const r = analyzeEmotion("My exam is tomorrow and I haven't studied anything");

  assert.ok(r.dominantEmotion === "stress" || r.dominantEmotion === "fear");
  assert.equal(r.context, "academic");
  assert.ok(r.confidence > 0.5);
});

test('Emotion Analyzer - Long-Form Multi-Sentence Understanding', () => {
  const longInput = "I've been preparing for this exam for months. I barely slept last night and now that it's tomorrow I'm terrified that I'm going to fail even though I've studied everything.";
  const r = analyzeEmotion(longInput);
  assert.ok(["fear", "stress"].includes(r.dominantEmotion));
  assert.ok(r.intensity >= 0.7, "Expected high intensity");
  assert.equal(r.context, "academic");
  assert.ok(r.confidence > 0.6);
});

test('Emotion Analyzer - Ambiguous State ("Today was weird")', () => {
  const r = analyzeEmotion("Today was weird.");
  assert.equal(r.dominantEmotion, "ambiguous");
  assert.equal(r.isAmbiguous, true);

  assert.ok(r.confidence <= 0.6);
});

test('Emotion Analyzer - Mixed Emotions Detection', () => {
  const r = analyzeEmotion("I'm excited about getting the job but I'm also terrified that I'll fail");

  const detectedEmotions = r.emotions.map(e => e.emotion);
  assert.ok(detectedEmotions.includes("excitement") || detectedEmotions.includes("joy"));
  assert.ok(detectedEmotions.includes("fear") || detectedEmotions.includes("stress"));
  assert.ok(r.alternatives.length > 0);
});

test('Emotion Analyzer - Calibrated Real Confidence', () => {

  const strong = analyzeEmotion("I am absolutely furious and yelling with rage");

  const moderate = analyzeEmotion("a bit tired");

  assert.ok(strong.confidence > moderate.confidence, "Strong signal should have higher confidence than weak signal");
  assert.notEqual(strong.confidence, 75, "Confidence must not be hardcoded to 75");
  assert.notEqual(moderate.confidence, 75, "Confidence must not be hardcoded to 75");
});

