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
import { getCachedImage, setCachedImage } from '../lib/image/cache.js';
import { resolveFoodImage } from '../lib/image/validator.js';

test('Image Cache - Set and Retrieve Image', () => {
  const testFood = "test-khichdi-mock";
  setCachedImage(testFood, {
    imageUrl: "https://images.unsplash.com/photo-test-khichdi",
    confidence: 0.95
  });

  const cached = getCachedImage(testFood);
  assert.ok(cached);
  assert.equal(cached.imageUrl, "https://images.unsplash.com/photo-test-khichdi");
  assert.equal(cached.confidence, 0.95);
});

test('Image Resolver - Cache Hit Returns Cached Result', async () => {
  const testFood = "test-cached-food";
  setCachedImage(testFood, {
    imageUrl: "https://images.unsplash.com/cached-test",
    confidence: 0.92
  });

  const result = await resolveFoodImage(testFood, "main_course");
  assert.equal(result.isCached, true);
  assert.equal(result.imageUrl, "https://images.unsplash.com/cached-test");
});

test('Image Resolver - Empty Query Returns Default Verified Image', async () => {
  const result = await resolveFoodImage("", "default");
  assert.ok(result.imageUrl.startsWith("https://"));
  assert.ok(result.confidence > 0.5);
});

