// evm/fusion.js
// LEVEL 4: Granular Conflict-Aware Fusion

// 1. COMPLETE CONFLICT-WORD LIST
const STRONG_CONFLICT_WORDS = [
    "fight", "fighting", "fought",
    "yell", "yelled", "yelling",
    "shout", "shouted", "shouting",
    "rage", "furious", "angry", "anger",
    "hit", "slap", "threaten",
    "abuse", "abused",
    "scream", "screaming"
];

const MEDIUM_CONFLICT_WORDS = [
    "argument", "argue", "arguing",
    "dispute", "conflict",
    "scold", "scolded",
    "warned", "complaint",
    "blame", "blamed",
    "pressure", "tension"
];

function detectConflictLevel(text) {
    const t = (text || "").toLowerCase();

    if (STRONG_CONFLICT_WORDS.some(w => t.includes(w))) return "strong";
    if (MEDIUM_CONFLICT_WORDS.some(w => t.includes(w))) return "medium";

    return "none";
}

export function fuseSignals(signals) {
    const { local, textRaw } = signals;

    // Step 1: Detect Conflict Level
    const conflictLevel = detectConflictLevel(textRaw);

    // SENTIMENT (Valence)
    // local.score is typically -5 to 5. We map it to -1 to 1.
    const sentimentScore = local?.score || 0;
    let valence = Math.max(-1, Math.min(1, sentimentScore / 5));

    // AROUSAL (Intensity)
    // Base arousal from sentiment intensity
    let arousal = Math.abs(sentimentScore) * 0.15;

    // GENERIC KEYWORDS (Restored for non-conflict cases like "tired")
    const highArousal = ['urgently', 'now', 'panic', 'fast', 'rush'];
    const lowArousal = ['tired', 'bored', 'sleepy', 'slow', 'calm', 'tiring', 'exhaust', 'drain'];

    if (highArousal.some(w => textRaw.toLowerCase().includes(w))) arousal += 0.4;
    else if (lowArousal.some(w => textRaw.toLowerCase().includes(w))) arousal -= 0.3;

    // 🔥 EXACT AROUSAL BOOST VALUES (Conflict Overrides)
    if (conflictLevel === "medium") {
        arousal += 0.30;
    } else if (conflictLevel === "strong") {
        arousal += 0.50;
    }

    arousal = Math.max(-1, Math.min(1, arousal));

    // CONTROL & CERTAINTY - Adjust based on conflict severity
    let control = 0.5;
    let certainty = 0.5;

    if (conflictLevel === "strong") {
        control = 0.2; // Very low control in fights
        certainty = 0.8; // Very sure about the anger
    } else if (conflictLevel === "medium") {
        control = 0.3;
        certainty = 0.6; // Variable in arguments
    } else {
        // Default Logic for No Conflict (restored logic)
        // If "tired" or "overwhelmed", decrease control (implies I can't handle it)
        if (textRaw.match(/can't|cannot|distracted|overwhelmed|helpless|tired|tiring|exhaust/i)) control -= 0.3;
        if (textRaw.match(/will|going to|plan|decided|handle/i)) control += 0.3;

        if (textRaw.match(/maybe|guess|idk|don't know|confused/i)) certainty -= 0.3;
        if (textRaw.match(/definitely|sure|absolutely|always/i)) certainty += 0.3;
    }

    return {
        vector: { valence, arousal, control, certainty },
        fusionSource: `Conflict-Aware Fusion (${conflictLevel} conflict)`
    };
}

// LEVEL 6: Explainable AI (XAI)
export function explainVector(vector) {
    const reasons = [];

    // 1. Valence (Positivity)
    if (vector.valence < -0.5) reasons.push("Negative sentiment detected");
    else if (vector.valence > 0.5) reasons.push("Positive outlook identified");

    // 2. Arousal (Energy)
    if (vector.arousal > 0.5) reasons.push("High tension/energy levels");
    else if (vector.arousal < -0.5) reasons.push("Low energy/lethargy");

    // 3. Control (Situation)
    if (vector.control < 0.3) reasons.push("Feeling lack of control");

    // 4. Certainty (Confidence)
    if (vector.certainty < 0.3) reasons.push("Uncertainty/Confusion detected");

    if (reasons.length === 0) reasons.push("Balanced emotional state");

    return reasons;
}
