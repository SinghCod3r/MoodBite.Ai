import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroFoodCard({ suggestedFood, feedbackHandler, source, confidence }) {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState(null);

    useEffect(() => {
        if (!suggestedFood) return;
        setLoading(true);
        // Reuse the image generation API
        fetch(`/api/generateFoodImage?foodName=${encodeURIComponent(suggestedFood)}`)
            .then(res => res.json())
            .then(data => {
                setImageUrl(data.imageUrl);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [suggestedFood]);

    const onFeedback = (type) => {
        setFeedback(type);
        if (feedbackHandler) feedbackHandler(type);
    };

    return (
        <motion.div
            className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 backdrop-blur-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
        >
            {/* Image Layer */}
            <div className="absolute inset-0 w-full h-full">
                {loading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900">
                        <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin" />
                    </div>
                ) : (
                    <img
                        src={imageUrl || "/api/placeholder/400/600"}
                        alt={suggestedFood}
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Modern Confidence Badge */}
                {confidence && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="absolute top-4 right-4 flex items-center space-x-2 bg-black/40 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-full shadow-lg"
                    >
                        <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)] ${confidence >= 85 ? 'bg-emerald-400' : confidence >= 70 ? 'bg-blue-400' : 'bg-amber-400'}`} />
                        <span className="text-xs font-semibold text-white tracking-wide">
                            {confidence}% Match
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Content Layer */}
            <div className="absolute bottom-0 w-full p-6 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold text-white mb-1 drop-shadow-md">{suggestedFood}</h2>
                <p className="text-xs text-gray-300 mb-6 uppercase tracking-widest">{source || "AI Chef"}</p>

                {/* Glassmorphic Feedback Bar */}
                <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                    <button
                        onClick={() => onFeedback('good')}
                        className={`text-2xl transition hover:scale-125 ${feedback === 'good' ? 'text-green-400' : 'text-white/60 hover:text-white'}`}
                    >
                        👍
                    </button>
                    <div className="w-px h-6 bg-white/20" />
                    <button
                        onClick={() => onFeedback('bad')}
                        className={`text-2xl transition hover:scale-125 ${feedback === 'bad' ? 'text-red-400' : 'text-white/60 hover:text-white'}`}
                    >
                        👎
                    </button>
                </div>

                {feedback && <p className="text-[10px] text-green-300 mt-2">Thanks for your feedback!</p>}
            </div>
        </motion.div>
    );
}
