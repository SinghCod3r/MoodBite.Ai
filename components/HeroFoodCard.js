/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, ThumbsUp, ThumbsDown, Clock, MapPin, Sparkles, Home, Bike, Flame } from 'lucide-react';

const MOOD_EMOJIS = {
  joy: { emoji: "😊", label: "Joy Celebration" },
  excitement: { emoji: "🤩", label: "Excitement & Energy" },
  calm: { emoji: "🧘", label: "Calm & Grounding" },
  stress: { emoji: "😰", label: "Stress Relief" },
  sadness: { emoji: "😔", label: "Comfort & Serotonin" },
  anger: { emoji: "😤", label: "Sensory Venting" },
  fear: { emoji: "😨", label: "Soothing Warmth" },
  boredom: { emoji: "🥱", label: "Sensory Awakening" },
  loneliness: { emoji: "🥺", label: "Nourishing Care" },
  neutral: { emoji: "😌", label: "Balanced Fuel" },
  ambiguous: { emoji: "🤔", label: "Adaptive Mood" },
  unknown: { emoji: "🔍", label: "Exploratory Bite" }
};

export default function HeroFoodCard({
  suggestedFood,
  recommendedFood = null,
  predictedMood = 'neutral',
  feedbackHandler,
  source = "AI Culinary Intelligence",
  confidence = 85
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const moodInfo = MOOD_EMOJIS[predictedMood] || { emoji: "✨", label: predictedMood };

  useEffect(() => {
    if (!suggestedFood) return;
    setLoadingImage(true);

    const category = recommendedFood?.category || 'main_course';
    fetch(`/api/generateFoodImage?foodName=${encodeURIComponent(suggestedFood)}&category=${encodeURIComponent(category)}`)
      .then(res => res.json())
      .then(data => {
        setImageUrl(data.imageUrl);
        setLoadingImage(false);
      })
      .catch(() => {
        setImageUrl("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80");
        setLoadingImage(false);
      });
  }, [suggestedFood, recommendedFood]);

  const onFeedback = (type) => {
    setFeedback(type);
    if (feedbackHandler) {
      feedbackHandler(type, recommendedFood?.id || null);
    }
  };

  const prepTime = recommendedFood?.prepTimeMinutes;
  const region = recommendedFood?.region?.replace(/_/g, ' ') || 'Indian';

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-neutral-950/70 backdrop-blur-xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >

      <div className="absolute inset-0 w-full h-full">
        {loadingImage ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-950/80">
            <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
          </div>
        ) : (
          <img
            src={imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"}
            alt={suggestedFood}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30" />

        {confidence && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 right-4 flex items-center space-x-1.5 bg-black/60 backdrop-blur-xl border border-white/15 px-3 py-1.5 rounded-full shadow-lg"
          >
            <div
              className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)] ${
                confidence >= 80 ? 'bg-emerald-400' : confidence >= 65 ? 'bg-blue-400' : 'bg-amber-400'
              }`}
            />
            <span className="text-xs font-semibold text-white tracking-wide">
              {confidence}% Match
            </span>
          </motion.div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/40 backdrop-blur-md border border-indigo-400/40 text-xs font-medium text-white shadow-lg shadow-indigo-950/50"
          >
            <span className="text-sm">{moodInfo.emoji}</span>
            <span>{moodInfo.label}</span>
          </motion.div>

          <div className="flex flex-wrap gap-1">
            {recommendedFood?.dietary?.containsMeat ? (
              <span className="text-[10px] font-mono tracking-wider bg-rose-500/30 text-rose-200 border border-rose-500/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                🍗 Non-Veg
              </span>
            ) : recommendedFood?.dietary?.vegan ? (
              <span className="text-[10px] font-mono tracking-wider bg-teal-500/30 text-teal-200 border border-teal-500/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                🌿 Vegan
              </span>
            ) : (
              <span className="text-[10px] font-mono tracking-wider bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 px-2 py-0.5 rounded-full backdrop-blur-md">
                🌱 Vegetarian
              </span>
            )}

            {recommendedFood?.availability?.home && (
              <span className="text-[10px] font-mono tracking-wider bg-white/10 text-white/90 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                <Home className="w-2.5 h-2.5" /> Home
              </span>
            )}
            {recommendedFood?.availability?.delivery && (
              <span className="text-[10px] font-mono tracking-wider bg-white/10 text-white/90 border border-white/20 px-2 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                <Bike className="w-2.5 h-2.5" /> Order
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-6 flex flex-col items-center text-center">

        <div className="flex items-center gap-3 text-[11px] text-white/70 uppercase tracking-widest mb-1.5 font-mono">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-400" />
            {region}
          </span>
          {prepTime && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {prepTime}m prep
              </span>
            </>
          )}
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 drop-shadow-md tracking-tight">
          {suggestedFood}
        </h2>
        <p className="text-[11px] text-gray-400 mb-4 uppercase tracking-widest font-mono">
          {source}
        </p>

        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 shadow-lg">
          <button
            type="button"
            onClick={() => onFeedback('loved')}
            className={`p-1.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${
              feedback === 'loved' ? 'text-rose-400 bg-rose-500/20' : 'text-white/60 hover:text-rose-300'
            }`}
            title="Loved it"
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
          <div className="w-px h-5 bg-white/20" />
          <button
            type="button"
            onClick={() => onFeedback('good')}
            className={`p-1.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${
              feedback === 'good' ? 'text-emerald-400 bg-emerald-500/20' : 'text-white/60 hover:text-emerald-300'
            }`}
            title="Good match"
          >
            <ThumbsUp className="w-5 h-5" />
          </button>
          <div className="w-px h-5 bg-white/20" />
          <button
            type="button"
            onClick={() => onFeedback('bad')}
            className={`p-1.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${
              feedback === 'bad' ? 'text-amber-400 bg-amber-500/20' : 'text-white/60 hover:text-amber-300'
            }`}
            title="Not for me"
          >
            <ThumbsDown className="w-5 h-5" />
          </button>
          <div className="w-px h-5 bg-white/20" />
          <button
            type="button"
            onClick={() => onFeedback('skip')}
            className={`px-2 py-0.5 text-[10px] rounded-full transition-colors cursor-pointer ${
              feedback === 'skip' ? 'text-cyan-300 bg-cyan-500/20' : 'text-white/50 hover:text-white'
            }`}
            title="Didn't try"
          >
            Skip
          </button>
        </div>

        {feedback && (
          <p className="text-[11px] text-emerald-300 mt-2 font-mono flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Taste model trained with your feedback!
          </p>
        )}
      </div>
    </motion.div>
  );
}
