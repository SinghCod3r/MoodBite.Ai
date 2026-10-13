/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { getUserProfile, updateUserProfile, deleteUserData } from '../../../lib/user/profile';
import { getUserHistory, clearUserHistory } from '../../../lib/user/history';

export default async function handler(req, res) {
  const userId = (req.query.userId || req.body?.userId || 'guest').toString();

  if (req.method === 'GET') {
    try {
      const profile = getUserProfile(userId);
      const history = getUserHistory(userId);
      return res.status(200).json({ profile, history });
    } catch (e) {
      return res.status(500).json({ message: 'Failed to retrieve profile', error: e.message });
    }
  }

  if (req.method === 'POST') {
    const { action, updates } = req.body || {};

    try {
      if (action === 'clear_history') {
        clearUserHistory(userId);
        return res.status(200).json({ success: true, message: 'History cleared' });
      }

      if (action === 'delete_data') {
        deleteUserData(userId);
        clearUserHistory(userId);
        return res.status(200).json({ success: true, message: 'User data wiped' });
      }

      if (updates) {
        const updated = updateUserProfile(userId, updates);
        return res.status(200).json({ success: true, profile: updated });
      }

      return res.status(400).json({ message: 'No valid action or updates provided' });
    } catch (e) {
      return res.status(500).json({ message: 'Failed to update user profile', error: e.message });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}

