import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock } from 'lucide-react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const CountdownTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const targetDate = new Date('2026-02-14T00:00:00').getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                setIsReady(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, []);

    if (isReady) {
        return null; // Allow access to website
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-rose-900 via-plum-900 to-rose-900 overflow-hidden">
            {/* Floating hearts background */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-rose-400/20"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 100
                    }}
                    animate={{
                        y: -100,
                        x: Math.random() * window.innerWidth
                    }}
                    transition={{
                        duration: Math.random() * 8 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                >
                    <Heart size={Math.random() * 40 + 20} fill="currentColor" />
                </motion.div>
            ))}

            <div className="relative z-10 w-full max-w-4xl px-6 text-center">
                {/* Animated Heart */}
                <motion.div
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                        repeat: Infinity, 
                        duration: 3,
                        ease: "easeInOut"
                    }}
                    className="flex justify-center mb-8"
                >
                    <Heart size={120} fill="#ff4d6d" className="text-rose-500 drop-shadow-2xl" />
                </motion.div>

                {/* Main Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-4 drop-shadow-lg">
                        Something Special Awaits... 💕
                    </h1>
                    <p className="text-xl md:text-2xl text-rose-200/80 font-sans mb-12">
                        A heartfelt surprise is coming your way on Valentine's Day
                    </p>
                </motion.div>

                {/* Countdown Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12"
                >
                    {[
                        { label: 'Days', value: timeLeft.days, icon: Calendar },
                        { label: 'Hours', value: timeLeft.hours, icon: Clock },
                        { label: 'Minutes', value: timeLeft.minutes, icon: Clock },
                        { label: 'Seconds', value: timeLeft.seconds, icon: Clock }
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl"
                        >
                            <item.icon className="mx-auto mb-2 text-rose-300" size={24} />
                            <div className="text-5xl md:text-6xl font-bold text-white mb-2 font-mono">
                                {String(item.value).padStart(2, '0')}
                            </div>
                            <div className="text-sm md:text-base text-rose-200/70 uppercase tracking-wider font-sans">
                                {item.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Target Date Display */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="space-y-4"
                >
                    <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 shadow-xl">
                        <p className="text-lg md:text-xl text-rose-200 font-sans">
                            <Calendar className="inline mr-2" size={20} />
                            Unlocks: <span className="font-bold text-white">February 14, 2026 • Midnight</span>
                        </p>
                    </div>

                    <p className="text-base md:text-lg text-rose-300/60 italic font-serif">
                        The wait will be worth it, I promise 💖
                    </p>
                </motion.div>

                {/* Decorative hearts */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="flex justify-center gap-4 text-4xl mt-12 animate-pulse"
                >
                    <span>💖</span>
                    <span>💝</span>
                    <span>💗</span>
                    <span>💕</span>
                </motion.div>
            </div>
        </div>
    );
};

export default CountdownTimer;
