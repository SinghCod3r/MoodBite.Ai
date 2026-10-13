/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

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


    const conflictLevel = detectConflictLevel(textRaw);



    const sentimentScore = local?.score || 0;
    let valence = Math.max(-1, Math.min(1, sentimentScore / 5));



    let arousal = Math.abs(sentimentScore) * 0.15;


    const highArousal = ['urgently', 'now', 'panic', 'fast', 'rush'];
    const lowArousal = ['tired', 'bored', 'sleepy', 'slow', 'calm', 'tiring', 'exhaust', 'drain'];

    if (highArousal.some(w => textRaw.toLowerCase().includes(w))) arousal += 0.4;
    else if (lowArousal.some(w => textRaw.toLowerCase().includes(w))) arousal -= 0.3;


    if (conflictLevel === "medium") {
        arousal += 0.30;
    } else if (conflictLevel === "strong") {
        arousal += 0.50;
    }

    arousal = Math.max(-1, Math.min(1, arousal));


    let control = 0.5;
    let certainty = 0.5;

    if (conflictLevel === "strong") {
        control = 0.2;
        certainty = 0.8;
    } else if (conflictLevel === "medium") {
        control = 0.3;
        certainty = 0.6;
    } else {


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


export function explainVector(vector) {
    const reasons = [];


    if (vector.valence < -0.5) reasons.push("Negative sentiment detected");
    else if (vector.valence > 0.5) reasons.push("Positive outlook identified");


    if (vector.arousal > 0.5) reasons.push("High tension/energy levels");
    else if (vector.arousal < -0.5) reasons.push("Low energy/lethargy");


    if (vector.control < 0.3) reasons.push("Feeling lack of control");


    if (vector.certainty < 0.3) reasons.push("Uncertainty/Confusion detected");

    if (reasons.length === 0) reasons.push("Balanced emotional state");

    return reasons;
}
