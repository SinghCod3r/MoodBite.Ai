/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export const emotionWeights = {
    anger: { valence: -0.8, arousal: 0.8, control: 0.2 },
    stress: { valence: -0.6, arousal: 0.6, control: 0.1 },
    joy: { valence: 0.8, arousal: 0.6, control: 0.7 },
    sadness: { valence: -0.7, arousal: -0.4, control: 0.3 },
    fear: { valence: -0.6, arousal: 0.8, control: 0.1 },
    calm: { valence: 0.6, arousal: -0.5, control: 0.8 },
    neutral: { valence: 0.1, arousal: 0.1, control: 0.5 }
};
