/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { getUserHistory, clearUserHistory } from '../../../lib/user/history';

export default async function handler(req, res) {
  const { userId = 'guest' } = req.query;

  if (req.method === 'GET') {
    const history = getUserHistory(userId);
    return res.status(200).json({ success: true, history });
  }

  if (req.method === 'DELETE' || (req.method === 'POST' && req.body?.action === 'clear')) {
    clearUserHistory(userId);
    return res.status(200).json({ success: true, message: 'History cleared' });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}

