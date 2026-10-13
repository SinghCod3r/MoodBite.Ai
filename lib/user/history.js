/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import fs from 'fs';
import path from 'path';

const HISTORY_FILE = path.join(process.cwd(), 'data', 'history.json');

const historyMap = new Map();

function initHistory() {
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      const data = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
      if (typeof data === 'object' && data !== null) {
        for (const [key, val] of Object.entries(data)) {
          historyMap.set(key, val);
        }
      }
    }
  } catch (e) {
    console.warn("[UserHistory] Failed to read history file:", e.message);
  }
}

initHistory();

function saveHistory() {
  try {
    const obj = Object.fromEntries(historyMap);
    fs.mkdirSync(path.dirname(HISTORY_FILE), { recursive: true });
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) {
    console.warn("[UserHistory] Failed to write history file:", e.message);
  }
}

export function recordMoodEvent(userId = "guest", event = {}) {
  if (!historyMap.has(userId)) {
    historyMap.set(userId, { moodEvents: [], foodEvents: [] });
  }
  const userHist = historyMap.get(userId);
  const entry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    input: event.input,
    detectedEmotion: event.detectedEmotion,
    intensity: event.intensity,
    confidence: event.confidence,
    context: event.context
  };

  userHist.moodEvents.push(entry);

  if (userHist.moodEvents.length > 50) {
    userHist.moodEvents = userHist.moodEvents.slice(-50);
  }
  saveHistory();
  return entry;
}

export function recordFoodEvent(userId = "guest", event = {}) {
  if (!historyMap.has(userId)) {
    historyMap.set(userId, { moodEvents: [], foodEvents: [] });
  }
  const userHist = historyMap.get(userId);
  const entry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    recommendedFood: event.recommendedFood,
    predictedMood: event.predictedMood,
    feedback: event.feedback || null
  };

  userHist.foodEvents.push(entry);
  if (userHist.foodEvents.length > 50) {
    userHist.foodEvents = userHist.foodEvents.slice(-50);
  }
  saveHistory();
  return entry;
}

export function getUserHistory(userId = "guest") {
  return historyMap.get(userId) || { moodEvents: [], foodEvents: [] };
}

export function clearUserHistory(userId = "guest") {
  historyMap.set(userId, { moodEvents: [], foodEvents: [] });
  saveHistory();
  return true;
}

