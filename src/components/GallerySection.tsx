import React from 'react';
import { motion } from 'framer-motion';

const memories = [
    { 
        id: 1, 
        src: "/images/1.jpeg", 
        message: "Every morning I wake up grateful for you. You are the sunshine that brightens my darkest days, the warmth that fills my heart with joy. With you, every moment feels like a beautiful dream come true. ☀️💛" 
    },
    { 
        id: 2, 
        src: "/images/2.jpeg", 
        message: "Life before you was just existing, but with you, I'm truly living. You make every ordinary moment extraordinary, every simple day an adventure. My heart is fuller because of you, and I cherish every second we share together. 🍯✨" 
    },
    { 
        id: 3, 
        src: "/images/3.jpeg", 
        message: "From thousands of people in this world, my heart recognized you and chose you. You are my soulmate, my best friend, and my love. I fall deeper in love with you every single day. 💘🌹" 
    },
    { 
        id: 4, 
        src: "/images/4.jpeg", 
        message: "Walking through life with you is the greatest blessing I could ever ask for. Hand in hand, heart to heart, we face every challenge together and celebrate every victory. You complete me in ways I never thought possible. 🚶‍♂️🚶‍♀️💕" 
    },
    { 
        id: 5, 
        src: "/images/5.jpeg", 
        message: "You bring magic into my life that I never knew existed. Every laugh we share, every conversation we have, every moment spent together feels like pure enchantment. You are my fairy tale come true, my happily ever after. ✨🎆" 
    },
    { 
        id: 6, 
        src: "/images/6.jpeg", 
        message: "Among all the beautiful places in this world, my favorite view will always be you. Your smile lights up my universe, your presence brings me peace, and your love gives me purpose. You are my home, my haven, destination. 🏔️❤️" 
    },
];

const GallerySection: React.FC = () => {
    return (
        <section className="py-20 px-4 md:px-10 bg-white/5 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-display text-center text-rose-500 mb-12 drop-shadow-sm">
                Our Beautiful Memories
            </h2>

            <p className="text-center text-rose-200/60 mb-8 italic">
                Hover over the photos 💌
            </p>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
                {memories.map((memory) => (
                    <div key={memory.id} className="break-inside-avoid mb-6 w-full h-80 md:h-96 perspective cursor-pointer group">
                        <motion.div
                            initial={false}
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.6, type: "tween" }}
                            className="relative w-full h-full transform-style-3d"
                        >
                            {/* Front Side (Image) */}
                            <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src={memory.src}
                                    alt="Memory"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                            </div>

                            {/* Back Side (Text) */}
                            <div
                                className="absolute inset-0 backface-hidden rounded-2xl flex items-center justify-center p-8 text-center shadow-xl bg-gradient-to-br from-rose-50 to-pink-100 border-2 border-rose-200"
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                <div className="flex flex-col items-center gap-4 max-h-full overflow-y-auto">
                                    <span className="text-4xl">💌</span>
                                    <p className="text-base md:text-lg font-sans text-rose-600 leading-relaxed">
                                        {memory.message}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default GallerySection;
