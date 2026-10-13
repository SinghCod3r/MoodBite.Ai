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
import { classifyIntent, INTENTS } from '../lib/intent/classifier.js';

test('Intent Classifier - Valid Mood Inputs', () => {
  const r1 = classifyIntent("I am feeling very sad and down today");
  assert.equal(r1.intent, INTENTS.MOOD);

  const r2 = classifyIntent("I'm stressed because of exams");
  assert.equal(r2.intent, INTENTS.MOOD);

  const r3 = classifyIntent("My exam is tomorrow and I haven't studied anything");
  assert.equal(r3.intent, INTENTS.MOOD);
});

test('Intent Classifier - Food Requests', () => {
  const r1 = classifyIntent("What can I eat right now?");
  assert.equal(r1.intent, INTENTS.FOOD_REQUEST);

  const r2 = classifyIntent("Recommend me something comforting to eat");
  assert.equal(r2.intent, INTENTS.FOOD_REQUEST);
});

test('Intent Classifier - Off-Topic Inputs', () => {
  const r1 = classifyIntent("What is Python?");
  assert.equal(r1.intent, INTENTS.OFF_TOPIC);
  assert.ok(r1.message);

  const r2 = classifyIntent("Tell me about quantum physics and relativity");
  assert.equal(r2.intent, INTENTS.OFF_TOPIC);

  const r3 = classifyIntent("Who is the prime minister?");
  assert.equal(r3.intent, INTENTS.OFF_TOPIC);
});

test('Intent Classifier - Greetings', () => {
  const r1 = classifyIntent("Hey");
  assert.equal(r1.intent, INTENTS.GREETING);

  const r2 = classifyIntent("Hello there");
  assert.equal(r2.intent, INTENTS.GREETING);
});

test('Intent Classifier - Gibberish & Unknown', () => {
  const r1 = classifyIntent("asdfgh");
  assert.equal(r1.intent, INTENTS.UNKNOWN);

  const r2 = classifyIntent("???");
  assert.equal(r2.intent, INTENTS.UNKNOWN);

  const r3 = classifyIntent("");
  assert.equal(r3.intent, INTENTS.UNKNOWN);
});

test('Intent Classifier - Very Long Text with Mixed Signals', () => {
  const longText = "I have been working for twelve hours straight without any break. My eyes hurt, my head is throbbing with pain, and my manager is still asking for another presentation before tomorrow morning.";
  const r = classifyIntent(longText);
  assert.equal(r.intent, INTENTS.MOOD);
});

test('Intent Classifier - Inline Constraints Extraction', () => {
  const r1 = classifyIntent("I am stressed and want something vegetarian to make at home");
  assert.equal(r1.extractedConstraints.dietary, "vegetarian");
  assert.equal(r1.extractedConstraints.availability, "home");

  const r2 = classifyIntent("Need spicy food to order for dinner");
  assert.equal(r2.extractedConstraints.spice, "high");
  assert.equal(r2.extractedConstraints.availability, "delivery");
});

