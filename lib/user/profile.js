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

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export const DEFAULT_PROFILE = {
  dietaryPreference: "vegetarian",
  preferredCuisines: ["north_indian", "south_indian", "pan_indian"],
  spicePreference: "medium",
  availabilityPreference: "any",
  favoriteFoods: [],
  dislikedFoods: [],
  budgetPreference: { min: 50, max: 300 },
  personalizationEnabled: true
};

const profilesMap = new Map();

function initProfiles() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
      if (typeof data === 'object' && data !== null) {
        for (const [key, val] of Object.entries(data)) {
          profilesMap.set(key, val);
        }
      }
    }
  } catch (e) {
    console.warn("[UserProfile] Failed to load users file:", e.message);
  }
}

initProfiles();

function saveProfiles() {
  try {
    const obj = Object.fromEntries(profilesMap);
    fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
    fs.writeFileSync(USERS_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) {
    console.warn("[UserProfile] Failed to write users file:", e.message);
  }
}

export function getUserProfile(userId = "guest") {
  if (!profilesMap.has(userId)) {
    profilesMap.set(userId, { ...DEFAULT_PROFILE, userId, createdAt: new Date().toISOString() });
    saveProfiles();
  }
  return profilesMap.get(userId);
}

export function updateUserProfile(userId = "guest", updates = {}) {
  const current = getUserProfile(userId);
  const updated = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  profilesMap.set(userId, updated);
  saveProfiles();
  return updated;
}

export function deleteUserData(userId = "guest") {
  profilesMap.delete(userId);
  saveProfiles();
  return true;
}

