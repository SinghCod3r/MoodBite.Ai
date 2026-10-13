/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { Leaf, Utensils, Home, Bike, Sparkles, Globe } from 'lucide-react';

export default function PreferenceFilterBar({
  dietary = 'vegetarian',
  setDietary,
  availability = 'any',
  setAvailability,
  onChange
}) {
  const diets = [
    { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
    { id: 'vegan', label: 'Vegan', icon: Sparkles },
    { id: 'non-vegetarian', label: 'Non-Veg', icon: Utensils },
    { id: 'any', label: 'Any', icon: Globe }
  ];

  const availabilities = [
    { id: 'any', label: 'Any', icon: Sparkles },
    { id: 'home', label: 'Make at Home', icon: Home },
    { id: 'delivery', label: 'Order Online', icon: Bike }
  ];

  const handleDietClick = (newDiet) => {
    if (setDietary) setDietary(newDiet);
    if (onChange) onChange(newDiet, availability);
  };

  const handleAvailClick = (newAvail) => {
    if (setAvailability) setAvailability(newAvail);
    if (onChange) onChange(dietary, newAvail);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-2.5 py-1 text-xs">

      <div className="flex items-center bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full p-1 shadow-inner">
        {diets.map(d => {
          const Icon = d.icon;
          const isSelected = dietary === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => handleDietClick(d.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-[11px] cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white font-medium shadow-md shadow-emerald-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{d.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-full p-1 shadow-inner">
        {availabilities.map(a => {
          const Icon = a.icon;
          const isSelected = availability === a.id;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => handleAvailClick(a.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-[11px] cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-500/80 to-purple-500/80 text-white font-medium shadow-md shadow-indigo-500/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
