/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Textarea from 'react-textarea-autosize';
import { Camera, Refrigerator, Mic, ArrowUp, X, Loader2 } from 'lucide-react';

export default function ModernInputBar({
  textInput,
  setTextInput,
  ingredientsInput,
  setIngredientsInput,
  handleChatSubmit,
  handleVoiceClick,
  assistantState,
  isLoading
}) {
  const [showFridge, setShowFridge] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  const getTags = () => ingredientsInput ? ingredientsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

  const addTag = (tag) => {
    const current = getTags();
    if (!current.includes(tag.trim())) {
      const newList = [...current, tag.trim()];
      if (setIngredientsInput) setIngredientsInput(newList.join(', '));
    }
  };

  const removeTag = (tagToRemove) => {
    const current = getTags();
    const newList = current.filter(t => t !== tagToRemove);
    if (setIngredientsInput) setIngredientsInput(newList.join(', '));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.target.value.trim();
      if (val) {
        addTag(val);
        e.target.value = '';
      }
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviews]);

    setIsScanning(true);
    setShowFridge(true);

    const base64Promises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    const base64Images = await Promise.all(base64Promises);

    try {
      const res = await fetch('/api/detectIngredients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: base64Images })
      });
      const data = await res.json();

      if (data.ingredients) {
        const current = getTags();
        const combined = [...new Set([...current, ...data.ingredients])];
        setIngredientsInput(combined.join(', '));
      }
    } catch (err) {
      console.error("Vision detection failed", err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <form onSubmit={handleChatSubmit} className="relative w-full max-w-2xl mx-auto z-40">
      <div className="relative flex flex-col border border-white/20 rounded-3xl bg-neutral-900/70 md:bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">

        <AnimatePresence>
          {(previewImages.length > 0 || isScanning) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-black/40 border-b border-white/10 p-3 flex gap-3 overflow-x-auto"
            >
              {previewImages.map((src, i) => (
                <div key={i} className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white/20 shadow-md">
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ))}
              {isScanning && (
                <div className="flex items-center justify-center w-16 h-16 rounded-xl border border-white/20 bg-white/5 animate-pulse text-indigo-300">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFridge && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="bg-black/25 border-b border-white/10 px-4 py-3"
            >
              <label className="text-[10px] uppercase tracking-widest text-indigo-300 mb-2 block font-mono font-bold flex items-center gap-1.5">
                <Refrigerator className="w-3.5 h-3.5" />
                Ingredients on Hand
              </label>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {getTags().map(tag => (
                  <span
                    key={tag}
                    className="flex items-center text-xs bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-2.5 py-1 rounded-lg backdrop-blur-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 hover:text-white text-indigo-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {isScanning && (
                  <span className="text-xs text-indigo-300/80 animate-pulse flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Scanning ingredients...
                  </span>
                )}
              </div>

              <input
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-400/50"
                placeholder="Add ingredient + Enter (e.g. rice, curd, tomatoes)"
                onKeyDown={handleKeyDown}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none px-6 py-5 resize-none text-base md:text-lg leading-relaxed"
          placeholder={assistantState === 'listening' ? "Listening to your thoughts..." : "How are you feeling today, or what are you craving?"}
          disabled={isLoading}
          minRows={1}
          maxRows={4}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleChatSubmit(e);
            }
          }}
        />

        <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-white/[0.04]">
          <div className="flex items-center gap-1.5">

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Upload Fridge Photo"
            >
              <Camera className="w-5 h-5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => setShowFridge(!showFridge)}
              className={`p-2 rounded-full transition-colors ${
                showFridge ? 'text-indigo-300 bg-indigo-500/20' : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title="Toggle Ingredients"
            >
              <Refrigerator className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleVoiceClick}
              className={`p-2 rounded-full transition-colors ${
                assistantState === 'listening'
                  ? 'bg-rose-500/25 text-rose-400 animate-pulse'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title="Voice Input"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/40 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!textInput.trim() || isLoading}
            title="Analyze"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
