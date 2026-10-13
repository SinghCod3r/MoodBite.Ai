/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

export const NEGATIVE_EMOTIONS = [
    "anger", "rage", "frustration", "sadness", "fear", "anxiety",
    "shame", "guilt", "disgust", "embarrassment", "regret", "disappointment", "grief"
];

export const COGNITIVE_EMOTIONS = [
    "stress", "confusion", "surprise", "curiosity", "anticipation", "uncertainty"
];

export const POSITIVE_EMOTIONS = [
    "joy", "excitement", "love", "gratitude", "pride", "relief"
];


export const EMOTION_LEXICON = {

    anger: ["anger", "angry", "mad", "upset", "hateful", "furious", "irritated", "annoyed", "bitter", "fuming"],
    rage: ["rage", "furious", "livid", "exploded", "violence", "hate", "fight", "scream", "yell", "shout", "abuse"],
    frustration: ["frustrated", "stuck", "annoying", "blocked", "fail", "useless", "stupid", "dumb", "argh"],
    sadness: ["sad", "sadness", "depressed", "unhappy", "cry", "crying", "tears", "blue", "down", "melancholy"],
    grief: ["grief", "loss", "lost", "mourn", "mourning", "dead", "died", "gone", "heartbroken"],
    fear: ["fear", "afraid", "scared", "terrified", "panic", "horror", "frightened", "worried", "worry", "anxious", "nervous", "dread"],
    anxiety: ["anxious", "nervous", "worry", "worried", "tense", "uneasy", "jittery", "dread"],
    shame: ["shame", "ashamed", "bad person", "wrong", "disgrace", "humiliation"],
    guilt: ["guilt", "guilty", "sorry", "apologize", "fault", "mistake", "regret"],
    embarrassment: ["embarrassed", "ashamed", "awkward", "stupid", "fool", "blush"],
    disgust: ["disgust", "disgusted", "gross", "yuck", "sick", "nasty", "revolting", "repulsive"],
    disappointment: ["disappointed", "let down", "expectation", "failed", "sucks", "poor"],
    regret: ["regret", "wish", "should have", "mistake", "wrong choice"],


    stress: ["stress", "stressed", "pressure", "overwhelmed", "deadline", "busy", "tired", "exhausted", "drained", "burnout"],
    confusion: ["confused", "lost", "don't understand", "weird", "puzzle", "baffled", "what"],
    uncertainty: ["uncertain", "unsure", "maybe", "doubt", "don't know", "possibility", "indecisive"],
    surprise: ["surprise", "shock", "shocked", "unexpected", "expecting", "wow", "sudden", "amazed"],
    curiosity: ["curious", "interest", "wonder", "why", "how", "explore", "learn"],
    anticipation: ["anticipate", "wait", "waiting", "expecting", "hoping", "look forward"],


    joy: ["joy", "happy", "happiness", "delight", "glad", "smile", "laugh", "fun", "good", "great", "amazing", "wonderful", "thank you", "thanks"],
    excitement: ["excited", "exciting", "pumped", "hype", "thrilled", "awesome", "energetic"],
    love: ["love", "loving", "adore", "crush", "care", "heart", "passion", "affection"],
    gratitude: ["grateful", "thankful", "thanks", "blessed", "appreciate"],
    pride: ["proud", "pride", "achievement", "won", "success", "accomplished"],
    relief: ["relief", "relieved", "finally", "done", "safe"],
    calm: ["calm", "calming", "peaceful", "peace", "serene", "relaxed", "relaxing", "chill", "chilling", "tranquil", "zen", "soothed"],
    loneliness: ["lonely", "alone", "isolated", "isolation", "homesick", "alienated"],


    neutral: ["okay", "fine", "normal", "nothing", "bored", "meh", "so-so"]
};


export const STRONG_CONFLICT_WORDS = ["fight", "fought", "yell", "yelled", "shout", "shouted", "scream", "screaming", "rage", "violence", "hit", "slap", "abuse"];
export const MEDIUM_CONFLICT_WORDS = ["argue", "argued", "argument", "conflict", "dispute", "scold", "scolded", "blame", "blamed", "tension", "drama"];


export const CONTEXT_TRIGGERS = {
    academic: ["exam", "test", "study", "studying", "homework", "assignment", "grades", "school", "college"],
    professional: ["work", "job", "boss", "meeting", "deadline", "project", "presentation", "office"],
    social: ["friend", "date", "party", "social", "people", "relationship", "breakup"]
};
