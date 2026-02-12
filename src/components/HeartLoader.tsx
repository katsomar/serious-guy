import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Volume2 } from 'lucide-react';

interface LoaderProps {
    onFinish: () => void;
    onUnmuteClick?: () => void;
}

const HeartLoader: React.FC<LoaderProps> = ({ onFinish, onUnmuteClick }) => {
    const [complete, setComplete] = useState(false);

    useEffect(() => {
        // Wait out the animation
        const timer = setTimeout(() => {
            setComplete(true);
            setTimeout(() => {
                onFinish();
            }, 1000); // 1s buffer for exit anim
        }, 5000);
        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {!complete && (
                <motion.div
                    key="loader"
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-rose-900 via-rose-800 to-rose-900 text-white overflow-hidden"
                >
                    {/* Floating particle text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6"
                    >
                        {/* Pulsing Heart */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                filter: ["drop-shadow(0 0 10px rgba(255, 77, 109, 0.5))", "drop-shadow(0 0 30px rgba(255, 77, 109, 0.8))", "drop-shadow(0 0 10px rgba(255, 77, 109, 0.5))"]
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <Heart size={100} fill="#ff4d6d" stroke="none" className="text-rose-500" />
                        </motion.div>

                        {/* Loading text */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1.5 }}
                            className="text-3xl font-serif tracking-widest text-rose-100/90"
                        >
                            Loading love...
                        </motion.h1>

                        {/* Audio Unmute Prompt - Now Clickable */}
                        <motion.button
                            onClick={onUnmuteClick}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="mt-8 flex flex-col items-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl max-w-sm cursor-pointer hover:bg-white/20 hover:border-rose-300/50 transition-all"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <Volume2 size={32} className="text-rose-300" />
                            </motion.div>
                            <p className="text-rose-100 text-center text-sm md:text-base font-sans">
                                Click here to <span className="font-bold text-rose-300">unmute</span> and enjoy the music 🎵
                            </p>
                        </motion.button>
                    </motion.div>

                    {/* Random floating mini-hearts */}
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-rose-400/20"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: window.innerHeight + 100,
                                scale: Math.random() * 0.5 + 0.5
                            }}
                            animate={{
                                y: -100,
                                x: Math.random() * window.innerWidth
                            }}
                            transition={{
                                duration: Math.random() * 5 + 3, // 3-8s
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "linear"
                            }}
                        >
                            <Heart size={Math.random() * 30 + 10} fill="currentColor" />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HeartLoader;
