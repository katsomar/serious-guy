import React from 'react';
import { motion } from 'framer-motion';

const AppreciationSection: React.FC = () => {
    return (
        <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-t from-rose-900 via-rose-800 to-rose-900 text-center px-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-400/20 via-transparent to-transparent opacity-50 blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="max-w-4xl mx-auto z-10"
            >
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-white drop-shadow-[0_0_15px_rgba(255,182,193,0.5)] leading-tight mb-8">
                    Thank you for being the most amazing woman in my life ❤️
                </h2>

                <p className="text-xl md:text-2xl font-serif text-rose-200/80 italic">
                    You are my everything.
                </p>
            </motion.div>
        </section>
    );
};

export default AppreciationSection;
