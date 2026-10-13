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
import { X, User, ShieldCheck, LogIn, UserPlus, Sliders, Trash2, CheckCircle2, Sparkles, Heart } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onProfileUpdated }) {
  const [activeTab, setActiveTab] = useState('status');
  const [authMode, setAuthMode] = useState('login');

  const [user, setUser] = useState({
    userId: 'guest',
    name: 'Anonymous Guest',
    isLoggedIn: false,
    email: ''
  });

  const [dietary, setDietary] = useState('vegetarian');
  const [spice, setSpice] = useState('medium');
  const [availability, setAvailability] = useState('any');
  const [budget, setBudget] = useState(250);
  const [statusMessage, setStatusMessage] = useState('');

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const storedAuth = localStorage.getItem('moodbite_auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        setUser(parsed);
      }
    } catch (e) {}

    fetch('/api/user/profile?userId=' + (user.userId || 'guest'))
      .then(res => res.json())
      .then(data => {
        if (data && data.profile) {
          setDietary(data.profile.dietaryPreference || 'vegetarian');
          setSpice(data.profile.spicePreference || 'medium');
          setAvailability(data.profile.availabilityPreference || 'any');
          setBudget(data.profile.budgetPreference?.max || 250);
        }
      })
      .catch(() => {});
  }, [isOpen, user.userId]);

  const handleSavePreferences = async () => {
    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId || 'guest',
          updates: {
            dietaryPreference: dietary,
            spicePreference: spice,
            availabilityPreference: availability,
            budgetPreference: { min: 50, max: Number(budget) }
          }
        })
      });
      if (res.ok) {
        setStatusMessage('Preferences saved successfully!');
        if (onProfileUpdated) onProfileUpdated({ dietary, availability, spice });
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (e) {
      setStatusMessage('Failed to save preferences.');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    const newAuth = {
      userId: emailInput.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      name: nameInput.trim() || emailInput.split('@')[0],
      email: emailInput.trim(),
      isLoggedIn: true
    };

    setUser(newAuth);
    if (typeof window !== 'undefined') {
      localStorage.setItem('moodbite_auth', JSON.stringify(newAuth));
    }
    setActiveTab('status');
    setStatusMessage(`Welcome, ${newAuth.name}! Profile synced.`);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSwitchToAnonymous = () => {
    const guestAuth = {
      userId: 'guest',
      name: 'Anonymous Guest',
      isLoggedIn: false,
      email: ''
    };
    setUser(guestAuth);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('moodbite_auth');
    }
    setActiveTab('status');
    setStatusMessage('Switched to Anonymous Guest Mode.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleClearHistory = async () => {
    if (!confirm('Are you sure you want to clear your mood and recommendation history?')) return;
    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId || 'guest', action: 'clear_history' })
      });
      setStatusMessage('History cleared.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (e) {}
  };

  const handleDeleteAllData = async () => {
    if (!confirm('Wipe all personal profile data and reset to fresh guest state?')) return;
    try {
      await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.userId || 'guest', action: 'delete_data' })
      });
      handleSwitchToAnonymous();
      setStatusMessage('All user data permanently deleted.');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (e) {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg rounded-3xl bg-neutral-950/90 border border-white/15 p-6 md:p-8 shadow-2xl text-white backdrop-blur-2xl overflow-hidden"
      >

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight">{user.name}</h3>
              <p className="text-[10px] font-mono text-gray-400">
                {user.isLoggedIn ? `Account: ${user.email}` : "Anonymous Guest Mode (Active)"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-1 p-1 my-5 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-2 rounded-xl transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'status' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Session Status
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 py-2 rounded-xl transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'preferences' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Preferences
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('auth')}
            className={`flex-1 py-2 rounded-xl transition-all font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'auth' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            {user.isLoggedIn ? 'Account' : 'Sign In'}
          </button>
        </div>

        {statusMessage && (
          <div className="mb-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {user.isLoggedIn ? "Registered Profile Active" : "Anonymous Guest Mode (Active)"}
              </div>
              <p className="text-gray-300 text-[11px] leading-relaxed">
                {user.isLoggedIn
                  ? "Your taste preferences, feedback, and session history are tied to your registered profile."
                  : "You can explore MoodBite without creating an account. Preferences and recommendation feedback are preserved locally on your current device with zero tracking."}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <h4 className="text-[11px] uppercase tracking-wider font-mono text-gray-400">Privacy & Data Controls</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-amber-400" />
                  Clear History
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAllData}
                  className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  Delete All Data
                </button>
              </div>
            </div>

            {user.isLoggedIn && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleSwitchToAnonymous}
                  className="text-xs text-indigo-300 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Switch back to Anonymous Guest Mode
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1.5">
                Default Dietary Lifestyle (Hard Constraint)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['vegetarian', 'vegan', 'non-vegetarian', 'jain'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDietary(d)}
                    className={`py-2 px-2 rounded-xl capitalize transition-all border text-center cursor-pointer ${
                      dietary === d
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {d.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1.5">
                Spice Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['mild', 'medium', 'high'].map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSpice(s)}
                    className={`py-2 px-2 rounded-xl capitalize transition-all border text-center cursor-pointer ${
                      spice === s
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono tracking-wider text-gray-400 block mb-1.5">
                Preferred Availability Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'any', label: 'Any' },
                  { id: 'home', label: 'Home Cooking' },
                  { id: 'delivery', label: 'Order Online' }
                ].map(a => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAvailability(a.id)}
                    className={`py-2 px-2 rounded-xl transition-all border text-center cursor-pointer ${
                      availability === a.id
                        ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 font-semibold'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSavePreferences}
              className="w-full mt-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg transition-all cursor-pointer"
            >
              Save Profile Preferences
            </button>
          </div>
        )}

        {activeTab === 'auth' && (
          <div className="space-y-4 text-xs">
            {user.isLoggedIn ? (
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center space-y-3">
                <p className="text-gray-300">Signed in as <strong>{user.email}</strong></p>
                <button
                  type="button"
                  onClick={handleSwitchToAnonymous}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  Log Out (Return to Guest Mode)
                </button>
              </div>
            ) : (
              <form onSubmit={handleAuthSubmit} className="space-y-3">
                <div className="flex gap-2 pb-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      authMode === 'login' ? 'bg-white/15 text-white font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      authMode === 'signup' ? 'bg-white/15 text-white font-semibold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={e => setNameInput(e.target.value)}
                      placeholder="e.g. Ayush"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                    />
                  </div>
                )}

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono text-gray-400 block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-lg transition-all cursor-pointer"
                >
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </button>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={handleSwitchToAnonymous}
                    className="text-[11px] text-gray-400 hover:text-indigo-300 cursor-pointer"
                  >
                    Or continue as Anonymous Guest
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

