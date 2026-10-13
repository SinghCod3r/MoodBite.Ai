/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { motion } from 'framer-motion';

export default function MoodBiteLoader({ message = "Synthesizing Emotional Vectors & Culinary Signals..." }) {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-2xl max-w-sm mx-auto text-center z-40"
    >

      <div className="relative w-20 h-20 mb-6 flex items-center justify-center">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-400 border-r-purple-500 opacity-80"
        />

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-transparent border-b-cyan-400 border-l-emerald-400 opacity-70"
        />

        <motion.div
          animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_15px_rgba(129,140,248,0.8)]"
        />
      </div>

      <p className="text-xs uppercase tracking-widest text-indigo-200/90 font-mono font-medium">
        {message}
      </p>
      <span className="sr-only">Loading...</span>
    </motion.div>
  );
}

