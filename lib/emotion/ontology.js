/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export const CANONICAL_EMOTIONS = [
  "joy",
  "sadness",
  "anger",
  "fear",
  "stress",
  "calm",
  "excitement",
  "boredom",
  "loneliness",
  "neutral",
  "ambiguous",
  "unknown"
];

export const EMOTION_CATEGORIES = {
  POSITIVE: ["joy", "excitement", "calm"],
  NEGATIVE: ["sadness", "anger", "fear", "loneliness"],
  COGNITIVE: ["stress", "boredom"],
  NEUTRAL: ["neutral"],
  META: ["ambiguous", "unknown"]
};

export const EMOTION_ALIASES = {

  sad: "sadness",
  sadness: "sadness",
  depressed: "sadness",
  depression: "sadness",
  unhappy: "sadness",
  crying: "sadness",
  cry: "sadness",
  tears: "sadness",
  blue: "sadness",
  down: "sadness",
  melancholy: "sadness",
  heartbroken: "sadness",
  grief: "sadness",
  mourn: "sadness",
  mourning: "sadness",
  miserable: "sadness",
  gloomy: "sadness",
  hopeless: "sadness",
  disappointed: "sadness",
  disappointment: "sadness",
  regret: "sadness",
  shame: "sadness",
  guilt: "sadness",

  anger: "anger",
  angry: "anger",
  mad: "anger",
  upset: "anger",
  furious: "anger",
  rage: "anger",
  irritated: "anger",
  annoyed: "anger",
  annoyance: "anger",
  frustrated: "anger",
  frustration: "anger",
  livid: "anger",
  fuming: "anger",
  outraged: "anger",
  pissed: "anger",
  bitter: "anger",
  hostile: "anger",
  hate: "anger",
  hateful: "anger",
  infuriated: "anger",
  aggravated: "anger",

  stress: "stress",
  stressed: "stress",
  stressful: "stress",
  overwhelmed: "stress",
  pressure: "stress",
  deadline: "stress",
  burnout: "stress",
  drained: "stress",
  exhausted: "stress",
  fatigued: "stress",
  tired: "stress",
  sleepy: "stress",
  overworked: "stress",
  swamped: "stress",
  hectic: "stress",
  tiring: "stress",

  fear: "fear",
  afraid: "fear",
  scared: "fear",
  terrified: "fear",
  panic: "fear",
  panicking: "fear",
  panicky: "fear",
  horror: "fear",
  frightened: "fear",
  anxious: "fear",
  anxiety: "fear",
  nervous: "fear",
  nervousness: "fear",
  worried: "fear",
  worry: "fear",
  tense: "fear",
  dread: "fear",
  jittery: "fear",
  apprehensive: "fear",

  joy: "joy",
  happy: "joy",
  happiness: "joy",
  delight: "joy",
  delighted: "joy",
  glad: "joy",
  cheerful: "joy",
  content: "joy",
  contentment: "joy",
  pleased: "joy",
  smile: "joy",
  laugh: "joy",
  love: "joy",
  loving: "joy",
  grateful: "joy",
  gratitude: "joy",
  thankful: "joy",
  proud: "joy",
  pride: "joy",
  admiration: "joy",
  blessed: "joy",

  excitement: "excitement",
  excited: "excitement",
  exciting: "excitement",
  pumped: "excitement",
  hype: "excitement",
  hyped: "excitement",
  thrilled: "excitement",
  ecstatic: "excitement",
  energetic: "excitement",
  anticipation: "excitement",

  calm: "calm",
  peaceful: "calm",
  relaxed: "calm",
  serene: "calm",
  tranquil: "calm",
  chill: "calm",
  chilling: "calm",
  relief: "calm",
  relieved: "calm",
  zen: "calm",
  soothed: "calm",

  bored: "boredom",
  boring: "boredom",
  boredom: "boredom",
  dull: "boredom",
  uninspired: "boredom",
  apathetic: "boredom",

  lonely: "loneliness",
  loneliness: "loneliness",
  alone: "loneliness",
  isolated: "loneliness",
  isolation: "loneliness",
  homesick: "loneliness",
  alienated: "loneliness",

  neutral: "neutral",
  okay: "neutral",
  fine: "neutral",
  normal: "neutral",
  alright: "neutral",
  "so-so": "neutral",
  meh: "neutral",
  ordinary: "neutral",

  ambiguous: "ambiguous",
  mixed: "ambiguous",
  weird: "ambiguous",
  confused: "ambiguous",
  confusion: "ambiguous",
  uncertain: "ambiguous",
  uncertainty: "ambiguous",
  lost: "ambiguous",
  strange: "ambiguous",
  torn: "ambiguous",
  unknown: "unknown"
};

export const CANONICAL_VECTORS = {
  joy: { valence: 0.85, arousal: 0.65, control: 0.75, certainty: 0.85 },
  excitement: { valence: 0.90, arousal: 0.90, control: 0.70, certainty: 0.80 },
  calm: { valence: 0.70, arousal: -0.60, control: 0.85, certainty: 0.85 },
  sadness: { valence: -0.75, arousal: -0.40, control: 0.25, certainty: 0.60 },
  anger: { valence: -0.80, arousal: 0.85, control: 0.35, certainty: 0.80 },
  fear: { valence: -0.70, arousal: 0.80, control: 0.15, certainty: 0.30 },
  stress: { valence: -0.60, arousal: 0.65, control: 0.25, certainty: 0.40 },
  boredom: { valence: -0.20, arousal: -0.75, control: 0.50, certainty: 0.70 },
  loneliness: { valence: -0.65, arousal: -0.30, control: 0.20, certainty: 0.50 },
  neutral: { valence: 0.05, arousal: 0.05, control: 0.50, certainty: 0.50 },
  ambiguous: { valence: 0.00, arousal: 0.30, control: 0.35, certainty: 0.20 },
  unknown: { valence: 0.00, arousal: 0.00, control: 0.50, certainty: 0.00 }
};

export function normalizeEmotion(raw) {
  if (!raw || typeof raw !== "string") return "unknown";
  const cleaned = raw.toLowerCase().trim().replace(/[^a-z-]/g, "");
  if (EMOTION_ALIASES[cleaned]) return EMOTION_ALIASES[cleaned];
  if (CANONICAL_EMOTIONS.includes(cleaned)) return cleaned;
  return "unknown";
}

