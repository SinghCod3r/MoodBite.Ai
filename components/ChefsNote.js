import { motion } from 'framer-motion';

export default function ChefsNote({ reason, otherSuggestions, trajectory, explanation }) {

    // Helper for trend icon
    const getTrendIcon = (t) => {
        if (t === 'Escalating') return '📈';
        if (t === 'De-escalating') return '📉';
        return '➡️';
    };

    return (
        <motion.div
            className="h-full flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl space-y-6">

                {/* Section 1: The Why */}
                <div>
                    <h3 className="text-lg font-serif italic text-white/90 mb-2 border-b border-white/10 pb-2">&quot;The Chef&apos;s Logic&quot;</h3>
                    <p className="text-sm leading-relaxed text-gray-300 font-light">
                        {reason}
                    </p>
                </div>

                {/* Section 2: AI Insight (Level 4 & 6) */}
                {(trajectory || explanation) && (
                    <div className="bg-black/20 rounded-lg p-3">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center">
                            🧠 AI Insight
                        </h4>

                        {trajectory && (
                            <div className="flex items-center text-xs text-white mb-2">
                                <span className="mr-2 text-base">{getTrendIcon(trajectory.trend)}</span>
                                <span className="font-semibold">{trajectory.trend}: </span>
                                <span className="ml-1 opacity-70">{trajectory.description}</span>
                            </div>
                        )}

                        {explanation && (
                            <ul className="list-disc list-inside space-y-1">
                                {explanation.map((item, i) => (
                                    <li key={i} className="text-[10px] text-gray-400">{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {otherSuggestions && otherSuggestions.length > 0 && (
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Alternatives</h4>
                        <ul className="space-y-2">
                            {otherSuggestions.map((item, i) => (
                                <li key={i} className="text-sm text-gray-400 hover:text-white transition-colors cursor-default">
                                    • {item.food || item}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
