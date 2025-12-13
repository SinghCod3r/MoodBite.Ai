// evm/weights.js
// Defines the "Ideal Vector" for each emotion
// Used for Dot Product similarity calculation in strategy.js

export const emotionWeights = {
    anger: { valence: -0.8, arousal: 0.8, control: 0.2 },
    stress: { valence: -0.6, arousal: 0.6, control: 0.1 },
    joy: { valence: 0.8, arousal: 0.6, control: 0.7 },
    sadness: { valence: -0.7, arousal: -0.4, control: 0.3 },
    fear: { valence: -0.6, arousal: 0.8, control: 0.1 },
    calm: { valence: 0.6, arousal: -0.5, control: 0.8 },
    neutral: { valence: 0.1, arousal: 0.1, control: 0.5 }
};
