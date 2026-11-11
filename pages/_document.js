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
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="g2yC6YnvrUIcG_vFf24zycNFP8GdzMV8iN7lx2ReeEw" />
        
        {/* Core SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <title>MoodBite.AI — Mood-Based Food Recommendation Intelligence</title>
        <meta name="description" content="MoodBite.AI analyzes your emotional state and recommends personalized food choices using explainable AI. Get culinary interventions tailored to joy, stress, calm, excitement, and 10+ moods. Free, private, works offline." />
        <meta name="keywords" content="mood-based food recommendations, emotional eating AI, personalized nutrition, mood food matching, culinary intelligence, explainable food AI, mood analysis food suggestions, what to eat when sad, stress relief food, comfort food AI, food for anxiety, AI nutritionist" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="yandex" content="index, follow" />
        <meta name="duckduckbot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Ayush Singh" />
        <meta name="copyright" content="MoodBite.AI 2026" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://moodbite.ai/" />
        <link rel="alternate" href="https://moodbite.ai/" hreflang="en" />
        <link rel="alternate" href="https://moodbite.ai/" hreflang="x-default" />
        
        {/* Open Graph / Social Sharing - Enhanced */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://moodbite.ai/" />
        <meta property="og:title" content="MoodBite.AI — Discover What to Eat Based on How You Feel" />
        <meta property="og:description" content="🍽️ Feeling stressed? Sad? Excited? MoodBite.AI analyzes your mood and recommends the perfect food using explainable AI. 12+ emotional states, dietary filters, works offline. Try free!" />
        <meta property="og:image" content="https://moodbite.ai/og-image.png" />
        <meta property="og:image:secure_url" content="https://moodbite.ai/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="MoodBite.AI - Mood-based food recommendation interface showing emotional state analysis and personalized food suggestions" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="MoodBite.AI" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />
        
        {/* Enhanced Open Graph for rich sharing */}
        <meta property="og:see_also" content="https://moodbite.ai/about" />
        
        {/* Twitter Card - Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://moodbite.ai/" />
        <meta name="twitter:title" content="MoodBite.AI — Discover What to Eat Based on How You Feel" />
        <meta name="twitter:description" content="🍽️ Feeling stressed? Sad? Excited? MoodBite.AI analyzes your mood and recommends the perfect food using explainable AI. 12+ emotional states, dietary filters, works offline. Try free!" />
        <meta name="twitter:image" content="https://moodbite.ai/og-image.png" />
        <meta name="twitter:image:alt" content="MoodBite.AI mood-based food recommendations" />
        <meta name="twitter:site" content="@moodbite_ai" />
        <meta name="twitter:creator" content="@ayushsinghceee" />
        <meta name="twitter:label1" content="Price" />
        <meta name="twitter:data1" content="Free" />
        <meta name="twitter:label2" content="Platform" />
        <meta name="twitter:data2" content="Web, iOS, Android" />
        
        {/* PWA / Mobile App - Enhanced */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#4f46e5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#050508" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MoodBite" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="apple-touch-startup-image" href="/icons/splash-640x1136.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-750x1334.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-1242x2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-1125x2436.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-828x1792.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-1242x2688.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-1536x2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-1668x2224.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-1668x2388.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/splash-2048x2732.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" />
        
        {/* Favicon & Icons - Complete Set */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#4f46e5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Preconnect & Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" as="style" href="/_next/static/css/app.css" />
        
        {/* Structured Data - JSON-LD - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "MoodBite.AI",
              "url": "https://moodbite.ai/",
              "description": "Mood-Based Food Recommendation Intelligence using explainable AI to analyze emotional states and recommend personalized culinary interventions.",
              "applicationCategory": "FoodApplication",
              "operatingSystem": "Web, iOS, Android, Windows, macOS",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              },
              "creator": {
                "@type": "Person",
                "name": "Ayush Singh",
                "email": "ayushsinghceee@gmail.com",
                "url": "https://github.com/SinghCod3r",
                "sameAs": [
                  "https://github.com/SinghCod3r",
                  "https://twitter.com/ayushsinghceee"
                ]
              },
              "publisher": {
                "@type": "Organization",
                "name": "MoodBite.AI",
                "url": "https://moodbite.ai/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://moodbite.ai/logo.png",
                  "width": 512,
                  "height": 512
                },
                "sameAs": [
                  "https://github.com/SinghCod3r/MoodBite.Ai"
                ]
              },
              "featureList": [
                "Mood analysis from natural language input",
                "12+ emotional states supported",
                "Explainable AI food recommendations",
                "Dietary preference filtering (vegetarian, vegan, non-veg, Jain)",
                "Food availability constraints (home, delivery, restaurant, market)",
                "Mood trajectory tracking",
                "Voice input support",
                "Chat history & session persistence",
                "Works completely offline",
                "Zero external API dependencies",
                "Privacy-first local storage",
                "<3ms inference latency"
              ],
              "screenshot": "https://moodbite.ai/og-image.png",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127",
                "bestRating": "5",
                "worstRating": "1"
              },
              "keywords": "mood-based food recommendations, emotional eating AI, personalized nutrition, explainable AI food, mood food matching",
              "datePublished": "2026-01-01",
              "dateModified": "2026-11-11",
              "version": "1.0.0",
              "permissions": "microphone (for voice input), storage (for local data)"
            })
          }}
        />
        
        {/* Structured Data - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "MoodBite.AI",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web Browser, iOS, Android, Windows, macOS",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "description": "AI-powered mood analysis for personalized food recommendations. Understand your emotional state and get explainable culinary suggestions.",
              "featureList": [
                "Natural language mood detection",
                "Explainable recommendation engine",
                "Dietary & availability filters",
                "Mood trajectory visualization",
                "Voice-to-text input",
                "Offline-first PWA",
                "Zero telemetry"
              ],
              "downloadUrl": "https://moodbite.ai/",
              "installUrl": "https://moodbite.ai/",
              "memoryRequirements": "50MB",
              "storageRequirements": "100MB",
              "requirements": "Modern web browser with JavaScript enabled"
            })
          }}
        />
        
        {/* Structured Data - FAQ Page for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is MoodBite.AI?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MoodBite.AI is an explainable AI-powered food recommendation system that analyzes your emotional state from natural language input and suggests personalized food choices tailored to your mood, dietary preferences, and food availability."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does MoodBite.AI detect my mood?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MoodBite.AI uses a 12-layer deterministic pipeline including an Emotional Vector Machine (EVM) that maps linguistic signals into 11 canonical emotional states (joy, sadness, anger, fear, stress, calm, excitement, boredom, loneliness, neutral, unknown) with clause-level negation parsing."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is MoodBite.AI free to use?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, MoodBite.AI is completely free with no subscription, no paid API dependencies, and no hidden costs. All processing runs locally in your browser."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does MoodBite.AI respect my privacy?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. MoodBite.AI is privacy-first with 100% local-first data storage. Your mood history, dietary preferences, and feedback never leave your browser. No tracking, no analytics, no external data collection."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What dietary preferences does MoodBite.AI support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MoodBite.AI supports vegetarian, vegan, non-vegetarian, and Jain dietary preferences with strict hard constraint filtering that never violates your dietary rules."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use MoodBite.AI offline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! MoodBite.AI is a Progressive Web App (PWA) that works completely offline after the first visit. Install it on your phone or desktop for instant access anywhere."
                  }
                }
              ]
            })
          }}
        />
        
        {/* Structured Data - BreadcrumbList for better navigation understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://moodbite.ai/"
                }
              ]
            })
          }}
        />
      </Head>
      <body className="antialiased bg-black text-white selection:bg-indigo-500/30">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
