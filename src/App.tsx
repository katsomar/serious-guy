import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import HeartLoader from './components/HeartLoader';
import FloatingHearts from './components/FloatingHearts';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProposalPopup from './components/ProposalPopup';
import GallerySection from './components/GallerySection';
import CommitmentSection from './components/CommitmentSection';
import AppreciationSection from './components/AppreciationSection';
import CTASection from './components/CTASection';
import AudioPlayer, { type AudioPlayerRef } from './components/AudioPlayer';
import MobileBlocker from './components/MobileBlocker';
import CountdownTimer from './components/CountdownTimer';

function App() {
  const [loading, setLoading] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [isBeforeValentines, setIsBeforeValentines] = useState(true);
  const audioPlayerRef = useRef<AudioPlayerRef>(null);

  // Lock scroll initially
  useEffect(() => {
    if (loading || !accepted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Enable scroll after acceptance
    }
  }, [loading, accepted]);

  const handleLoaderFinish = () => {
    setLoading(false);
  };

  const handleAccept = () => {
    setAccepted(true);
    setShowProposal(false);
    // Smooth scroll hint is handled in HeroSection
  };

  const handleUnmuteClick = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.playAudio();
    }
  };

  // Check if it's before Valentine's Day midnight
  useEffect(() => {
    const checkDate = () => {
      const now = new Date();
      const valentinesDay = new Date('2026-02-14T00:00:00');
      setIsBeforeValentines(now < valentinesDay);
    };

    checkDate();
    const interval = setInterval(checkDate, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  // Show countdown if before Valentine's Day
  if (isBeforeValentines) {
    return <CountdownTimer />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-900 via-plum-900 to-rose-900 text-white relative font-sans selection:bg-rose-500 selection:text-white">

      {/* Mobile Blocker - Highest Priority */}
      <MobileBlocker />

      {/* Background Particles - Always visible after load? Or always? */}
      {!loading && <FloatingHearts />}

      {/* Loader */}
      <AnimatePresence>
        {loading && <HeartLoader onFinish={handleLoaderFinish} onUnmuteClick={handleUnmuteClick} />}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <Navbar />

        {/* Hero Section */}
        <HeroSection
          onProposalShow={() => setShowProposal(true)}
          accepted={accepted}
          startTimer={!loading}
        />

        {/* Following Sections (Visible but likely below fold) */}
        {accepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <GallerySection />
            <CommitmentSection />
            <div className="relative">
              <AppreciationSection />
              <CTASection />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Proposal Logic */}
      <ProposalPopup
        isOpen={showProposal && !accepted}
        onAccept={handleAccept}
      />

      {/* Audio */}
      <AudioPlayer ref={audioPlayerRef} start={!loading} />

    </div>
  );
}

export default App;
