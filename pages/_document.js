/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-black">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MoodBite" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="description" content="MoodBite.Ai — Domain-Specific Explainable Food Recommendation Intelligence" />
      </Head>
      <body className="antialiased bg-black text-white selection:bg-indigo-500/30">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
