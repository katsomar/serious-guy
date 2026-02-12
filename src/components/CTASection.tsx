import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleHeart } from 'lucide-react';

const CTASection: React.FC = () => {
    return (
        <div className="bg-rose-900 pb-20 pt-10 text-center">
            <motion.a
                href="https://wa.me/YOUR_PHONE_NUMBER" // User to replace
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 77, 109, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full text-white font-bold text-xl shadow-xl transition-all duration-300 border border-white/20"
            >
                <MessageCircleHeart size={28} />
                Talk to your boo 💬
            </motion.a>

            <p className="mt-4 text-rose-300/60 text-sm font-sans">
                Made with infinite love
            </p>
        </div>
    );
};

export default CTASection;
