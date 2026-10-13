/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { motion } from 'framer-motion';

const MOOD_GRADIENTS = {
  neutral: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(67, 56, 202, 0.45) 0%, rgba(30, 27, 75, 0.7) 50%, #060913 100%), linear-gradient(180deg, #0d1226 0%, #05070e 100%)",
    orb1: "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(99, 102, 241, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)"
  },
  joy: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(217, 119, 6, 0.45) 0%, rgba(154, 52, 18, 0.65) 50%, #100603 100%), linear-gradient(180deg, #1f0d04 0%, #0a0402 100%)",
    orb1: "radial-gradient(circle, rgba(245, 158, 11, 0.65) 0%, rgba(245, 158, 11, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(234, 88, 12, 0.55) 0%, rgba(234, 88, 12, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(251, 146, 60, 0.32) 0%, transparent 70%)"
  },
  stress: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(37, 99, 235, 0.45) 0%, rgba(30, 58, 138, 0.65) 50%, #030816 100%), linear-gradient(180deg, #091738 0%, #030713 100%)",
    orb1: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(14, 165, 233, 0.5) 0%, rgba(14, 165, 233, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
  },
  sadness: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(13, 148, 136, 0.45) 0%, rgba(19, 78, 74, 0.65) 50%, #021413 100%), linear-gradient(180deg, #072624 0%, #020c0c 100%)",
    orb1: "radial-gradient(circle, rgba(20, 184, 166, 0.6) 0%, rgba(20, 184, 166, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(16, 185, 129, 0.5) 0%, rgba(16, 185, 129, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(45, 212, 191, 0.28) 0%, transparent 70%)"
  },
  anger: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(225, 29, 72, 0.45) 0%, rgba(136, 19, 55, 0.65) 50%, #160207 100%), linear-gradient(180deg, #27060e 0%, #0c0104 100%)",
    orb1: "radial-gradient(circle, rgba(244, 63, 94, 0.65) 0%, rgba(244, 63, 94, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(239, 68, 68, 0.55) 0%, rgba(239, 68, 68, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(244, 63, 94, 0.32) 0%, transparent 70%)"
  },
  calm: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(8, 145, 178, 0.45) 0%, rgba(22, 78, 99, 0.65) 50%, #03141b 100%), linear-gradient(180deg, #092330 0%, #030d12 100%)",
    orb1: "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, rgba(6, 182, 212, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(20, 184, 166, 0.5) 0%, rgba(20, 184, 166, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(34, 211, 238, 0.3) 0%, transparent 70%)"
  },
  fear: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(126, 34, 206, 0.45) 0%, rgba(88, 28, 135, 0.65) 50%, #0e021a 100%), linear-gradient(180deg, #1e0735 0%, #07010d 100%)",
    orb1: "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 70%)"
  },
  excitement: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(219, 39, 119, 0.45) 0%, rgba(131, 24, 67, 0.65) 50%, #16020c 100%), linear-gradient(180deg, #280617 0%, #0d0107 100%)",
    orb1: "radial-gradient(circle, rgba(236, 72, 153, 0.65) 0%, rgba(236, 72, 153, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(245, 158, 11, 0.55) 0%, rgba(245, 158, 11, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(244, 114, 182, 0.32) 0%, transparent 70%)"
  },
  boredom: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(100, 116, 139, 0.45) 0%, rgba(51, 65, 85, 0.65) 50%, #090d16 100%), linear-gradient(180deg, #131b2e 0%, #060911 100%)",
    orb1: "radial-gradient(circle, rgba(148, 163, 184, 0.5) 0%, rgba(148, 163, 184, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, rgba(99, 102, 241, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(148, 163, 184, 0.26) 0%, transparent 70%)"
  },
  loneliness: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(79, 70, 229, 0.45) 0%, rgba(30, 58, 138, 0.65) 50%, #030816 100%), linear-gradient(180deg, #0d1738 0%, #040816 100%)",
    orb1: "radial-gradient(circle, rgba(129, 140, 248, 0.6) 0%, rgba(129, 140, 248, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, rgba(96, 165, 250, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(129, 140, 248, 0.3) 0%, transparent 70%)"
  },
  ambiguous: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(147, 51, 234, 0.45) 0%, rgba(88, 28, 135, 0.65) 50%, #0e021a 100%), linear-gradient(180deg, #1d0636 0%, #08010f 100%)",
    orb1: "radial-gradient(circle, rgba(192, 38, 211, 0.6) 0%, rgba(192, 38, 211, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(124, 58, 237, 0.5) 0%, rgba(124, 58, 237, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(192, 38, 211, 0.3) 0%, transparent 70%)"
  },
  unknown: {
    gradient: "radial-gradient(ellipse 85% 60% at 50% 18%, rgba(79, 70, 229, 0.4) 0%, rgba(30, 41, 59, 0.65) 50%, #060913 100%), linear-gradient(180deg, #0f172a 0%, #05070e 100%)",
    orb1: "radial-gradient(circle, rgba(99, 102, 241, 0.55) 0%, rgba(99, 102, 241, 0) 70%)",
    orb2: "radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0) 70%)",
    center: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.28) 0%, transparent 70%)"
  }
};

export default function MoodBackground({ mood = "neutral" }) {
  const current = MOOD_GRADIENTS[mood] || MOOD_GRADIENTS.neutral;

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 transition-all duration-1000"
      style={{ background: current.gradient }}
    >
      {/* Central Ambient Aura right behind main content */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[60vh] max-w-[1100px] pointer-events-none transition-all duration-1000"
        style={{
          background: current.center,
          filter: "blur(60px)"
        }}
      />

      {/* Floating Animated Ambient Orb 1 */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.12, 1]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[5%] -left-[5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{ background: current.orb1, filter: "blur(65px)" }}
      />

      {/* Floating Animated Ambient Orb 2 */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-[5%] -right-[5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none"
        style={{ background: current.orb2, filter: "blur(65px)" }}
      />
    </div>
  );
}
