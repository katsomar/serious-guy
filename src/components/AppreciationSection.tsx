import React from 'react';
import { motion } from 'framer-motion';

const AppreciationSection: React.FC = () => {
    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-t from-rose-900 via-rose-800 to-rose-900 text-center px-6 md:px-8 overflow-hidden relative py-20">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-400/20 via-transparent to-transparent opacity-50 blur-3xl" />

            {/* Decorative Hearts - Top Left Corner */}
            <div className="absolute top-10 left-10 opacity-10 pointer-events-none">
                <svg width="150" height="150" viewBox="0 0 100 100" className="text-pink-400">
                    <path d="M50,30 C50,20 30,10 20,20 C10,30 10,40 20,50 L50,80 L80,50 C90,40 90,30 80,20 C70,10 50,20 50,30 Z" fill="currentColor"/>
                </svg>
            </div>

            {/* Decorative Hearts - Top Right Corner */}
            <div className="absolute top-20 right-20 opacity-10 pointer-events-none">
                <svg width="120" height="120" viewBox="0 0 100 100" className="text-pink-400">
                    <path d="M50,30 C50,20 30,10 20,20 C10,30 10,40 20,50 L50,80 L80,50 C90,40 90,30 80,20 C70,10 50,20 50,30 Z" fill="currentColor"/>
                </svg>
            </div>

            {/* Decorative Hearts - Bottom Left Corner */}
            <div className="absolute bottom-20 left-16 opacity-10 pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 100 100" className="text-pink-400">
                    <path d="M50,30 C50,20 30,10 20,20 C10,30 10,40 20,50 L50,80 L80,50 C90,40 90,30 80,20 C70,10 50,20 50,30 Z" fill="currentColor"/>
                </svg>
            </div>

            {/* Decorative Hearts - Bottom Right Corner */}
            <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none">
                <svg width="180" height="180" viewBox="0 0 100 100" className="text-pink-400">
                    <path d="M50,30 C50,20 30,10 20,20 C10,30 10,40 20,50 L50,80 L80,50 C90,40 90,30 80,20 C70,10 50,20 50,30 Z" fill="currentColor"/>
                </svg>
            </div>

            {/* Small Scattered Hearts in Background */}
            <div className="absolute top-1/4 left-1/4 opacity-8 pointer-events-none">
                <svg width="60" height="60" viewBox="0 0 100 100" className="text-pink-300">
                    <path d="M50,30 C50,20 30,10 20,20 C10,30 10,40 20,50 L50,80 L80,50 C90,40 90,30 80,20 C70,10 50,20 50,30 Z" fill="currentColor"/>
                </svg>
            </div>

            <div className="absolute top-2/3 right-1/3 opacity-8 pointer-events-none">
                <svg width="70" height="70" viewBox="0 0 100 100" className="text-pink-300">
                    <path d="M50,30 C50,20 30,10 20,20 C10,30 10,40 20,50 L50,80 L80,50 C90,40 90,30 80,20 C70,10 50,20 50,30 Z" fill="currentColor"/>
                </svg>
            </div>

            <div className="absolute bottom-1/3 left-2/3 opacity-8 pointer-events-none">
                <svg width="50" height="50" viewBox="0 0 100 100" className="text-pink-300">
                    <path d="M50,30 C50,20 30,10 20,20 C10,30 10,40 20,50 L50,80 L80,50 C90,40 90,30 80,20 C70,10 50,20 50,30 Z" fill="currentColor"/>
                </svg>
            </div>

            {/* Rose/Flower Designs - Corners */}
            <div className="absolute top-32 right-32 opacity-8 pointer-events-none">
                <svg width="100" height="100" viewBox="0 0 100 100" className="text-rose-400">
                    <circle cx="50" cy="50" r="8" fill="currentColor"/>
                    <circle cx="50" cy="35" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="65" cy="50" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="50" cy="65" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="35" cy="50" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="42" cy="42" r="10" fill="currentColor" opacity="0.5"/>
                    <circle cx="58" cy="42" r="10" fill="currentColor" opacity="0.5"/>
                    <circle cx="42" cy="58" r="10" fill="currentColor" opacity="0.5"/>
                    <circle cx="58" cy="58" r="10" fill="currentColor" opacity="0.5"/>
                </svg>
            </div>

            <div className="absolute bottom-32 left-32 opacity-8 pointer-events-none">
                <svg width="90" height="90" viewBox="0 0 100 100" className="text-rose-400">
                    <circle cx="50" cy="50" r="8" fill="currentColor"/>
                    <circle cx="50" cy="35" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="65" cy="50" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="50" cy="65" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="35" cy="50" r="12" fill="currentColor" opacity="0.7"/>
                    <circle cx="42" cy="42" r="10" fill="currentColor" opacity="0.5"/>
                    <circle cx="58" cy="42" r="10" fill="currentColor" opacity="0.5"/>
                    <circle cx="42" cy="58" r="10" fill="currentColor" opacity="0.5"/>
                    <circle cx="58" cy="58" r="10" fill="currentColor" opacity="0.5"/>
                </svg>
            </div>

            {/* Infinity Symbol - Center sides */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-8 pointer-events-none">
                <svg width="120" height="60" viewBox="0 0 200 100" className="text-pink-400">
                    <path d="M30,50 Q50,20 70,50 T110,50 Q130,80 150,50 Q170,20 150,50 T110,50 Q90,80 70,50 Q50,80 30,50 Z" fill="none" stroke="currentColor" strokeWidth="8"/>
                </svg>
            </div>

            <div className="absolute right-5 top-1/2 -translate-y-1/2 opacity-8 pointer-events-none">
                <svg width="120" height="60" viewBox="0 0 200 100" className="text-pink-400">
                    <path d="M30,50 Q50,20 70,50 T110,50 Q130,80 150,50 Q170,20 150,50 T110,50 Q90,80 70,50 Q50,80 30,50 Z" fill="none" stroke="currentColor" strokeWidth="8"/>
                </svg>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="max-w-5xl mx-auto z-10 space-y-8"
            >
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-display text-white drop-shadow-[0_0_15px_rgba(255,182,193,0.5)] leading-tight mb-6"
                >
                    My Dearest Love ❤️
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="space-y-6 text-rose-100/95"
                >
                    <p className="text-lg md:text-2xl font-sans leading-relaxed">
                        Words cannot fully express how incredibly blessed I feel to have you in my life.
                        You are not just my partner, but my best friend, my confidant and my safe haven. 
                        Every moment with you is a treasure I hold close to my heart.
                    </p>

                    <p className="text-lg md:text-2xl font-sans leading-relaxed">
                        Your smile lights up my darkest days, your laughter is my favorite melody,
                        and your love gives me strength beyond measure. You've shown me what it means
                        to be truly seen, understood, and cherished. With you, I've discovered a love
                        so pure and beautiful that it takes my breath away.
                    </p>

                    <p className="text-lg md:text-2xl font-sans leading-relaxed">
                        Thank you for choosing me, for believing in us, and for making every day feel
                        like a beautiful adventure.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="pt-8"
                >
                    <p className="text-2xl md:text-4xl font-display text-rose-300 italic drop-shadow-lg">
                        You are my everything, today and always. 💕✨
                    </p>
                </motion.div>

                {/* Decorative hearts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 1 }}
                    className="flex justify-center gap-4 text-3xl mt-8"
                >
                    <span className="animate-pulse">💖</span>
                    <span className="animate-pulse delay-100">💝</span>
                    <span className="animate-pulse delay-200">💗</span>
                    <span className="animate-pulse delay-300">💕</span>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default AppreciationSection;
