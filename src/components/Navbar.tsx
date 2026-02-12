import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
    const marqueeText = "You make my world brighter 💖  Every moment with you is magic ✨  Made with love, just for you ❤️  My favorite place is next to you 💞   ";

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="fixed top-0 left-0 w-full h-[60px] md:h-[80px] bg-white/10 backdrop-blur-md z-40 border-b border-white/20 flex items-center overflow-hidden"
        >
            <div className="w-full relative h-full flex items-center">
                {/* Continuous Marquee */}
                {/* Continuous Marquee */}
                <div className="flex overflow-hidden w-full relative">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 25
                        }}
                    >
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 mx-4">
                                <span className="text-white/90 text-lg md:text-xl font-medium font-display tracking-wide">
                                    {marqueeText}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
