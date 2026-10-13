/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { motion } from 'framer-motion';
import { HelpCircle, AlertTriangle, Sparkles, RefreshCw, Compass } from 'lucide-react';

export default function UIStateView({
  type = 'clarification',
  title,
  message,
  onReset,
  onSelectPrompt
}) {
  const quickPrompts = [
    "I'm stressed about exams tomorrow",
    "Feeling sad and need warm comfort food",
    "I'm frustrated and need something spicy",
    "Had a great day, time to celebrate!"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto p-6 md:p-8 rounded-3xl bg-white/[0.05] backdrop-blur-2xl border border-white/10 shadow-2xl text-center space-y-6"
    >

      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-indigo-300 shadow-inner">
          {type === 'error' && <AlertTriangle className="w-7 h-7 text-rose-400" />}
          {type === 'ambiguous' && <HelpCircle className="w-7 h-7 text-amber-300" />}
          {type === 'empty' && <Compass className="w-7 h-7 text-cyan-300" />}
          {type === 'clarification' && <Sparkles className="w-7 h-7 text-indigo-300" />}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-light tracking-tight text-white">
          {title || (type === 'error' ? "Something went wrong" : type === 'ambiguous' ? "Tell Me More" : type === 'empty' ? "I Didn't Quite Catch That" : "Welcome to MoodBite.Ai")}
        </h3>
        <p className="text-sm text-gray-300/90 leading-relaxed max-w-md mx-auto">
          {message}
        </p>
      </div>

      {type !== 'error' && onSelectPrompt && (
        <div className="space-y-2.5 text-left pt-2">
          <p className="text-[11px] uppercase tracking-wider text-white/50 font-mono text-center">
            Click any prompt below to get an instant recommendation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPrompt(prompt)}
                className="px-3.5 py-2.5 text-xs rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-gray-200 text-left transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span className="text-indigo-400 text-sm">✦</span>
                <span className="truncate">{prompt}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs uppercase tracking-wider text-white font-medium transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Start New Search
        </button>
      </div>
    </motion.div>
  );
}
