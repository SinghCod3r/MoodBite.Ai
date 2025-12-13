// evm/foodEngine.js
// CORE: Food Recommendation Logic (Indian Cuisine) - Fridge Aware

// 1. DATABASE (Object-Based)
const FOOD_DATABASE = [
    // --- SPICY RELEASE (Anger, Rage) ---
    { name: "Spicy Chaat", strategy: "release", ingredients: ["potato", "chickpeas", "spices", "chutney"], minRequired: ["potato", "spices"] },
    { name: "Crispy Samosa", strategy: "release", ingredients: ["flour", "potato", "oil", "spices"], minRequired: ["flour", "potato", "oil"] },
    { name: "Hot Pakora", strategy: "release", ingredients: ["gram flour", "onion", "oil", "spices"], minRequired: ["gram flour", "oil"] },
    { name: "Chilli Paneer", strategy: "release", ingredients: ["paneer", "soy sauce", "chilli", "capsicum"], minRequired: ["paneer", "chilli"] },
    { name: "Masala Maggi", strategy: "release", ingredients: ["maggi", "water", "spices"], minRequired: ["maggi", "water"] },
    { name: "Cold Water (Cool Down)", strategy: "release", ingredients: ["water", "ice"], minRequired: ["water"] }, // Water option for Anger

    // --- CALMING WARMTH (Stress, Anxiety) ---
    { name: "Masala Chai", strategy: "calm", ingredients: ["milk", "water", "tea", "ginger", "sugar"], minRequired: ["water", "tea"] }, // Minimal chai
    { name: "Hot Vegetable Soup", strategy: "calm", ingredients: ["vegetables", "water", "salt", "pepper"], minRequired: ["water", "vegetables"] },
    { name: "Comforting Khichdi", strategy: "calm", ingredients: ["rice", "dal", "water", "turmeric"], minRequired: ["rice", "dal", "water"] },
    { name: "Warm Turmeric Milk", strategy: "calm", ingredients: ["milk", "turmeric", "sugar"], minRequired: ["milk", "turmeric"] },
    { name: "Warm Water", strategy: "calm", ingredients: ["water"], minRequired: ["water"] }, // Water option for Stress

    // --- COMFORT SEROTONIN (Sadness, Grief) ---
    { name: "Gajar Ka Halwa", strategy: "comfort", ingredients: ["carrot", "milk", "sugar", "ghee"], minRequired: ["carrot", "milk", "sugar"] },
    { name: "Sweet Kheer", strategy: "comfort", ingredients: ["rice", "milk", "sugar"], minRequired: ["rice", "milk"] },
    { name: "Warm Soup", strategy: "comfort", ingredients: ["vegetables", "water", "cream"], minRequired: ["vegetables", "water"] },
    { name: "Dal Rice", strategy: "comfort", ingredients: ["rice", "dal", "water"], minRequired: ["rice", "dal"] },
    { name: "Chocolate", strategy: "comfort", ingredients: ["chocolate", "cocoa"], minRequired: ["chocolate"] },

    // --- GROUNDING STABILITY (Confusion) ---
    { name: "Oats Porridge", strategy: "grounding", ingredients: ["oats", "milk", "water"], minRequired: ["oats", "water"] },
    { name: "Curd Rice", strategy: "grounding", ingredients: ["rice", "curd", "salt"], minRequired: ["rice", "curd"] },
    { name: "Banana Shake", strategy: "grounding", ingredients: ["banana", "milk"], minRequired: ["banana", "milk"] },
    { name: "Roasted Sweet Potato", strategy: "grounding", ingredients: ["sweet potato", "spices"], minRequired: ["sweet potato"] },
    { name: "Plain Water", strategy: "grounding", ingredients: ["water"], minRequired: ["water"] },

    // --- CELEBRATION FEAST (Joy) ---
    { name: "Vegetable Biryani", strategy: "celebration", ingredients: ["rice", "vegetables", "spices", "oil"], minRequired: ["rice", "spices"] },
    { name: "Make-shift Pizza", strategy: "celebration", ingredients: ["bread", "cheese", "sauce", "vegetables"], minRequired: ["bread", "cheese"] },
    { name: "Sweets (Mithai)", strategy: "celebration", ingredients: ["sugar", "milk", "flour"], minRequired: ["sugar"] },
    { name: "Fruit Salad", strategy: "celebration", ingredients: ["fruits", "sugar"], minRequired: ["fruits"] },

    // --- SENSORY RESET (Neutral/Disgust) ---
    { name: "Fresh Lime Soda", strategy: "reset", ingredients: ["lemon", "water", "sugar", "salt"], minRequired: ["lemon", "water"] },
    { name: "Fruit Chaat", strategy: "reset", ingredients: ["fruits", "chat masala"], minRequired: ["fruits"] },
    { name: "Cold Water", strategy: "reset", ingredients: ["water"], minRequired: ["water"] }
];

