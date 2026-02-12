import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProposalPopupProps {
    isOpen: boolean;
    onAccept: () => void;
    onReject?: () => void;
}

const ProposalPopup: React.FC<ProposalPopupProps> = ({ isOpen, onAccept }) => {
    const [noCount, setNoCount] = useState(0);
    const [yesScale, setYesScale] = useState(1);
    const [noScale, setNoScale] = useState(1);

    const handleNoClick = () => {
        if (noCount < 5) {
            setNoCount(prev => prev + 1);
            setNoScale(prev => prev * 0.8);
            setYesScale(prev => prev * 1.2);
        }
    };

    const handleYesClick = () => {
        // Elegant confetti rain from sides covering entire scrollable page
        const duration = 8000; // 8 seconds
        const animationEnd = Date.now() + duration;
        const defaults = { 
            startVelocity: 25, // Medium speed
            spread: 50, 
            ticks: 600, // Much longer fall time to reach bottom of page
            zIndex: 9999,
            colors: ['#ff4d6d', '#ffd166', '#c9184a', '#ff6b9d', '#fff0f3', '#ffb3c1'],
            gravity: 0.3, // Very slow fall to travel entire page
            drift: 0.5, // Slight horizontal drift
            scalar: 1.5, // Moderate particle size
            disableForReducedMotion: false
        };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        // Continuous gentle rain from top sides
        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 25; // Steady stream

            // Rain from left side (top of viewport)
            confetti({
                ...defaults,
                particleCount,
                origin: { 
                    x: randomInRange(0, 0.2), // Far left side
                    y: 0 // Top of viewport
                },
                angle: 80, // Slight angle inward
                spread: 35
            });

            // Rain from right side (top of viewport)
            confetti({
                ...defaults,
                particleCount,
                origin: { 
                    x: randomInRange(0.8, 1), // Far right side
                    y: 0 // Top of viewport
                },
                angle: 100, // Slight angle inward
                spread: 35
            });

            // Center rain
            confetti({
                ...defaults,
                particleCount: 15,
                origin: { 
                    x: randomInRange(0.4, 0.6), // Center
                    y: 0 
                },
                angle: 90, // Straight down
                spread: 25
            });

        }, 120); // Frequent for continuous effect

        // Initial celebration burst from sides
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                // Left side burst
                confetti({
                    ...defaults,
                    particleCount: 60,
                    origin: { x: 0.1, y: 0.2 },
                    angle: 70,
                    spread: 45,
                    startVelocity: 30,
                    scalar: 1.8
                });
                
                // Right side burst
                confetti({
                    ...defaults,
                    particleCount: 60,
                    origin: { x: 0.9, y: 0.2 },
                    angle: 110,
                    spread: 45,
                    startVelocity: 30,
                    scalar: 1.8
                });

                // Center burst
                confetti({
                    ...defaults,
                    particleCount: 40,
                    origin: { x: 0.5, y: 0.15 },
                    angle: 90,
                    spread: 60,
                    startVelocity: 35,
                    scalar: 2
                });
            }, i * 300);
        }

        // Gentle cascading curtain effect
        const cascadeInterval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) {
                return clearInterval(cascadeInterval);
            }

            // Create curtain effect from top across entire width
            for (let x = 0; x <= 1; x += 0.15) {
                setTimeout(() => {
                    confetti({
                        ...defaults,
                        particleCount: 12,
                        origin: { x, y: 0 },
                        angle: 90,
                        spread: 20,
                        startVelocity: 20
                    });
                }, x * 80);
            }
        }, 600);

        onAccept();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-[90%] md:w-[500px] p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl flex flex-col items-center gap-6 text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Heart size={64} fill="#ff4d6d" className="text-rose-500 drop-shadow-lg" />
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl font-display text-white drop-shadow-md">
                            Will you be my Valentine?
                        </h2>

                        <p className="text-rose-100/80 text-lg font-sans">
                            {noCount === 0 ? "Be mine?" :
                                noCount === 1 ? "Are you sure? 😢" :
                                    noCount === 2 ? "Pretty please? 🥺" :
                                        noCount === 3 ? "Don't break my heart! 💔" :
                                            "I'm gonna cry... 😭"}
                        </p>

                        <div className="flex items-center gap-6 mt-4 w-full justify-center relative min-h-[100px]">
                            {/* YES Button */}
                            <motion.button
                                layout
                                whileHover={{ scale: yesScale * 1.1 }}
                                whileTap={{ scale: yesScale * 0.9 }}
                                animate={{ scale: yesScale }}
                                onClick={handleYesClick}
                                className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-full shadow-lg transition-colors flex items-center gap-2 z-10"
                            >
                                YES 💖
                            </motion.button>

                            {/* NO Button */}
                            {noCount < 5 && (
                                <motion.button
                                    layout
                                    whileHover={{ scale: noScale * 1.1 }}
                                    whileTap={{ scale: noScale * 0.9 }}
                                    animate={{ scale: noScale, opacity: 1 }}
                                    onClick={handleNoClick}
                                    className="px-8 py-3 bg-gray-500/50 hover:bg-gray-600/50 text-white/80 font-bold rounded-full shadow-lg transition-colors"
                                >
                                    NO 😢
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProposalPopup;
