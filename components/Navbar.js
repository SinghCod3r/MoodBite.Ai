/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User, MessageSquare } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar({ onProfileUpdated, onOpenHistory }) {
  const router = useRouter();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userState, setUserState] = useState({
    name: 'Guest Mode',
    isLoggedIn: false
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('moodbite_auth');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.isLoggedIn) {
          setUserState({
            name: parsed.name || 'Member',
            isLoggedIn: true
          });
        }
      }
    } catch (e) {}
  }, [isAuthOpen]);

  const isActive = (path) =>
    router.pathname === path
      ? "text-white opacity-100 font-medium"
      : "text-white/60 hover:text-white transition-colors cursor-pointer";

  return (
    <>
      <nav className="absolute top-0 left-0 w-full p-4 md:p-6 z-40 flex justify-between items-center bg-transparent">

        <div className="flex items-center space-x-2 md:space-x-3">
          <Link href="/" className="cursor-pointer">
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 hover:to-white transition-all cursor-pointer">
              MoodBite.Ai
            </h1>
          </Link>
          <div className="hidden sm:block text-[11px] text-white/50 border border-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-md bg-white/5 font-mono">
            v4.0
          </div>
        </div>

        <div className="flex items-center space-x-2.5 md:space-x-3.5">
          <div className="flex items-center space-x-4 md:space-x-6 bg-white/5 backdrop-blur-md border border-white/10 px-4 md:px-5 py-1.5 rounded-full text-xs md:text-sm">
            <Link href="/" className={isActive('/')}>
              Home
            </Link>
            <Link href="/about" className={isActive('/about')}>
              About
            </Link>
          </div>

          {onOpenHistory && (
            <button
              type="button"
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.15] border border-white/15 text-xs text-white/90 backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Message & Recommendation History"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-300" />
              <span className="hidden sm:inline font-mono text-[11px]">History</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAuthOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.15] border border-white/15 text-xs text-white/90 backdrop-blur-md shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
            title="Account & Anonymous Settings"
          >
            <div className={`w-2 h-2 rounded-full ${userState.isLoggedIn ? 'bg-indigo-400' : 'bg-emerald-400 animate-pulse'}`} />
            <User className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden sm:inline font-mono text-[11px]">{userState.name}</span>
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onProfileUpdated={onProfileUpdated}
      />
    </>
  );
}
