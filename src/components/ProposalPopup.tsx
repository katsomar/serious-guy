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
        const startTime = Date.now();
        const defaults = { 
            startVelocity: 25,
            spread: 50, 
            ticks: 600,
            zIndex: 9999,
            colors: ['#ff4d6d', '#ffd166', '#c9184a', '#ff6b9d', '#fff0f3', '#ffb3c1'],
            gravity: 0.3,
            drift: 0.5,
            scalar: 1.5,
            disableForReducedMotion: false
        };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        // Initial celebration burst from sides
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                confetti({
                    ...defaults,
                    particleCount: 60,
                    origin: { x: 0.1, y: 0.2 },
                    angle: 70,
                    spread: 45,
                    startVelocity: 30,
                    scalar: 1.8
                });
                
                confetti({
                    ...defaults,
                    particleCount: 60,
                    origin: { x: 0.9, y: 0.2 },
                    angle: 110,
                    spread: 45,
                    startVelocity: 30,
                    scalar: 1.8
                });

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

        // Continuous gentle rain - using requestAnimationFrame for better performance
        let animationFrameId: number;
        let lastRainTime = Date.now();
        let lastCascadeTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            
            if (elapsed >= duration) {
                // Stop animation
                return;
            }

            const now = Date.now();

            // Rain every 120ms
            if (now - lastRainTime >= 120) {
                lastRainTime = now;
                
                confetti({
                    ...defaults,
                    particleCount: 25,
                    origin: { 
                        x: randomInRange(0, 0.2),
                        y: 0
                    },
                    angle: 80,
                    spread: 35
                });

                confetti({
                    ...defaults,
                    particleCount: 25,
                    origin: { 
                        x: randomInRange(0.8, 1),
                        y: 0
                    },
                    angle: 100,
                    spread: 35
                });

                confetti({
                    ...defaults,
                    particleCount: 15,
                    origin: { 
                        x: randomInRange(0.4, 0.6),
                        y: 0 
                    },
                    angle: 90,
                    spread: 25
                });
            }

            // Cascade every 600ms
            if (now - lastCascadeTime >= 600) {
                lastCascadeTime = now;
                
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
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        // Cleanup after duration
        setTimeout(() => {
            cancelAnimationFrame(animationFrameId);
        }, duration);

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
