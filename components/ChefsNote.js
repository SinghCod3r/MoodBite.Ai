/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, TrendingDown, Minus, Info, CheckCircle2 } from 'lucide-react';

export default function ChefsNote({
  reason,
  otherSuggestions = [],
  alternatives = [],
  trajectory,
  explanation,
  factors = null,
  onSelectAlternative
}) {
  const getTrendIcon = (t) => {
    if (t === 'Escalating') return <TrendingUp className="w-3.5 h-3.5 text-rose-400" />;
    if (t === 'De-escalating') return <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />;
    return <Minus className="w-3.5 h-3.5 text-blue-400" />;
  };

  const altList = alternatives && alternatives.length > 0
    ? alternatives
    : (otherSuggestions || []).map(s => ({ name: typeof s === 'string' ? s : s.name || s.food }));

  return (
    <motion.div
      className="h-full flex flex-col justify-center"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 p-6 rounded-3xl space-y-5 shadow-2xl">

        <div>
          <h3 className="text-base font-serif italic text-white/90 mb-2 border-b border-white/10 pb-2 flex items-center justify-between">
            <span>&quot;The Chef&apos;s Logic&quot;</span>
            <span className="text-[10px] font-mono not-italic uppercase tracking-widest text-indigo-300">
              Explainable AI
            </span>
          </h3>
          <p className="text-sm leading-relaxed text-gray-200 font-light">
            {reason || "Selected through multi-factor culinary and psychological resonance analysis."}
          </p>
        </div>

        {factors && (
          <div className="bg-black/30 rounded-2xl p-3 border border-white/5 space-y-2">
            <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-1.5">
              <Info className="w-3 h-3 text-indigo-400" />
              Scoring Signal Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-300 font-mono">
              <div className="flex justify-between bg-white/5 px-2 py-1 rounded">
                <span>Mood Match:</span>
                <span className="text-emerald-400 font-semibold">{Math.round((factors.moodMatch || 0) * 100)}%</span>
              </div>
              <div className="flex justify-between bg-white/5 px-2 py-1 rounded">
                <span>Availability:</span>
                <span className="text-blue-400 font-semibold">{Math.round((factors.availability || 0) * 100)}%</span>
              </div>
              <div className="flex justify-between bg-white/5 px-2 py-1 rounded">
                <span>Preference:</span>
                <span className="text-purple-400 font-semibold">{Math.round((factors.preference || 0) * 100)}%</span>
              </div>
              <div className="flex justify-between bg-white/5 px-2 py-1 rounded">
                <span>Nutrition:</span>
                <span className="text-teal-400 font-semibold">{Math.round((factors.nutrition || 0) * 100)}%</span>
              </div>
            </div>
          </div>
        )}

        {trajectory && (
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Emotional Trajectory
            </h4>
            <div className="flex items-center text-xs text-white">
              <span className="mr-1.5">{getTrendIcon(trajectory.trend)}</span>
              <span className="font-semibold text-indigo-200">{trajectory.trend}: </span>
              <span className="ml-1.5 opacity-80 text-[11px]">{trajectory.description}</span>
            </div>
          </div>
        )}

        {altList.length > 0 && (
          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Verified Alternatives
            </h4>
            <ul className="space-y-1.5">
              {altList.map((alt, i) => (
                <li
                  key={i}
                  onClick={() => onSelectAlternative && onSelectAlternative(alt.name)}
                  className={`text-xs text-gray-300 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl px-3 py-2 flex items-center justify-between transition-colors ${
                    onSelectAlternative ? 'cursor-pointer hover:border-white/20' : ''
                  }`}
                >
                  <span className="font-medium">{alt.name}</span>
                  {alt.prepTimeMinutes && (
                    <span className="text-[10px] font-mono text-gray-400">{alt.prepTimeMinutes}m prep</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
