import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Heart } from 'lucide-react';

const MobileBlocker: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            // Tablet breakpoint is 768px (md in Tailwind)
            setIsMobile(window.innerWidth < 768);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return (
        <AnimatePresence>
            {isMobile && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-rose-900 via-plum-900 to-rose-900 p-6"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl text-center"
                    >
                        {/* Animated Heart */}
                        <motion.div
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 2,
                                ease: "easeInOut"
                            }}
                            className="flex justify-center mb-6"
                        >
                            <Heart 
                                size={64} 
                                fill="#ff4d6d" 
                                className="text-rose-500 drop-shadow-lg" 
                            />
                        </motion.div>

                        {/* Main Message */}
                        <h2 className="text-3xl md:text-4xl font-display text-white mb-4 drop-shadow-md">
                            Hey My Love! 💕
                        </h2>

                        <p className="text-rose-100/90 text-lg font-sans mb-6 leading-relaxed">
                            This special experience is best viewed on a larger screen to capture all the love and magic I've put into it.
                        </p>

                        {/* Monitor Icon */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ 
                                repeat: Infinity, 
                                duration: 2,
                                ease: "easeInOut"
                            }}
                            className="flex justify-center mb-6"
                        >
                            <Monitor size={48} className="text-rose-300" />
                        </motion.div>

                        <p className="text-rose-200/80 text-base font-sans font-semibold">
                            Please open this on your laptop or tablet ✨
                        </p>

                        {/* Decorative hearts */}
                        <div className="mt-8 flex justify-center gap-2 text-2xl opacity-60">
                            <span>💖</span>
                            <span>💝</span>
                            <span>💗</span>
                        </div>
                    </motion.div>

                    {/* Floating hearts background */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-rose-400/20 pointer-events-none"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: window.innerHeight + 50
                            }}
                            animate={{
                                y: -50,
                                x: Math.random() * window.innerWidth
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 3
                            }}
                        >
                            <Heart size={Math.random() * 20 + 15} fill="currentColor" />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileBlocker;
