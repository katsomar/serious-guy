import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1516239482977-b550ba7253f2?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=800&auto=format&fit=crop&q=60",
];

const CommitmentSection: React.FC = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isHovered) {
                setCurrentImage((prev) => (prev + 1) % images.length);
            }
        }, 10000);
        return () => clearInterval(timer);
    }, [isHovered]);

    return (
        <section
            className="relative min-h-screen w-full flex items-center justify-center bg-black/5 overflow-hidden py-24"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">

                {/* Left Image - Angled */}
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
                    <img
                        src={images[currentImage]}
                        alt="Commitment 1"
                        className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-500"
                    />
                </motion.div>

                {/* Right Image - Angled */}
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
                    <img
                        src={images[(currentImage + 1) % images.length]}
                        alt="Commitment 2"
                        className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all duration-500"
                    />
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
                                className="max-w-lg"
                            >
                                <h3 className="text-4xl md:text-6xl font-display text-rose-500 drop-shadow-lg leading-tight">
                                    I promise to love you<br />
                                    <span className="text-2xl md:text-3xl font-sans font-light text-rose-800 block mt-4">
                                        more every single day.
                                    </span>
                                </h3>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CommitmentSection;
