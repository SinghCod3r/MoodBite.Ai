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
import { getUserProfile, updateUserProfile, deleteUserData } from '../lib/user/profile.js';
import { recordFeedback } from '../lib/user/feedback.js';
import { getUserHistory, clearUserHistory, recordMoodEvent } from '../lib/user/history.js';

test('Personalization - Profile Creation & Update', () => {
  const testUser = "test_user_1";
  const profile = getUserProfile(testUser);
  assert.equal(profile.dietaryPreference, "vegetarian");

  const updated = updateUserProfile(testUser, { spicePreference: "high" });
  assert.equal(updated.spicePreference, "high");

  const reloaded = getUserProfile(testUser);
  assert.equal(reloaded.spicePreference, "high");
});

test('Personalization - Feedback Loop Updates Preferences', () => {
  const testUser = "test_user_feedback";

  recordFeedback({
    userId: testUser,
    feedback: "loved",
    suggestedFood: "Comforting Khichdi",
    foodId: "comforting-khichdi",
    predictedMood: "stress"
  });

  const profileAfterLove = getUserProfile(testUser);
  assert.ok(profileAfterLove.favoriteFoods.includes("comforting-khichdi"));

  recordFeedback({
    userId: testUser,
    feedback: "bad",
    suggestedFood: "Chilli Paneer",
    foodId: "chilli-paneer",
    predictedMood: "anger"
  });

  const profileAfterDislike = getUserProfile(testUser);
  assert.ok(profileAfterDislike.dislikedFoods.includes("chilli-paneer"));
});

test('Personalization - History Recording and Clearing', () => {
  const testUser = "test_user_hist";
  recordMoodEvent(testUser, {
    input: "Feeling very stressed",
    detectedEmotion: "stress",
    intensity: 0.8,
    confidence: 0.85
  });

  const hist = getUserHistory(testUser);
  assert.equal(hist.moodEvents.length, 1);
  assert.equal(hist.moodEvents[0].detectedEmotion, "stress");

  clearUserHistory(testUser);
  const cleared = getUserHistory(testUser);
  assert.equal(cleared.moodEvents.length, 0);

  deleteUserData(testUser);
});

