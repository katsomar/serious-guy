import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
    onProposalShow: () => void;
    accepted: boolean;
    startTimer: boolean;
}

const HeroSection: React.FC<HeroProps> = ({ onProposalShow, accepted, startTimer }) => {
    const [showHint, setShowHint] = useState(false);

    const [currentBg, setCurrentBg] = useState(0);
    const backgroundImages = [
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=2560&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511285560982-1351c4f6305b?q=80&w=2560&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=2560&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2560&auto=format&fit=crop"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!startTimer) return;

        const timer = setTimeout(() => {
            onProposalShow();
        }, 6000); // 6s after timer starts (which is after loader)
        return () => clearTimeout(timer);
    }, [onProposalShow, startTimer]);

    useEffect(() => {
        if (accepted) {
            setTimeout(() => setShowHint(true), 2000);
        }
    }, [accepted]);

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Parallax Background Slideshow */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentBg}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
                            style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
                        />
                        <div className="absolute inset-0 bg-black/60" /> {/* Darkened Overlay */}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl px-6">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-9xl font-display text-white drop-shadow-[0_0_15px_rgba(255,77,109,0.8)] leading-tight tracking-wider"
                >
                    Happy Valentine's
                    <br className="md:hidden" />
                    <span className="block mt-4 text-rose-300">My Love ❤️</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1.5 }}
                    className="mt-8 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                />
            </div>

            {/* Scroll Hint */}
            <AnimatePresence>
                {accepted && showHint && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 1 }}
                        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 cursor-pointer z-20 text-white"
                    >
                        <p className="text-lg font-light tracking-widest uppercase opacity-80 animate-pulse">
                            Scroll down my love...
                        </p>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <ChevronDown size={32} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default HeroSection;
