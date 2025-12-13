// evm/reasonEngine.js
// CORE: Explainable AI Generation

export function generateReason(emotion, strategyLabel, foodName, context) {
    // 1. CAUSE COMPONENT
    let cause = "Based on your emotional signals";
    if (context === 'academic') cause = "Given the academic pressure";
    if (context === 'professional') cause = "With the professional demands";
    if (context === 'fridge') cause = "Using your available ingredients";
    if (context === 'water_only') cause = "Since hydration is your only option"; // Optional bonus
    if (emotion === 'anger' || emotion === 'rage') cause = "Due to the high intensity conflict";
    if (emotion === 'stress') cause = "Sensing the overwhelming tension";

    // 2. EFFECT COMPONENT
    const effect = `, your system is in a state of ${emotion}.`;

    // 3. SOLUTION COMPONENT
    let solution = `"${foodName}" acts as a sensory intervention.`;

    if (strategyLabel.includes("Release")) {
        solution = `"${foodName}" provides the spicy kick needed to vent this pent-up energy.`;
    } else if (strategyLabel.includes("Calm")) {
        solution = `"${foodName}" offers the warmth and familiarity required to lower cortisol levels.`;
    } else if (strategyLabel.includes("Comfort")) {
        solution = `"${foodName}" triggers a serotonin release to gently lift your mood.`;
    } else if (strategyLabel.includes("Grounding")) {
        solution = `"${foodName}" helps stabilize your thoughts through dense, grounding nutrition.`;
    } else if (strategyLabel.includes("Celebration")) {
        solution = `"${foodName}" perfectly matches your high vibrations to celebrate this moment.`;
    }

    return `${cause}${effect} ${solution}`;
}
