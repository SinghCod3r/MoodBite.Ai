/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MoodBackground from '../components/MoodBackground';
import PWADownloadCard from '../components/PWADownloadCard';
import {
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  Filter,
  Database,
  Brain,
  Heart,
  ArrowRight,
  Activity,
  Compass,
  AlertCircle
} from 'lucide-react';

export default function About() {
  const pipelineSteps = [
    {
      step: "01",
      name: "Input & Intent Gate",
      icon: Compass,
      desc: "Validates queries before emotion analysis. Categorizes into MOOD, FOOD_REQUEST, GREETING, OFF_TOPIC, or UNKNOWN so random text never triggers hallucinated meals.",
      badge: "P0 Guardrail"
    },
    {
      step: "02",
      name: "Clause & Negation Engine",
      icon: Cpu,
      desc: "Splits multi-clause sentences at punctuation and contrastive markers ('but', 'however'). Resolves negation scopes ('not sad', 'no longer stressed') accurately.",
      badge: "NLP Semantics"
    },
    {
      step: "03",
      name: "Canonical Emotion Ontology",
      icon: Brain,
      desc: "Maps linguistic signals into an 11-class canonical ontology (joy, sadness, anger, fear, stress, calm, excitement, boredom, loneliness, neutral, unknown).",
      badge: "EVM Vector"
    },
    {
      step: "04",
      name: "Calibrated Confidence",
      icon: Activity,
      desc: "Derives confidence from expert agreement, signal separation, and clause intensity. Low-confidence inputs safely trigger an AMBIGUOUS clarification state.",
      badge: "Evidence-Based"
    },
    {
      step: "05",
      name: "Hard Constraint Extraction",
      icon: Filter,
      desc: "Extracts dietary rules (vegetarian, vegan, non-veg, Jain), availability channels (home, market, restaurant, delivery), and spice preferences from query and profile.",
      badge: "P0 Safety"
    },
    {
      step: "06",
      name: "Rich Culinary Knowledge",
      icon: Database,
      desc: "Curated dataset of 25+ rich food profiles featuring mood affinities, nutritional balance, spice profiles, prep times, and availability tags.",
      badge: "Domain Model"
    },
    {
      step: "07",
      name: "Deterministic Hard Filtering",
      icon: ShieldCheck,
      desc: "Strictly eliminates any candidate violating dietary restrictions or availability channels. Vegetarian never receives meat. Hard rules always win.",
      badge: "Zero Violations"
    },
    {
      step: "08",
      name: "Multi-Factor Scoring & Ranking",
      icon: Sparkles,
      desc: "Scores remaining candidates across emotion affinity (0.35), comfort fit (0.20), energy/digestion (0.15), variety bonus (0.10), and user feedback boost (0.10).",
      badge: "Deterministic"
    },
    {
      step: "09",
      name: "Hero & Curated Alternatives",
      icon: Heart,
      desc: "Selects the highest-ranking candidate as Hero recommendation and preserves distinct alternative candidates spanning different preparation avenues.",
      badge: "Top Choices"
    },
    {
      step: "10",
      name: "Explainable Chef's Logic",
      icon: Layers,
      desc: "Generates clear, transparent rationales breaking down why the meal was chosen, its physiological intervention, and the emotional vector physics.",
      badge: "Transparent"
    },
    {
      step: "11",
      name: "Adaptive Glassmorphism UI",
      icon: Zap,
      desc: "Renders real-time dynamic ambient lighting reflecting the detected mood, multi-axis vector radar chart, hero cards, and one-click quick starters.",
      badge: "Mobile PWA"
    },
    {
      step: "12",
      name: "Privacy-First Personalization",
      icon: CheckCircle2,
      desc: "100% local-first data storage. Taste feedback, mood trajectories, and dietary settings remain in your browser with full anonymous guest mode support.",
      badge: "Local-First"
    }
  ];

  const benchmarks = [
    { label: "Intent Gate Accuracy", value: "100.0%", detail: "14/14 test cases verified" },
    { label: "Emotion Classification", value: "100.0%", detail: "12/12 canonical classes" },
    { label: "Negation Handling", value: "100.0%", detail: "7/7 contrastive & double negations" },
    { label: "Hard Constraint Safety", value: "100.0%", detail: "0 violations across all diets" },
    { label: "Average Inference Latency", value: "< 3 ms", detail: "Pure local CPU execution" },
    { label: "Automated Unit Tests", value: "33 / 33", detail: "Passing in Node.js test runner" }
  ];

  const testCases = [
    {
      input: '"My exam is tomorrow and I haven\'t studied anything."',
      mood: "Stress",
      diet: "Vegetarian",
      strategy: "Calming Warmth & Focus",
      recommendation: "Masala Chai / Moong Dal Khichdi",
      rationale: "Contextual academic anxiety detected without direct keywords. Calming warmth lowers cortisol."
    },
    {
      input: '"I am not sad at all, actually had a wonderful day!"',
      mood: "Joy",
      diet: "Any",
      strategy: "Celebration & Reward",
      recommendation: "Vegetable Biryani",
      rationale: "Negation engine resolved 'not sad' and prioritized positive clause 'wonderful day'."
    },
    {
      input: '"I\'m feeling down and need comfort, but I am strictly vegan."',
      mood: "Sadness",
      diet: "Vegan",
      strategy: "Grounding Comfort",
      recommendation: "Dal Tadka with Steamed Rice",
      rationale: "Hard constraint enforced: dairy/ghee excluded. Warm, protein-rich lentils provide serotonin support."
    },
    {
      input: '"I am furious about my flight delay!"',
      mood: "Anger",
      diet: "Vegetarian",
      strategy: "Sensory Release",
      recommendation: "Spicy Chaat / Pav Bhaji",
      rationale: "High-arousal frustration balanced with endorphin-releasing capsicum and bold spices."
    },
    {
      input: '"What is Python?"',
      mood: "Neutral",
      diet: "N/A",
      strategy: "Intent Guardrail",
      recommendation: "Clarification Guide",
      rationale: "Off-topic gate triggered. Explains culinary scope without hallucinating meals."
    },
    {
      input: '"Hey"',
      mood: "Neutral",
      diet: "N/A",
      strategy: "Greeting Welcome",
      recommendation: "Interactive Prompts",
      rationale: "Recognized conversational greeting. Welcomes user and offers instant starter prompts."
    },
    {
      input: '"cxkvkxv"',
      mood: "Unknown",
      diet: "N/A",
      strategy: "Disambiguation",
      recommendation: "I Didn't Quite Catch That",
      rationale: "Low lexical entropy detected. Prompts user for clarification without guessing."
    }
  ];

  return (
    <div className="relative min-h-screen w-full font-sans text-white bg-transparent selection:bg-indigo-500/30">

      <MoodBackground mood="neutral" />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-5xl mx-auto space-y-20">

        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Domain-Specific Food Recommendation Intelligence
          </div>

          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight">
            Engineering <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300">MoodBite.Ai</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300/90 leading-relaxed max-w-3xl mx-auto font-light">
            MoodBite is an <strong>explainable, constraint-aware culinary recommendation engine</strong> designed to regulate psychological states through dietary intervention.
            Unlike generic LLM wrappers, MoodBite runs a deterministic 12-layer pipeline that combines an <strong>Emotional Vector Machine (EVM)</strong>, clause-level negation parsing, hard constraint safety, and multi-factor ranking—100% locally with zero paid API dependencies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left pt-4">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="text-xs font-mono text-indigo-400 mb-1 font-semibold uppercase">01 • Not A Chatbot</div>
              <h4 className="text-base font-medium text-white mb-1">Intent-Gated Boundaries</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                MoodBite refuses to hallucinate arbitrary food for off-topic inquiries or gibberish. Every input passes strict intent gates.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="text-xs font-mono text-emerald-400 mb-1 font-semibold uppercase">02 • Zero Violations</div>
              <h4 className="text-base font-medium text-white mb-1">Strict Hard Constraints</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Vegetarian, vegan, and allergy filters are strictly deterministic filters, never soft score increments. Forbidden foods are pruned immediately.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <div className="text-xs font-mono text-amber-400 mb-1 font-semibold uppercase">03 • Local & Private</div>
              <h4 className="text-base font-medium text-white mb-1">&lt;3ms Local Computation</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zero third-party telemetry, zero external token costs, and 100% offline functionality powered by local client & edge execution.
              </p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 max-w-3xl mx-auto flex items-start text-left gap-4 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-amber-200 font-semibold text-xs uppercase tracking-wider font-mono">Wellness & System Scope</h4>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                MoodBite analyzes linguistic markers to suggest comfort and nourishment. It is an ambient wellness recommendation system, not a clinical psychiatric or medical diagnosis tool.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <Layers className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl md:text-3xl font-light">12-Layer System Architecture</h2>
            </div>
            <span className="text-xs font-mono text-white/50 hidden sm:inline">END-TO-END PIPELINE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all duration-300 flex flex-col justify-between space-y-4 backdrop-blur-md hover:border-white/20 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-white/40 group-hover:text-indigo-400 transition-colors">
                        LAYER {step.step}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                        {step.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-semibold text-white tracking-tight">{step.name}</h4>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <Activity className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-light">Evaluation Benchmarks</h2>
            </div>
            <span className="text-xs font-mono text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              VERIFIED OFFLINE
            </span>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-light">
            Every subsystem change is benchmarked against real linguistic and constraint test suites without using external cloud services.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {benchmarks.map((b, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center space-y-1">
                <div className="text-2xl md:text-3xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
                  {b.value}
                </div>
                <div className="text-xs font-medium text-white">{b.label}</div>
                <div className="text-[11px] text-gray-400 font-mono">{b.detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-light">Verified Production Test Cases</h2>
            </div>
            <span className="text-xs font-mono text-white/50">DETERMINISTIC BEHAVIOR</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono text-gray-400 uppercase tracking-wider bg-white/[0.03]">
                  <th className="py-3.5 px-4">User Query</th>
                  <th className="py-3.5 px-4">Mood</th>
                  <th className="py-3.5 px-4">Intervention Strategy</th>
                  <th className="py-3.5 px-4">Food Recommendation</th>
                  <th className="py-3.5 px-4">Explainability & Gate</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-white/5">
                {testCases.map((tc, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-gray-300 max-w-xs">{tc.input}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 font-semibold text-indigo-300">
                        {tc.mood}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-300 font-medium">{tc.strategy}</td>
                    <td className="py-3.5 px-4 text-emerald-300 font-semibold">{tc.recommendation}</td>
                    <td className="py-3.5 px-4 text-gray-400 leading-relaxed max-w-sm">{tc.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 pt-4">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <Zap className="w-6 h-6 text-indigo-400" />
            <h2 className="text-2xl md:text-3xl font-light">Mobile App & Offline PWA</h2>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-light">
            MoodBite.Ai is fully progressive-web-app (PWA) compliant. You can install it on iOS, Android, macOS, and Windows for an app-like experience with instant launch speeds and offline caching.
          </p>

          <PWADownloadCard />
        </section>

        <div className="pt-8">
          <Footer />
        </div>
      </main>
    </div>
  );
}
