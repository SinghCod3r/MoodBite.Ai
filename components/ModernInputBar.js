// components/ModernInputBar.js
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Textarea from 'react-textarea-autosize';

export default function ModernInputBar({
    textInput,
    setTextInput,
    ingredientsInput,
    setIngredientsInput,
    handleChatSubmit,
    handleVoiceClick,
    assistantState,
    isLoading
}) {
    const [showFridge, setShowFridge] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const fileInputRef = useRef(null);

    // Helpers for Tag System
    const getTags = () => ingredientsInput ? ingredientsInput.split(',').filter(t => t.trim()) : [];

    const addTag = (tag) => {
        const current = getTags();
        if (!current.includes(tag.trim())) {
            const newList = [...current, tag.trim()];
            if (setIngredientsInput) setIngredientsInput(newList.join(', '));
        }
    };

    const removeTag = (tagToRemove) => {
        const current = getTags();
        const newList = current.filter(t => t !== tagToRemove);
        if (setIngredientsInput) setIngredientsInput(newList.join(', '));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = e.target.value.trim();
            if (val) {
                addTag(val);
                e.target.value = '';
            }
        }
    };

    // Image & Vision Logic
    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // 1. Previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);

        setIsScanning(true);
        setShowFridge(true); // Open fridge panel

        // 2. Convert to Base64
        const base64Promises = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });
        const base64Images = await Promise.all(base64Promises);

        // 3. Call Vision API
        try {
            const res = await fetch('/api/detectIngredients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images: base64Images })
            });
            const data = await res.json();

            if (data.ingredients) {
                // Add detected ingredients safely
                const current = getTags();
                const combined = [...new Set([...current, ...data.ingredients])];
                setIngredientsInput(combined.join(', '));
            }
        } catch (err) {
            console.error("Vision failed", err);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <form onSubmit={handleChatSubmit} className="relative w-full max-w-2xl mx-auto z-50">
            <div className="relative flex flex-col border border-white/20 rounded-3xl bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300">

                {/* 1. VISION PREVIEW STRIP */}
                <AnimatePresence>
                    {(previewImages.length > 0 || isScanning) && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-black/40 border-b border-white/10 p-3 flex gap-3 overflow-x-auto"
                        >
                            {previewImages.map((src, i) => (
                                <div key={i} className="relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-white/20">
                                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            ))}
                            {isScanning && (
                                <div className="flex items-center justify-center w-16 h-16 rounded-lg border border-white/20 bg-white/5 animate-pulse">
                                    <span className="text-xl">👁️</span>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 2. FRIDGE / PANTRY PANEL (Collapsible) */}
                <AnimatePresence>
                    {showFridge && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="bg-black/20 border-b border-white/5 px-4 py-3"
                        >
                            <label className="text-[10px] uppercase tracking-widest text-indigo-300 mb-2 block font-bold">
                                🧊 In Your Fridge
                            </label>

                            {/* Chips Container */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {getTags().map(tag => (
                                    <span key={tag} className="flex items-center text-xs bg-indigo-500/20 text-indigo-200 border border-indigo-500/30 px-2 py-1 rounded-md">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 hover:text-white"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                                {isScanning && <span className="text-xs text-gray-500 animate-pulse">Detecting...</span>}
                            </div>

                            {/* Manual Entry */}
                            <input
                                type="text"
                                className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-600 focus:outline-none"
                                placeholder="Type item + Enter (e.g. eggs)"
                                onKeyDown={handleKeyDown}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 3. MAIN INPUT */}
                <Textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none px-6 py-5 resize-none text-lg"
                    placeholder={assistantState === 'listening' ? "Listening..." : "Tell me how you're feeling..."}
                    disabled={isLoading}
                    minRows={1}
                    maxRows={5}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleChatSubmit(e);
                        }
                    }}
                />

                {/* 4. ACTIONS TOOLBAR */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-white/5">
                    <div className="flex items-center gap-1">

                        {/* A. Image Upload (Vision) */}
                        <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 rounded-full hover:bg-white/10 text-gray-400 transition-colors" title="Scan Fridge">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {/* B. Manual Fridge Toggle */}
                        <button type="button" onClick={() => setShowFridge(!showFridge)} className={`p-2 rounded-full transition-colors ${showFridge ? 'text-indigo-400 bg-indigo-500/10' : 'text-gray-400 hover:bg-white/10'}`} title="Pantry">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> {/* Simulating 'chef' or 'user' icon for pantry, or keeping ice cube */}
                            {/* Let's fallback to standard 'List' icon for pantry if ice cube is confusing, but user liked 🧊. I'll stick to a Box icon for pantry */}
                            {/* <svg ... path d="M12 3v18..." /> */}
                        </button>

                        {/* C. Voice */}
                        <button type="button" onClick={handleVoiceClick} className={`p-2 rounded-full transition-colors ${assistantState === 'listening' ? 'bg-red-500/20 text-red-500' : 'text-gray-400 hover:bg-white/10'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
                        </button>
                    </div>

                    {/* D. Send */}
                    <button type="submit" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/50 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!textInput.trim() || isLoading}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22,2 15,22 11,13 2,9" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    );
}
