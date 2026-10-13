/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  Sparkles,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Trash2,
  ChevronRight,
  UtensilsCrossed,
  MessageSquare
} from 'lucide-react';

const MOOD_EMOJIS = {
  joy: "😊 Joy",
  excitement: "🤩 Excited",
  calm: "🧘 Calm",
  stress: "😰 Stressed",
  sadness: "😔 Down",
  anger: "😤 Frustrated",
  fear: "😨 Anxious",
  boredom: "🥱 Bored",
  loneliness: "🥺 Lonely",
  neutral: "😌 Neutral",
  ambiguous: "🤔 Curious",
  unknown: "🔍 Exploring"
};

export default function ChatHistoryDrawer({
  isOpen,
  onClose,
  onSelectSession,
  activeUserId = 'guest'
}) {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    setLoading(true);
    let localHistory = [];
    try {
      const stored = localStorage.getItem(`moodbite_history_${activeUserId}`);
      if (stored) {
        localHistory = JSON.parse(stored);
      }
    } catch (e) {}

    fetch(`/api/user/history?userId=${encodeURIComponent(activeUserId)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.history?.foodEvents) {

          const serverEvents = data.history.foodEvents.map(fe => ({
            id: fe.id || Math.random().toString(),
            timestamp: fe.timestamp,
            query: fe.input || `Craving for ${fe.recommendedFood}`,
            predictedMood: fe.predictedMood || 'neutral',
            suggestedFood: fe.recommendedFood,
            feedback: fe.feedback
          }));

          const combined = [...localHistory];
          serverEvents.forEach(se => {
            if (!combined.some(c => c.timestamp === se.timestamp || c.suggestedFood === se.suggestedFood)) {
              combined.push(se);
            }
          });
          setHistoryItems(combined.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        } else {
          setHistoryItems(localHistory);
        }
      })
      .catch(() => {
        setHistoryItems(localHistory);
      })
      .finally(() => setLoading(false));
  }, [isOpen, activeUserId]);

  const handleHistoryFeedback = async (itemId, rating, item) => {

    const updated = historyItems.map(it => {
      if (it.id === itemId) return { ...it, feedback: rating };
      return it;
    });
    setHistoryItems(updated);

    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`moodbite_history_${activeUserId}`, JSON.stringify(updated));
      }

      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          feedback: rating,
          suggestedFood: item.suggestedFood,
          predictedMood: item.predictedMood,
          foodId: item.recommendedFood?.id || null,
          context: item.context || null
        })
      });
    } catch (e) {
      console.warn("[History] Failed to send feedback:", e);
    }
  };

  const handleClearHistory = async () => {
    if (!confirm("Are you sure you want to clear your recommendation history?")) return;

    setHistoryItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`moodbite_history_${activeUserId}`);
    }

    try {
      await fetch('/api/user/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear', userId: activeUserId })
      });
    } catch (e) {}
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'Recent';
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch (e) {
      return 'Recent';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 left-0 h-full w-full max-w-md bg-gradient-to-b from-[#0f111a] via-[#090b10] to-black border-r border-white/10 shadow-2xl z-50 flex flex-col overflow-hidden"
          >

            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white tracking-tight">Session History</h3>
                  <p className="text-[11px] text-gray-400 font-mono">
                    Past queries, moods &amp; recommendations
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {historyItems.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Clear history"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Close history"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400 text-xs">
                  <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mb-3" />
                  Loading your history...
                </div>
              ) : historyItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-3 px-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400">
                    <UtensilsCrossed className="w-6 h-6 text-indigo-300/60" />
                  </div>
                  <h4 className="text-sm font-medium text-white">No history yet</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Whenever you share your mood and get a food recommendation, your sessions and feedback will be saved here.
                  </p>
                </div>
              ) : (
                historyItems.map((item) => {
                  const moodLabel = MOOD_EMOJIS[item.predictedMood] || item.predictedMood;
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 transition-all space-y-3 group"
                    >

                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-200 font-medium text-[11px]">
                          {moodLabel}
                        </span>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" />
                          {formatTime(item.timestamp)}
                        </span>
                      </div>

                      <p className="text-xs text-gray-300 italic font-serif line-clamp-2">
                        &quot;{item.query}&quot;
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          if (onSelectSession) onSelectSession(item);
                          onClose();
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-400 text-sm">✦</span>
                          <span className="text-sm font-semibold text-white tracking-tight">
                            {item.suggestedFood}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                      </button>

                      <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[11px] text-gray-400">
                        <span>Feedback / Taste Model:</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleHistoryFeedback(item.id, 'loved', item)}
                            className={`p-1 rounded-lg transition-transform hover:scale-125 cursor-pointer ${
                              item.feedback === 'loved' ? 'text-rose-400 bg-rose-500/20' : 'hover:text-rose-300'
                            }`}
                            title="Loved it"
                          >
                            <Heart className="w-3.5 h-3.5 fill-current" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleHistoryFeedback(item.id, 'good', item)}
                            className={`p-1 rounded-lg transition-transform hover:scale-125 cursor-pointer ${
                              item.feedback === 'good' ? 'text-emerald-400 bg-emerald-500/20' : 'hover:text-emerald-300'
                            }`}
                            title="Good match"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleHistoryFeedback(item.id, 'bad', item)}
                            className={`p-1 rounded-lg transition-transform hover:scale-125 cursor-pointer ${
                              item.feedback === 'bad' ? 'text-amber-400 bg-amber-500/20' : 'hover:text-amber-300'
                            }`}
                            title="Didn't like"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-white/[0.02] text-center">
              <p className="text-[11px] text-gray-400 font-mono">
                Feedback trains your personalized local taste model
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

