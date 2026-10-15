/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MoodBackground from '../components/MoodBackground';
import HeroFoodCard from '../components/HeroFoodCard';
import ChefsNote from '../components/ChefsNote';
import ModernInputBar from '../components/ModernInputBar';
import PreferenceFilterBar from '../components/PreferenceFilterBar';
import MoodBiteLoader from '../components/MoodBiteLoader';
import UIStateView from '../components/UIStateView';
import ChatHistoryDrawer from '../components/ChatHistoryDrawer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGlobalLoader } from '../context/LoadingContext';
import { analyzeTrajectory } from '../evm/trajectory';
import { explainVector } from '../evm/fusion';
import { Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';

const defaultVector = { valence: 0, arousal: 0, control: 0.5, certainty: 0.5 };

const MOOD_EMOJIS = {
  joy: { emoji: "😊", label: "Joy & Celebration" },
  excitement: { emoji: "🤩", label: "Excitement & High Energy" },
  calm: { emoji: "🧘", label: "Calm & Grounding" },
  stress: { emoji: "😰", label: "Stress Relief" },
  sadness: { emoji: "😔", label: "Comfort & Serotonin" },
  anger: { emoji: "😤", label: "Sensory Venting" },
  fear: { emoji: "😨", label: "Soothing Warmth" },
  boredom: { emoji: "🥱", label: "Sensory Awakening" },
  loneliness: { emoji: "🥺", label: "Nourishing Care" },
  neutral: { emoji: "😌", label: "Balanced Daily Fuel" },
  ambiguous: { emoji: "🤔", label: "Adaptive Mood" },
  unknown: { emoji: "🔍", label: "Exploratory Bite" }
};

export default function HomePage() {
  const { startLoading, stopLoading } = useGlobalLoader();

  const [viewState, setViewState] = useState('idle');
  const [resultData, setResultData] = useState(null);
  const [clarificationData, setClarificationData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [dietary, setDietary] = useState('vegetarian');
  const [availability, setAvailability] = useState('any');
  const [activeUserId, setActiveUserId] = useState('guest');

  const [vector, setVector] = useState(defaultVector);
  const [predictedMood, setPredictedMood] = useState('neutral');
  const [isListening, setIsListening] = useState(false);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [trajectory, setTrajectory] = useState(null);
  const [explanation, setExplanation] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('moodbite_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.userId) setActiveUserId(parsed.userId);
      }
    } catch (e) {}
  }, []);

  const handleSearch = async (textToSearch, forcedDietary, forcedAvailability) => {
    const query = (textToSearch !== undefined ? textToSearch : input || '').trim();
    if (!query) return;

    const currentDiet = forcedDietary !== undefined ? forcedDietary : dietary;
    const currentAvail = forcedAvailability !== undefined ? forcedAvailability : availability;

    setViewState('analyzing');
    startLoading('search');

    try {
      const res = await fetch('/api/suggestFood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: query,
          ingredients,
          userId: activeUserId,
          userConstraints: {
            dietary: currentDiet,
            availability: currentAvail
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      if (data.isOffTopic || data.isGreeting || data.isUnknown || (data.isAmbiguous && !data.suggestedFood)) {
        let type = 'clarification';
        let title = "Tell Me More";

        if (data.isGreeting) {
          type = 'clarification';
          title = "Welcome to MoodBite.Ai";
        } else if (data.isOffTopic) {
          type = 'clarification';
          title = "Culinary Scope";
        } else if (data.isUnknown) {
          type = 'empty';
          title = "I Didn't Quite Catch That";
        } else if (data.isAmbiguous) {
          type = 'ambiguous';
          title = "Tell Me More";
        }

        setClarificationData({
          type,
          title,
          message: data.clarificationMessage || (data.isGreeting ? "I'm your MoodBite culinary intelligence companion. Tell me how you're feeling, what you're craving, or what you've had to eat today!" : "Could you share how your day is going or what kind of food you're craving?")
        });
        setPredictedMood('neutral');
        setViewState('clarification');
        return;
      }

      setResultData(data);
      const newMood = data.predictedMood || 'neutral';
      setPredictedMood(newMood);

      const activeVector = data.vector || defaultVector;
      setVector(activeVector);

      const updatedHistory = [...moodHistory, newMood];
      setMoodHistory(updatedHistory);
      setTrajectory(analyzeTrajectory(updatedHistory));
      setExplanation(explainVector(activeVector));

      if (typeof window !== 'undefined') {
        try {
          const historyEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            query,
            predictedMood: newMood,
            suggestedFood: data.suggestedFood,
            recommendedFood: data.recommendedFood,
            reason: data.reason,
            strategy: data.strategy,
            alternatives: data.alternatives,
            feedback: null,
            dietary: currentDiet,
            availability: currentAvail
          };
          const existing = JSON.parse(localStorage.getItem(`moodbite_history_${activeUserId}`) || '[]');
          const updated = [historyEntry, ...existing.filter(e => e.query !== query).slice(0, 39)];
          localStorage.setItem(`moodbite_history_${activeUserId}`, JSON.stringify(updated));
        } catch (err) {}
      }

      setViewState('result');
    } catch (e) {
      console.error("[Search Error]:", e);
      setErrorMessage(e.message || "Could not retrieve recommendations. Please verify your connection.");
      setViewState('error');
    } finally {
      stopLoading('search');
    }
  };

  const handlePreferenceChange = async (newDiet, newAvail) => {
    if (newDiet !== undefined) setDietary(newDiet);
    if (newAvail !== undefined) setAvailability(newAvail);

    if (viewState === 'result' && input) {
      await handleSearch(input, newDiet, newAvail);
    }
  };

  const handleFeedback = async (rating, foodId) => {
    if (!resultData?.suggestedFood) return;

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: activeUserId,
          feedback: rating,
          suggestedFood: resultData.suggestedFood,
          predictedMood: resultData.predictedMood,
          foodId,
          context: resultData.context
        })
      });
    } catch (e) {
      console.warn("Could not save feedback:", e);
    }
  };

  const handleVoiceClick = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev ? `${prev} ${transcript}` : transcript);
      };

      recognition.start();
    } catch (err) {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    }
  };

  const handleSelectAlternative = (altName) => {
    if (!resultData || !altName) return;
    const matchedAlt = resultData.alternatives?.find(a => a.name === altName);

    setResultData(prev => ({
      ...prev,
      suggestedFood: altName,
      recommendedFood: matchedAlt || { name: altName },
      reason: `Switched to "${altName}" based on your alternative preference.`
    }));
  };

  const handleSelectHistorySession = (item) => {
    if (!item) return;
    setInput(item.query || '');
    setPredictedMood(item.predictedMood || 'neutral');
    setResultData({
      suggestedFood: item.suggestedFood,
      recommendedFood: item.recommendedFood || { name: item.suggestedFood },
      reason: item.reason || `Session restored from your history log for "${item.query}".`,
      confidenceScore: 92,
      strategy: item.strategy || item.predictedMood,
      alternatives: item.alternatives || []
    });
    setViewState('result');
  };

  const handleReset = () => {
    setViewState('idle');
    setInput('');
    setClarificationData(null);
    setErrorMessage(null);
  };

  const moodDetails = MOOD_EMOJIS[predictedMood] || { emoji: "✨", label: predictedMood };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white">

      <MoodBackground mood={predictedMood} />

      <Navbar
        onProfileUpdated={(updated) => {
          if (updated?.dietary) setDietary(updated.dietary);
          if (updated?.availability) setAvailability(updated.availability);
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      <main className={`relative z-10 w-full min-h-screen flex flex-col items-center p-4 transition-all duration-500 ${viewState === 'result' ? 'justify-start pt-24 md:justify-center md:pt-16 pb-20' : 'justify-center'}`}>
        <AnimatePresence mode="wait">

          {viewState === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -40 }}
              className="w-full max-w-2xl text-center space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-extralight tracking-tight drop-shadow-md">
                How are you <span className="font-serif italic text-white/90">feeling</span>?
              </h2>

              <ModernInputBar
                textInput={input}
                setTextInput={setInput}
                ingredientsInput={ingredients}
                setIngredientsInput={setIngredients}
                handleChatSubmit={(e) => { e?.preventDefault(); handleSearch(input); }}
                handleVoiceClick={handleVoiceClick}
                assistantState={isListening ? 'listening' : 'idle'}
                isLoading={false}
              />

              <PreferenceFilterBar
                dietary={dietary}
                setDietary={setDietary}
                availability={availability}
                setAvailability={setAvailability}
                onChange={handlePreferenceChange}
              />
            </motion.div>
          )}

          {viewState === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <MoodBiteLoader message="Analyzing Emotional State & Culinary Interventions..." />
            </motion.div>
          )}

          {viewState === 'clarification' && clarificationData && (
            <motion.div
              key="clarification"
              className="w-full max-w-xl"
            >
              <UIStateView
                type={clarificationData.type}
                title={clarificationData.title}
                message={clarificationData.message}
                onReset={handleReset}
                onSelectPrompt={(selectedPrompt) => {
                  setInput(selectedPrompt);
                  handleSearch(selectedPrompt);
                }}
              />
            </motion.div>
          )}

          {viewState === 'error' && (
            <motion.div
              key="error"
              className="w-full max-w-xl"
            >
              <UIStateView
                type="error"
                title="Analysis Interrupted"
                message={errorMessage || "We encountered an issue analyzing your input. Please try again."}
                onReset={handleReset}
              />
            </motion.div>
          )}

          {viewState === 'result' && resultData && resultData.suggestedFood && (
            <motion.div
              key="result"
              className="w-full max-w-5xl flex flex-col space-y-6 pb-20 md:pb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >

              <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-xl">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 text-xs font-medium">
                    <span className="text-base">{moodDetails.emoji}</span>
                    <span className="font-semibold">{moodDetails.label}</span>
                  </div>
                  <span className="text-xs text-white/50 hidden sm:inline">•</span>
                  <span className="text-xs text-gray-300 font-serif italic truncate max-w-xs hidden sm:inline">
                    &quot;{input}&quot;
                  </span>
                </div>

                <PreferenceFilterBar
                  dietary={dietary}
                  setDietary={setDietary}
                  availability={availability}
                  setAvailability={setAvailability}
                  onChange={handlePreferenceChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

                <div className="md:col-span-5 w-full flex justify-center z-10">
                  <HeroFoodCard
                    suggestedFood={resultData.suggestedFood}
                    recommendedFood={resultData.recommendedFood}
                    predictedMood={predictedMood}
                    feedbackHandler={handleFeedback}
                    source={resultData.strategy || moodDetails.label}
                    confidence={resultData.confidenceScore || 90}
                  />
                </div>

                <div className="md:col-span-7 w-full h-full flex flex-col justify-center z-0">
                  <ChefsNote
                    reason={resultData.reason}
                    otherSuggestions={resultData.otherSuggestions}
                    alternatives={resultData.alternatives}
                    factors={resultData.factors}
                    trajectory={trajectory}
                    explanation={explanation}
                    onSelectAlternative={handleSelectAlternative}
                  />
                </div>
              </div>

              <div className="fixed bottom-6 left-0 w-full flex justify-center items-center gap-3 z-30 pointer-events-none">
                <motion.button
                  type="button"
                  onClick={handleReset}
                  className="pointer-events-auto px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl text-xs uppercase tracking-wider text-white font-medium border border-white/20 shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  New Analysis
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setIsHistoryOpen(true)}
                  className="pointer-events-auto px-5 py-2.5 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 backdrop-blur-xl text-xs uppercase tracking-wider text-indigo-200 font-medium border border-indigo-400/30 shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  History
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {viewState === 'idle' && (
          <div className="absolute bottom-3 w-full pointer-events-none">
            <div className="pointer-events-auto">
              <Footer />
            </div>
          </div>
        )}
      </main>

      <ChatHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectSession={handleSelectHistorySession}
        activeUserId={activeUserId}
      />
    </div>
  );
}
