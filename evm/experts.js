// evm/experts.js
import { EMOTION_LEXICON, STRONG_CONFLICT_WORDS, MEDIUM_CONFLICT_WORDS, CONTEXT_TRIGGERS } from './dictionaries';

export class ExpertPanel {
    constructor(text) {
        this.text = text.toLowerCase().trim();
        this.words = this.text.split(/\s+|[.,!?;]+/);
    }

    // 1. Direct Emotion Expert (The "Fast Track")
    consultDirect() {
        for (const [emotion, keywords] of Object.entries(EMOTION_LEXICON)) {
            // Check if input IS exactly an emotion word or "i feel [emotion]"
            // We use the first few keywords as primary labels
            if (this.words.includes(emotion) || keywords.slice(0, 3).some(k => this.text === k || this.text === `i feel ${k}`)) {
                return { detected: true, emotion: emotion, confidence: 95 };
            }
        }
        return { detected: false };
    }

    // 2. Conflict Expert (The "Physics Engine")
    consultConflict() {
        let arousalBoost = 0;
        let conflictLevel = "none";

        if (STRONG_CONFLICT_WORDS.some(w => this.text.includes(w))) {
            arousalBoost = 0.50;
            conflictLevel = "strong";
        } else if (MEDIUM_CONFLICT_WORDS.some(w => this.text.includes(w))) {
            arousalBoost = 0.30;
            conflictLevel = "medium";
        }

        return { arousalBoost, conflictLevel };
    }

    // 3. Lexicon Expert (The "Scorer")
    consultLexicon() {
        let scores = {};
        for (const emotion in EMOTION_LEXICON) {
            scores[emotion] = 0;
        }

        const keywords = EMOTION_LEXICON;
        for (const [emotion, wordList] of Object.entries(keywords)) {
            for (const word of wordList) {
                if (this.text.includes(word)) {
                    // Match found
                    scores[emotion] += 1;

                    // Boost for exact word match
                    if (this.words.includes(word)) scores[emotion] += 1;
                }
            }
        }

        return scores;
    }

    // 4. Context Expert (The "Situation Analyst")
    consultContext() {
        let contextMod = { control: 0, certainty: 0, stressBoost: 0 };
        let detectedContext = null;

        // Academic / Professional -> Often High Stress, Low Control
        if (CONTEXT_TRIGGERS.academic.some(w => this.text.includes(w))) {
            detectedContext = "academic";
            contextMod.control -= 0.2;
            contextMod.stressBoost += 0.2;
        }
        if (CONTEXT_TRIGGERS.professional.some(w => this.text.includes(w))) {
            detectedContext = "professional";
            contextMod.control -= 0.1;
            contextMod.stressBoost += 0.2;
        }

        return { contextMod, detectedContext };
    }
}
