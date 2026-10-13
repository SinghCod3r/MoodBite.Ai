/**
MoodBite.AI — Mood-Based Food Recommendation System
Copyright (c) 2026 Ayush Singh
Contact: ayushsinghceee@gmail.com
Project: https://github.com/SinghCod3r/MoodBite.Ai
This file is part of MoodBite.AI.
See the LICENSE file for terms of use.
*/

import { motion } from 'framer-motion';





export default function MoodRadar({ vector }) {

    const v = vector || { valence: 0, arousal: 0, control: 0.5, certainty: 0.5 };


    const center = 100;
    const maxR = 80;


    const r1 = Math.min(Math.max(v.arousal * maxR, 20), maxR);


    const r2 = Math.min(Math.max(v.control * maxR, 20), maxR);


    const normValence = (v.valence + 1) / 2;
    const r3 = Math.min(Math.max(normValence * maxR, 20), maxR);


    const r4 = Math.min(Math.max(v.certainty * maxR, 20), maxR);


    const p1 = `${center},${center - r1}`;
    const p2 = `${center + r3},${center}`;
    const p3 = `${center},${center + r2}`;
    const p4 = `${center - r4},${center}`;

    const points = `${p1} ${p2} ${p3} ${p4}`;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h3 className="text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">EVM Brain</h3>
            <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-80">

                <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.1)" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" />


                <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.1)" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.1)" />


                <text x="100" y="15" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">AROUSAL</text>
                <text x="190" y="105" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">VALENCE</text>
                <text x="100" y="195" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">CONTROL</text>
                <text x="10" y="105" textAnchor="middle" fill="#fff" fontSize="10" className="opacity-50">CERTAINTY</text>


                <motion.polygon
                    points={points}
                    fill="rgba(99, 102, 241, 0.5)"
                    stroke="rgba(129, 140, 248, 1)"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ points: points, scale: 1 }}
                    transition={{ type: "spring", stiffness: 50 }}
                />
            </svg>
        </div>
    );
}
