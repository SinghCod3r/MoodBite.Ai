/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { useState, useEffect } from 'react';

const MOOD_GRADIENTS = {
  neutral: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(99, 102, 241, 0.45) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.38) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(147, 51, 234, 0.30) 0%, transparent 55%), linear-gradient(180deg, #0d1226 0%, #060913 60%, #030408 100%)",
  joy: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(245, 158, 11, 0.50) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(234, 88, 12, 0.42) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(217, 119, 6, 0.32) 0%, transparent 55%), linear-gradient(180deg, #241004 0%, #100602 60%, #050201 100%)",
  stress: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(59, 130, 246, 0.50) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.42) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(14, 165, 233, 0.32) 0%, transparent 55%), linear-gradient(180deg, #0b1a40 0%, #040c20 60%, #02050e 100%)",
  sadness: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(20, 184, 166, 0.46) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(13, 148, 136, 0.40) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(16, 185, 129, 0.28) 0%, transparent 55%), linear-gradient(180deg, #082926 0%, #031413 60%, #010808 100%)",
  anger: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(244, 63, 94, 0.50) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(225, 29, 72, 0.42) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(239, 68, 68, 0.32) 0%, transparent 55%), linear-gradient(180deg, #2c0710 0%, #140206 60%, #060102 100%)",
  calm: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(6, 182, 212, 0.46) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(8, 145, 178, 0.40) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(20, 184, 166, 0.28) 0%, transparent 55%), linear-gradient(180deg, #092837 0%, #03141c 60%, #01070a 100%)",
  fear: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(168, 85, 247, 0.50) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(126, 34, 206, 0.42) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(139, 92, 246, 0.32) 0%, transparent 55%), linear-gradient(180deg, #22083c 0%, #0d0218 60%, #040108 100%)",
  excitement: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(236, 72, 153, 0.50) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(219, 39, 119, 0.42) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(245, 158, 11, 0.32) 0%, transparent 55%), linear-gradient(180deg, #2d071a 0%, #14020b 60%, #060104 100%)",
  boredom: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(148, 163, 184, 0.40) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(100, 116, 139, 0.35) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(99, 102, 241, 0.25) 0%, transparent 55%), linear-gradient(180deg, #151e33 0%, #090e18 60%, #030509 100%)",
  loneliness: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(129, 140, 248, 0.46) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.40) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(96, 165, 250, 0.30) 0%, transparent 55%), linear-gradient(180deg, #0e193c 0%, #050b1d 60%, #02040c 100%)",
  ambiguous: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(192, 38, 211, 0.48) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(147, 51, 234, 0.40) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(124, 58, 237, 0.30) 0%, transparent 55%), linear-gradient(180deg, #22073e 0%, #0c0116 60%, #040008 100%)",
  unknown: "radial-gradient(ellipse 80% 50% at 50% 12%, rgba(99, 102, 241, 0.42) 0%, transparent 70%), radial-gradient(circle at 10% 20%, rgba(79, 70, 229, 0.35) 0%, transparent 55%), radial-gradient(circle at 90% 75%, rgba(56, 189, 248, 0.25) 0%, transparent 55%), linear-gradient(180deg, #111a30 0%, #070c17 60%, #020509 100%)"
};

export default function MoodBackground({ mood = "neutral" }) {
  const [currentMood, setCurrentMood] = useState(mood);
  const [previousMood, setPreviousMood] = useState(null);
  const [isCrossFading, setIsCrossFading] = useState(false);

  useEffect(() => {
    if (mood !== currentMood) {
      setPreviousMood(currentMood);
      setCurrentMood(mood);
      setIsCrossFading(true);

      const timer = setTimeout(() => {
        setIsCrossFading(false);
        setPreviousMood(null);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [mood, currentMood]);

  const activeGradient = MOOD_GRADIENTS[currentMood] || MOOD_GRADIENTS.neutral;
  const prevGradient = previousMood ? (MOOD_GRADIENTS[previousMood] || MOOD_GRADIENTS.neutral) : null;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Primary Current Mood Layer */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: activeGradient,
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />

      {/* Cross-fade Previous Layer for 100% GPU-only Dissolve */}
      {prevGradient && (
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out ${
            isCrossFading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            background: prevGradient,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden'
          }}
        />
      )}
    </div>
  );
}
