/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
  withLoading: async (id, fn) => fn(),
  activeOperationsCount: 0
});

const LOADER_DELAY_MS = 20;
const MIN_VISIBLE_MS = 150;

export function LoadingProvider({ children }) {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const activeOps = useRef(new Set());
  const delayTimer = useRef(null);
  const shownAt = useRef(0);

  const startLoading = useCallback((id = 'default') => {
    activeOps.current.add(id);

    if (activeOps.current.size === 1 && !isLoaderVisible && !delayTimer.current) {
      delayTimer.current = setTimeout(() => {
        if (activeOps.current.size > 0) {
          shownAt.current = Date.now();
          setIsLoaderVisible(true);
        }
        delayTimer.current = null;
      }, LOADER_DELAY_MS);
    }
  }, [isLoaderVisible]);

  const stopLoading = useCallback((id = 'default') => {
    activeOps.current.delete(id);

    if (activeOps.current.size === 0) {
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
        delayTimer.current = null;
      }

      if (isLoaderVisible) {
        const elapsed = Date.now() - shownAt.current;
        const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

        setTimeout(() => {
          if (activeOps.current.size === 0) {
            setIsLoaderVisible(false);
          }
        }, remaining);
      }
    }
  }, [isLoaderVisible]);

  const withLoading = useCallback(async (id, asyncFn) => {
    startLoading(id);
    try {
      return await asyncFn();
    } finally {
      stopLoading(id);
    }
  }, [startLoading, stopLoading]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading: isLoaderVisible,
        startLoading,
        stopLoading,
        withLoading,
        activeOperationsCount: activeOps.current.size
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useGlobalLoader() {
  return useContext(LoadingContext);
}

