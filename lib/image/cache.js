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

const CACHE_FILE = path.join(process.cwd(), 'data', 'image_cache.json');

const memoryCache = new Map();

function initCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
      if (typeof data === 'object' && data !== null) {
        for (const [key, val] of Object.entries(data)) {
          memoryCache.set(key.toLowerCase().trim(), val);
        }
      }
    }
  } catch (e) {
    console.warn("[ImageCache] Could not load cache from disk:", e.message);
  }
}

initCache();

export function getCachedImage(foodName) {
  if (!foodName) return null;
  const key = foodName.toLowerCase().trim().replace(/[^a-zA-Z0-9 ]/g, "");
  return memoryCache.get(key) || null;
}

export function setCachedImage(foodName, imageData) {
  if (!foodName || !imageData) return;
  const key = foodName.toLowerCase().trim().replace(/[^a-zA-Z0-9 ]/g, "");
  const entry = {
    ...imageData,
    cachedAt: new Date().toISOString()
  };
  memoryCache.set(key, entry);

  try {
    const obj = Object.fromEntries(memoryCache);
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) {

    console.warn("[ImageCache] Could not write cache to disk:", e.message);
  }
}
