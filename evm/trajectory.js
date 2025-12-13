// evm/trajectory.js
// LEVEL 4: Session Flow Tracking

export function analyzeTrajectory(history) {
    if (!history || history.length < 2) return { trend: 'Stable', description: "Establishing baseline..." };

    const current = history[history.length - 1];
    const previous = history[history.length - 2];

    // Map emotions to intensity (Pseudo-Arousal)
    const intensity = {
        anger: 3, fear: 3,
        stress: 2, joy: 2,
        sadness: 1, neutral: 0, calm: -1
    };

    const diff = (intensity[current] || 0) - (intensity[previous] || 0);

    let trend = 'Stable';
    let description = "Your mood is steady.";

    if (diff > 0) {
        trend = 'Escalating';
        description = "Intensity is rising. Shifting to grounding foods.";
    } else if (diff < 0) {
        trend = 'De-escalating';
        description = "You are calming down. Good progress.";
    } else if (current === 'stress' && previous === 'stress') {
        trend = 'Chronic';
        description = "Prolonged high-stress detected.";
    }

    return { trend, description };
}
