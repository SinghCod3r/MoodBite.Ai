// pages/about.js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MoodBackground from '../components/MoodBackground';

export default function About() {
    return (
        <div className="relative min-h-screen w-full font-sans text-white bg-black selection:bg-indigo-500/30">
            {/* Background & Nav */}
            <MoodBackground mood="neutral" />
            <Navbar />

            <main className="relative z-10 pt-32 pb-20 px-4 md:px-0 max-w-4xl mx-auto space-y-16">

                {/* 1. INTRODUCTION */}
                <section className="text-center space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Understanding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">MoodBite.Ai</span>
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
                        MoodBite is an <strong>Offline-First Expert System</strong> designed to regulate emotions through culinary intervention.
                        Unlike generic AI wrappers, it uses a deterministic <strong>Emotional Vector Machine (EVM)</strong> to map linguistic signals to 28 specific emotional states, providing scientifically grounded food recommendations.
                    </p>

                    {/* WARNING BOX */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 max-w-2xl mx-auto flex items-start text-left gap-4">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <h4 className="text-red-200 font-bold text-sm uppercase tracking-wide">Disclaimer</h4>
                            <p className="text-sm text-red-200/70 mt-1">
                                No Mood Detection is Perfect. This system analyzes linguistic patterns and keyword intensity. It is not a clinical diagnostic tool and should not replace professional medical advice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. SYSTEM ARCHITECTURE */}
                <section className="space-y-8">
                    <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                        <span className="text-2xl">🛠️</span>
                        <h3 className="text-2xl font-light">System Architecture</h3>
                    </div>

                    {/* Diagram */}
                    <div className="relative p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden text-center">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative z-10">

                            {/* Input */}
                            <div className="bg-black/40 p-4 rounded-xl border border-white/10 w-full md:w-32">
                                <div className="text-xs text-gray-400 mb-1">User Input</div>
                                <div className="font-mono text-sm">&quot;I am furious&quot;</div>
                            </div>

                            <div className="text-gray-500 text-2xl rotate-90 md:rotate-0">→</div>

                            {/* Expert Panel */}
                            <div className="bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/30 w-full md:w-48">
                                <div className="text-xs text-indigo-300 mb-2 font-bold uppercase">Expert Panel</div>
                                <ul className="text-xs text-left space-y-1 text-gray-300">
                                    <li>• Direct Matcher</li>
                                    <li>• Conflict Physics</li>
                                    <li>• Lexicon Scorer</li>
                                    <li>• Context Analyst</li>
                                </ul>
                            </div>

                            <div className="text-gray-500 text-2xl rotate-90 md:rotate-0">→</div>

                            {/* The Judge */}
                            <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/30 w-full md:w-40 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
                                <div className="relative z-10">
                                    <div className="text-xs text-purple-300 mb-1 font-bold uppercase">The Judge</div>
                                    <div className="text-[10px] text-gray-400">EVM Vector Engine</div>
                                    <div className="mt-2 font-bold text-lg">ANGER</div>
                                </div>
                            </div>

                            <div className="text-gray-500 text-2xl rotate-90 md:rotate-0">→</div>

                            {/* Food Engine */}
                            <div className="bg-emerald-900/20 p-4 rounded-xl border border-emerald-500/30 w-full md:w-40">
                                <div className="text-xs text-emerald-300 mb-1 font-bold uppercase">Food Engine</div>
                                <div className="text-xs text-gray-300">&quot;Spicy Release&quot;</div>
                                <div className="mt-2 font-bold text-sm text-green-200">Spicy Chaat</div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* 3. TEST CASES */}
                <section className="space-y-8">
                    <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                        <span className="text-2xl">🧪</span>
                        <h3 className="text-2xl font-light">Verified Test Cases</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-4">Input</th>
                                    <th className="py-3 px-4">Detected Mood</th>
                                    <th className="py-3 px-4">Strategy</th>
                                    <th className="py-3 px-4">Suggestion</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300">&quot;I am absolutely furious!&quot;</td>
                                    <td className="py-3 px-4 text-red-300 font-bold">Anger</td>
                                    <td className="py-3 px-4 text-gray-400">Spicy Release</td>
                                    <td className="py-3 px-4">Spicy Chaat</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300">&quot;I have a huge exam tomorrow.&quot;</td>
                                    <td className="py-3 px-4 text-orange-300 font-bold">Stress (High)</td>
                                    <td className="py-3 px-4 text-gray-400">Calming Warmth</td>
                                    <td className="py-3 px-4">Masala Chai</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300">&quot;I just won the competition!&quot;</td>
                                    <td className="py-3 px-4 text-yellow-300 font-bold">Pride/Joy</td>
                                    <td className="py-3 px-4 text-gray-400">Celebration</td>
                                    <td className="py-3 px-4">Vegetable Biryani</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300">&quot;I miss my grandmother.&quot;</td>
                                    <td className="py-3 px-4 text-blue-300 font-bold">Grief</td>
                                    <td className="py-3 px-4 text-gray-400">Comfort</td>
                                    <td className="py-3 px-4">Gajar Ka Halwa</td>
                                </tr>
                                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-3 px-4 text-gray-300">&quot;I&apos;m completely lost in life.&quot;</td>
                                    <td className="py-3 px-4 text-gray-300 font-bold">Confusion</td>
                                    <td className="py-3 px-4 text-gray-400">Grounding</td>
                                    <td className="py-3 px-4">Oats Porridge</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <div className="pt-10">
                    <Footer />
                </div>
            </main>
        </div>
    );
}
