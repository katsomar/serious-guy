import React from 'react';
import { motion } from 'framer-motion';

const memories = [
    { id: 1, src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=60", message: "You are my sunshine ☀️" },
    { id: 2, src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500&auto=format&fit=crop&q=60", message: "Life is sweeter with you 🍯" },
    { id: 3, src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&auto=format&fit=crop&q=60", message: "My heart chose you 💘" },
    { id: 4, src: "https://images.unsplash.com/photo-1522673607200-1645062cd955?w=500&auto=format&fit=crop&q=60", message: "Walking through life together 🚶‍♂️🚶‍♀️" },
    { id: 5, src: "https://images.unsplash.com/photo-1511285560982-1351c4f6305b?w=500&auto=format&fit=crop&q=60", message: "Every moment is magic ✨" },
    { id: 6, src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60", message: "Forever my favorite view 🏔️" },
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
                                className="absolute inset-0 backface-hidden rounded-2xl flex items-center justify-center p-6 text-center shadow-xl bg-white border-2 border-rose-100"
                                style={{ transform: "rotateY(180deg)" }}
                            >
                                <div className="flex flex-col items-center gap-4">
                                    <span className="text-4xl">💌</span>
                                    <p className="text-2xl font-display text-rose-500">
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
