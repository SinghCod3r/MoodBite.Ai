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
  Download,
  Smartphone,
  CheckCircle,
  Apple,
  Zap,
  WifiOff,
  ShieldCheck,
  Monitor,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PWADownloadCard() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeGuide, setActiveGuide] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
        return;
      } catch (err) {
        console.warn("[PWA] Prompt error:", err);
      }
    }

    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setActiveGuide(prev => prev === 'ios' ? null : 'ios');
    } else if (/android/.test(ua)) {
      setActiveGuide(prev => prev === 'android' ? null : 'android');
    } else {
      setActiveGuide(prev => prev === 'desktop' ? null : 'desktop');
    }
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-2xl border border-white/15 p-6 md:p-8 shadow-2xl overflow-hidden">

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            Cross-Platform PWA v4.0
          </div>

          <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">
            Install <span className="font-serif italic text-indigo-200">MoodBite.Ai</span> on Your Device
          </h3>

          <p className="text-sm text-gray-300/90 leading-relaxed font-light">
            Enjoy instant launch speeds, offline capability, zero battery drain, and full-screen access directly from your phone, tablet, or laptop desktop.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 text-[11px] font-mono text-gray-300">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              <Zap className="w-3 h-3 text-amber-400" /> &lt;3ms Engine
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              <WifiOff className="w-3 h-3 text-emerald-400" /> Offline Ready
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck className="w-3 h-3 text-cyan-400" /> Local &amp; Private
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 shrink-0">
          {isInstalled ? (
            <div className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              App Installed &amp; Active
            </div>
          ) : (
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-sm shadow-xl shadow-indigo-500/25 transition-all transform hover:scale-105 active:scale-95 border border-white/20 cursor-pointer"
            >
              <Download className="w-5 h-5" />
              Download &amp; Install App
            </button>
          )}

          <div className="flex items-center gap-3 pt-1 text-xs text-white/60">
            <button
              type="button"
              onClick={() => setActiveGuide(prev => prev === 'desktop' ? null : 'desktop')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Monitor className="w-3 h-3 text-indigo-300" />
              Laptop/PC {activeGuide === 'desktop' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveGuide(prev => prev === 'ios' ? null : 'ios')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Apple className="w-3 h-3 text-gray-300" />
              iOS {activeGuide === 'ios' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveGuide(prev => prev === 'android' ? null : 'android')}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Smartphone className="w-3 h-3 text-emerald-400" />
              Android {activeGuide === 'android' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-5 border-t border-white/10 text-xs text-gray-300 space-y-3 bg-black/40 p-5 rounded-2xl"
          >
            {activeGuide === 'desktop' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
                  <Monitor className="w-4 h-4" />
                  How to Install on Laptop or Desktop (Chrome, Edge, Brave, Opera):
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-300 pl-1 leading-relaxed">
                  <li>
                    Look at the right side of your browser&apos;s address bar for the <strong className="text-white">Install App icon (⊕ or computer icon)</strong>.
                  </li>
                  <li>
                    Or click the browser menu <strong className="text-white">(⋮ or ⋯)</strong> in the top-right corner.
                  </li>
                  <li>
                    Select <strong className="text-indigo-200">&quot;Install MoodBite.Ai&quot;</strong> or <strong className="text-indigo-200">&quot;Save and share → Install page as app&quot;</strong>.
                  </li>
                  <li>MoodBite will launch in its own standalone window with a desktop shortcut!</li>
                </ol>
              </div>
            )}

            {activeGuide === 'ios' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-sm">
                  <Apple className="w-4 h-4" />
                  How to Install on iPhone or iPad (Safari):
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-300 pl-1 leading-relaxed">
                  <li>Open MoodBite.Ai in <strong className="text-white">Safari</strong>.</li>
                  <li>Tap the <strong className="text-white">Share button</strong> (the box with an upward arrow at the bottom).</li>
                  <li>Scroll down and select <strong className="text-indigo-200">&quot;Add to Home Screen&quot;</strong>.</li>
                  <li>Tap <strong className="text-white">Add</strong> in the top-right corner.</li>
                </ol>
              </div>
            )}

            {activeGuide === 'android' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <Smartphone className="w-4 h-4" />
                  How to Install on Android (Chrome):
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-gray-300 pl-1 leading-relaxed">
                  <li>Open MoodBite.Ai in <strong className="text-white">Chrome</strong>.</li>
                  <li>Tap the menu button <strong className="text-white">(⋮)</strong> in the top right.</li>
                  <li>Select <strong className="text-emerald-200">&quot;Install app&quot;</strong> or <strong className="text-emerald-200">&quot;Add to Home screen&quot;</strong>.</li>
                  <li>Confirm the installation prompt.</li>
                </ol>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