const STRATEGY_LABELS = {
    release: "Spicy Release",
    calm: "Calming Warmth",
    comfort: "Comfort & Serotonin",
    grounding: "Grounding Stability",
    celebration: "Celebration Feast",
    reset: "Sensory Reset"
};

const EMOTION_TO_STRATEGY = {
    anger: 'release', rage: 'release', frustration: 'release', disgust: 'reset',
    stress: 'calm', anxiety: 'calm', fear: 'calm', embarrassment: 'calm',
    sadness: 'comfort', grief: 'comfort', regret: 'comfort', disappointment: 'comfort', shame: 'comfort', guilt: 'comfort',
    confusion: 'grounding', uncertainty: 'grounding', surprise: 'grounding', curiosity: 'grounding', anticipation: 'celebration',
    joy: 'celebration', excitement: 'celebration', love: 'celebration', pride: 'celebration', gratitude: 'celebration', relief: 'celebration',
    neutral: 'reset'
};

// HELPER: Deterministic Hash
function getHash(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// HELPER: Ingredient Scoring
function scoreCandidate(candidate, userIngredients) {
    const userList = userIngredients.map(i => i.toLowerCase().trim());

    // 1. Check Min Required (Strict)
    const hasMin = candidate.minRequired.every(req =>
        userList.some(userItem => userItem.includes(req) || req.includes(userItem))
    );
    if (!hasMin) return 0;

    // 2. Score Overlap
    let matches = 0;
    candidate.ingredients.forEach(ing => {
        if (userList.some(userItem => userItem.includes(ing) || ing.includes(userItem))) {
            matches++;
        }
    });

    return matches / candidate.ingredients.length;
}

export function getFoodSuggestion(emotion, userInput, ingredientsString = "") {
    const strategyKey = EMOTION_TO_STRATEGY[emotion] || 'reset';
    const label = STRATEGY_LABELS[strategyKey];

    // Parse Fridge Input
    const userIngredients = ingredientsString.split(',').filter(s => s.trim().length > 0);
    const hasIngredients = userIngredients.length > 0;

    // Step 1: Filter by Strategy
    const strategyCandidates = FOOD_DATABASE.filter(f => f.strategy === strategyKey);

    // Step 2: Fridge Logic
    let finalCandidates = strategyCandidates;
    let method = "Universal Fallback";

    if (hasIngredients) {
        // Special Case: "Water Only"
        if (userIngredients.length === 1 && userIngredients[0].toLowerCase().includes('water')) {
            // Find water-specific option in this strategy
            const waterOption = strategyCandidates.find(f => f.ingredients.length === 1 && f.ingredients.includes('water'));
            // If found (e.g. Cold Water for Anger), use it. Else, fall back to general universal.
            if (waterOption) {
                finalCandidates = [waterOption];
                method = "Water Logic";
            }
        } else {
            // Standard MinRequired Logic
            const scored = strategyCandidates.map(f => ({
                food: f,
                score: scoreCandidate(f, userIngredients)
            })).filter(x => x.score > 0); // Must satisfy minRequired

            if (scored.length > 0) {
                // Return best matches
                scored.sort((a, b) => b.score - a.score);
                finalCandidates = scored.map(x => x.food);
                method = "Fridge Match";
            }
        }
    }

    // Step 3: Deterministic Selection
    // If multiple candidates tied or existing, pick one deterministically
    const hash = getHash(userInput + (ingredientsString || ""));
    const index = hash % finalCandidates.length;
    const mainFood = finalCandidates[index];

    // Get related from the SAME final pool if possible, else from strategy
    const related = strategyCandidates.filter(f => f.name !== mainFood.name).slice(0, 3).map(f => f.name);

    return {
        strategyLabel: label,
        suggestedFood: mainFood.name,
        otherSuggestions: related,
        sourceMethod: method // for debug
    };
}
