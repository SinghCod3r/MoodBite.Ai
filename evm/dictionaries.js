// evm/dictionaries.js
// CORE: 28-Emotion Ontology & Lexicon

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

// Lexicons (Weighted Keywords)
export const EMOTION_LEXICON = {
    // --- NEGATIVE ---
    anger: ["anger", "angry", "mad", "upset", "hateful", "furious", "irritated", "annoyed", "bitter", "fuming"],
    rage: ["rage", "furious", "livid", "exploded", "violence", "hate", "fight", "scream", "yell", "shout", "abuse"],
    frustration: ["frustrated", "stuck", "annoying", "blocked", "fail", "useless", "stupid", "dumb", "argh"],
    sadness: ["sad", "sadness", "depressed", "unhappy", "cry", "crying", "tears", "blue", "down", "melancholy"],
    grief: ["grief", "loss", "lost", "mourn", "mourning", "dead", "died", "gone", "heartbroken"],
    fear: ["fear", "afraid", "scared", "terrified", "panic", "horror", "frightened", "spine", "chilling"],
    anxiety: ["anxious", "nervous", "worry", "worried", "tense", "uneasy", "jittery", "dread"],
    shame: ["shame", "ashamed", "bad person", "wrong", "disgrace", "humiliation"],
    guilt: ["guilt", "guilty", "sorry", "apologize", "fault", "mistake", "regret"],
    embarrassment: ["embarrassed", "ashamed", "awkward", "stupid", "fool", "blush"],
    disgust: ["disgust", "disgusted", "gross", "yuck", "sick", "nasty", "revolting", "repulsive"],
    disappointment: ["disappointed", "let down", "expectation", "failed", "sucks", "poor"],
    regret: ["regret", "wish", "should have", "mistake", "wrong choice"],

    // --- COGNITIVE / MIXED ---
    stress: ["stress", "stressed", "pressure", "overwhelmed", "deadline", "busy", "tired", "exhausted", "drained", "burnout"],
    confusion: ["confused", "lost", "don't understand", "weird", "puzzle", "baffled", "what"],
    uncertainty: ["uncertain", "unsure", "maybe", "doubt", "don't know", "possibility", "indecisive"],
    surprise: ["surprise", "shock", "shocked", "unexpected", "wow", "sudden", "amazed"],
    curiosity: ["curious", "interest", "wonder", "why", "how", "explore", "learn"],
    anticipation: ["anticipate", "wait", "waiting", "expecting", "hoping", "look forward"],

    // --- POSITIVE ---
    joy: ["joy", "happy", "happiness", "delight", "glad", "smile", "laugh", "fun", "good", "great"],
    excitement: ["excited", "exciting", "pumped", "hype", "thrilled", "awesome", "energetic"],
    love: ["love", "loving", "adore", "crush", "care", "heart", "passion", "affection"],
    gratitude: ["grateful", "thankful", "thanks", "blessed", "appreciate"],
    pride: ["proud", "pride", "achievement", "won", "success", "accomplished"],
    relief: ["relief", "relieved", "finally", "done", "safe", "calm"],

    // --- NEUTRAL ---
    neutral: ["okay", "fine", "normal", "nothing", "bored", "meh", "so-so"]
};

// Conflict Words (Physics Boosters)
export const STRONG_CONFLICT_WORDS = ["fight", "fought", "yell", "yelled", "shout", "shouted", "scream", "screaming", "rage", "violence", "hit", "slap", "abuse"];
export const MEDIUM_CONFLICT_WORDS = ["argue", "argued", "argument", "conflict", "dispute", "scold", "scolded", "blame", "blamed", "tension", "drama"];

// Context Contexts
export const CONTEXT_TRIGGERS = {
    academic: ["exam", "test", "study", "studying", "homework", "assignment", "grades", "school", "college"],
    professional: ["work", "job", "boss", "meeting", "deadline", "project", "presentation", "office"],
    social: ["friend", "date", "party", "social", "people", "relationship", "breakup"]
};
