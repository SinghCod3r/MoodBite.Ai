// evm/judge.js
import { ExpertPanel } from './experts';

export function judgeEmotion(text) {
    const experts = new ExpertPanel(text);

    // 1. FAST TRACK: Explicit Emotion
    const direct = experts.consultDirect();
    if (direct.detected) {
        return {
            mood: direct.emotion,
            confidence: direct.confidence,
            source: "Direct Match",
            vector: simulateVector(direct.emotion), // Helper to generate a dummy vector for UI
            context: null
        };
    }

    // 2. INFERENCE MODE: Gather Signals
    const lexiconScores = experts.consultLexicon();
    const conflict = experts.consultConflict();
    const context = experts.consultContext();

    // 3. COMPUTE EVM VECTOR (The Physics)
    // Valence: Sum of Positive Emos - Sum of Negative Emos
    let posScore = sumScores(lexiconScores, ['joy', 'excitement', 'love', 'gratitude', 'pride', 'relief']);
    let negScore = sumScores(lexiconScores, ['anger', 'rage', 'sadness', 'fear', 'disgust', 'grief']);
    let valence = (posScore - negScore);
    valence = Math.max(-1, Math.min(1, valence / 3)); // Normalize

    // Arousal: Sum of High Energy Emos + Conflict Boost
    let energyScore = sumScores(lexiconScores, ['anger', 'rage', 'excitement', 'panic', 'stress']);
    let arousal = (energyScore * 0.2) + conflict.arousalBoost;
    arousal = Math.max(0, Math.min(1, arousal));

    // Control & Certainty
    let control = 0.5 + context.contextMod.control;
    let certainty = 0.5 + context.contextMod.certainty;

    if (conflict.conflictLevel === "medium") { control = 0.3; certainty = 0.6; }
    if (conflict.conflictLevel === "strong") { control = 0.2; certainty = 0.8; }

    const vector = { valence, arousal, control, certainty };

    // 4. JUDGEMENT: Select Top Emotion
    let topEmotion = 'neutral';
    let topScore = 0;

    // Sort emotions by score
    const sortedEmotions = Object.entries(lexiconScores).sort((a, b) => b[1] - a[1]);

    if (sortedEmotions[0][1] > 0) {
        topEmotion = sortedEmotions[0][0];
        topScore = sortedEmotions[0][1];
    }

    // 5. OVERRIDES (The Wisdom)
    // If usage of "Strong Conflict" words but top emotion isn't Anger/Rage, FORCE Anger/Rage
    if (conflict.conflictLevel === 'strong' && !['anger', 'rage'].includes(topEmotion)) {
        topEmotion = 'anger'; // or Rage
    }
    // If usage of "Medium Conflict" but top isn't Anger/Stress
    if (conflict.conflictLevel === 'medium' && !['anger', 'stress', 'frustration'].includes(topEmotion)) {
        if (vector.valence < 0) topEmotion = 'anger'; // Mild anger
    }

    // Complexity check
    let confidence = 75;
    if (sortedEmotions[0][1] === sortedEmotions[1][1] && sortedEmotions[0][1] > 0) {
        // Tie or very close
        confidence = 60;
        // Logic to pick the more intense one? Or just return mixed?
        // For now, stick to first.
    }

    if (topEmotion === 'neutral' && vector.valence < -0.4) topEmotion = 'sadness'; // Default neg

    return {
        mood: topEmotion,
        confidence: confidence,
        source: "Inferred Logic",
        vector,
        context: context.detectedContext
    };
}

function sumScores(scores, keys) {
    return keys.reduce((acc, k) => acc + (scores[k] || 0), 0);
}

// Maps 28 emotions to approximate vectors (for UI visualization only)
function simulateVector(emotion) {
    const map = {
        anger: { v: -0.7, a: 0.8, c: 0.3, cer: 0.8 },
        rage: { v: -0.9, a: 1.0, c: 0.1, cer: 0.9 },
        joy: { v: 0.8, a: 0.6, c: 0.7, cer: 0.8 },
        sadness: { v: -0.7, a: -0.2, c: 0.2, cer: 0.4 },
        // ... defaults
    };
    const def = map[emotion] || { v: 0, a: 0, c: 0.5, cer: 0.5 };
    return { valence: def.v, arousal: def.a, control: def.c, certainty: def.cer };
}
