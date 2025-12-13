import { motion } from 'framer-motion';

const gradients = {
    anger: "bg-gradient-to-br from-red-900 via-rose-900 to-black",
    stress: "bg-gradient-to-br from-indigo-900 via-slate-900 to-black", // Calm blue/indigo for stress relief focus or dark pressure? Let's go Deep Indigo.
    joy: "bg-gradient-to-br from-orange-400 via-amber-600 to-black",
    sadness: "bg-gradient-to-br from-teal-900 via-emerald-900 to-black",
    fear: "bg-gradient-to-br from-violet-900 via-purple-900 to-black",
    neutral: "bg-gradient-to-br from-gray-900 via-slate-900 to-black",
    mixed: "bg-gradient-to-br from-fuchsia-900 via-pink-900 to-black"
};

export default function MoodBackground({ mood }) {
    const activeGradient = gradients[mood] || gradients['neutral'];

    return (
        <motion.div
            key={mood}
            className={`fixed inset-0 w-full h-full -z-50 ${activeGradient}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* Ambient Orbs for Fluidity */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[120px]" />
        </motion.div>
    );
}
