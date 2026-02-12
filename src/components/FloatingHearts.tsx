import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState<{ id: number; x: number; scale: number; duration: number }[]>([]);

    useEffect(() => {
        // Generate initial hearts
        const generateHearts = () => {
            const newHearts = Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                scale: Math.random() * 0.5 + 0.5,
                duration: Math.random() * 10 + 10,
            }));
            setHearts(newHearts);
        };

        generateHearts();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, scale: heart.scale }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                    className="absolute text-rose-300/30"
                    style={{ fontSize: `${Math.random() * 20 + 10}px` }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
