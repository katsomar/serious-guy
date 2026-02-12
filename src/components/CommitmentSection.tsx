import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
    "/images/5.jpeg",
    "/images/6.jpeg",
];

const CommitmentSection: React.FC = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [backgroundImages, setBackgroundImages] = useState<number[]>([]);

    // Auto-rotate images every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => {
                const next = (prev + 1) % images.length;
                console.log('Changing image from', prev, 'to', next);
                return next;
            });
        }, 4000);
        
        return () => clearInterval(timer);
    }, []);

    // Background floating images effect
    useEffect(() => {
        const spawnBackgroundImage = () => {
            const numImages = Math.random() > 0.5 ? 2 : 1; // Sometimes 1, sometimes 2
            const newIndices: number[] = [];
            
            for (let i = 0; i < numImages; i++) {
                const randomIndex = Math.floor(Math.random() * images.length);
                newIndices.push(randomIndex);
            }
            
            setBackgroundImages(newIndices);
            
            // Clear after duration
            setTimeout(() => {
                setBackgroundImages([]);
            }, 12000); // 12 seconds display time
        };

        // Initial spawn
        spawnBackgroundImage();

        // Spawn at intervals (8-12 seconds)
        const interval = setInterval(() => {
            spawnBackgroundImage();
        }, Math.random() * 4000 + 8000); // Random between 8-12 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            className="relative min-h-screen w-full flex items-center justify-center bg-black/5 overflow-hidden py-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Floating Background Images - Appearing and Disappearing at Random Points */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <AnimatePresence>
                    {backgroundImages.map((imgIndex, i) => {
                        // Random start and end positions anywhere in the section
                        const startX = Math.random() * window.innerWidth;
                        const startY = Math.random() * window.innerHeight;
                        const endX = Math.random() * window.innerWidth;
                        const endY = Math.random() * window.innerHeight;
                        
                        return (
                            <motion.div
                                key={`bg-${Date.now()}-${i}`}
                                initial={{ 
                                    opacity: 0,
                                    x: startX,
                                    y: startY,
                                    scale: 0.4,
                                    rotate: (Math.random() - 0.5) * 20
                                }}
                                animate={{ 
                                    opacity: [0, 0.4, 0.4, 0.4, 0], // Fade in, stay, fade out
                                    x: endX, // Move to random end position
                                    y: endY,
                                    scale: 0.7,
                                    rotate: (Math.random() - 0.5) * 15
                                }}
                                exit={{ opacity: 0, scale: 0.3 }}
                                transition={{ 
                                    duration: 18, // Slow, smooth movement
                                    ease: "linear",
                                    opacity: { duration: 18, ease: "easeInOut" }
                                }}
                                className="absolute"
                                style={{
                                    width: `${Math.random() * 150 + 250}px`,
                                    height: `${Math.random() * 150 + 350}px`,
                                    filter: 'blur(0.5px) grayscale(15%)'
                                }}
                            >
                                <img
                                    src={images[imgIndex]}
                                    alt="Background"
                                    className="w-full h-full object-cover rounded-3xl"
                                    style={{ opacity: 0.6 }}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center z-10">

                {/* Left Image - Angled with Auto-rotation */}
                <motion.div
                    style={{ x: -100, rotate: -6 }}
                    animate={{
                        x: isHovered ? -400 : -100,
                        rotate: isHovered ? -12 : -6,
                        scale: isHovered ? 0.9 : 1
                    }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                    className="absolute z-20 w-64 md:w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 transform origin-bottom-right bg-gray-800"
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImage} // Simplified key
                            src={images[currentImage]}
                            alt="Commitment 1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                console.error(`Failed to load: ${images[currentImage]}`);
                            }}
                        />
                    </AnimatePresence>
                </motion.div>

                {/* Right Image - Angled with Auto-rotation (next image) */}
                <motion.div
                    style={{ x: 100, rotate: 6, zIndex: 10 }}
                    animate={{
                        x: isHovered ? 400 : 100,
                        rotate: isHovered ? 12 : 6,
                        scale: isHovered ? 0.9 : 1
                    }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                    className="absolute w-64 md:w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 transform origin-bottom-left bg-gray-800"
                >
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={`right-${currentImage}`} // Unique key for right
                            src={images[(currentImage + 1) % images.length]}
                            alt="Commitment 2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                console.error(`Failed to load: ${images[(currentImage + 1) % images.length]}`);
                            }}
                        />
                    </AnimatePresence>
                </motion.div>

                {/* Center Text (Revealed) */}
                <div className="absolute z-10 pointer-events-none text-center px-4 w-full flex justify-center">
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                transition={{ duration: 1, delay: 0.3, type: "spring" }}
                                className="max-w-md"
                            >
                                <h3 className="text-2xl md:text-4xl font-display text-rose-500 drop-shadow-lg leading-tight mb-3">
                                    I love you Christine,
                                </h3>
                                <p className="text-sm md:text-base font-sans font-light text-rose-300 leading-snug">
                                    adore you deeply with every sunrise,
                                    cherish every moment we share,
                                    and treasure the love we have.
                                </p>
                                <p className="text-xs md:text-sm font-serif text-rose-200/80 italic mt-3">
                                    Today, tomorrow, and always. 💕
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CommitmentSection;
