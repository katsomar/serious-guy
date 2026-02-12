import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AudioPlayerRef {
    playAudio: () => void;
}

interface AudioPlayerProps {
    start: boolean;
}

const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(({ start }, ref) => {
    const [playing, setPlaying] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [error, setError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Expose playAudio method to parent
    useImperativeHandle(ref, () => ({
        playAudio: () => {
            if (audioRef.current && !error) {
                audioRef.current.muted = false;
                audioRef.current.volume = 0.4;
                audioRef.current.play()
                    .then(() => {
                        setPlaying(true);
                        setUserInteracted(true);
                    })
                    .catch(err => console.log("Manual play failed:", err));
            }
        }
    }));

    // Attempt autoplay when loader finishes
    useEffect(() => {
        if (start && audioRef.current && !playing && !error) {
            audioRef.current.volume = 0.4;
            audioRef.current.muted = false;
            
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setPlaying(true);
                        setUserInteracted(true);
                    })
                    .catch((err) => {
                        console.log("Autoplay blocked by browser:", err);
                    });
            }
        }
    }, [start, playing, error]);

    // Play on first user interaction
    useEffect(() => {
        if (!userInteracted && start && !error) {
            const playOnInteraction = () => {
                if (audioRef.current && !playing) {
                    audioRef.current.muted = false;
                    audioRef.current.play()
                        .then(() => {
                            setPlaying(true);
                            setUserInteracted(true);
                        })
                        .catch(err => console.log("Play failed:", err));
                }
            };

            const events = ['click', 'touchstart', 'keydown', 'scroll'];
            events.forEach(event => {
                document.addEventListener(event, playOnInteraction, { once: true });
            });

            return () => {
                events.forEach(event => {
                    document.removeEventListener(event, playOnInteraction);
                });
            };
        }
    }, [userInteracted, start, playing, error]);

    const togglePlay = () => {
        if (audioRef.current && !error) {
            if (playing) {
                audioRef.current.pause();
                setPlaying(false);
            } else {
                audioRef.current.muted = false;
                audioRef.current.play()
                    .then(() => setPlaying(true))
                    .catch(err => {
                        console.error("Play error:", err);
                        setError(true);
                    });
            }
        }
    };

    const handleError = () => {
        console.error("Audio file not found or invalid format");
        setError(true);
    };

    // Don't render if there's an error
    if (error) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio
                ref={audioRef}
                loop
                preload="auto"
                onError={handleError}
                src="/audio/romantic-music.mp3"
            />

            <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-rose-300 hover:text-white shadow-lg transition-colors"
                title={playing ? "Pause music" : "Play music"}
            >
                {playing ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>
        </div>
    );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
