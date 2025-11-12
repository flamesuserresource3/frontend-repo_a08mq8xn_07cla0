import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import SpaceBackground from './components/SpaceBackground';
import { ProfileSection, AboutSection, GallerySection, ProjectsSection, LinksSection } from './components/Sections';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [current, setCurrent] = useState('profile');

  const theme = useMemo(() => {
    switch (current) {
      case 'profile':
        return 'earth';
      case 'about':
        return 'mars';
      case 'gallery':
        return 'saturn';
      case 'projects':
        return 'jupiter';
      case 'links':
        return 'blackhole';
      default:
        return 'earth';
    }
  }, [current]);

  const renderSection = () => {
    switch (current) {
      case 'profile':
        return <ProfileSection />;
      case 'about':
        return <AboutSection />;
      case 'gallery':
        return <GallerySection />;
      case 'projects':
        return <ProjectsSection />;
      case 'links':
        return <LinksSection />;
      default:
        return <ProfileSection />;
    }
  };

  // Enhanced cinematic variants for card
  const variants = {
    initial: { opacity: 0, y: 22, scale: 0.985, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -18, scale: 0.992, filter: 'blur(6px)' }
  };

  // Subtle camera dolly for whole stage
  const camera = {
    initial: { opacity: 0, y: 8, scale: 0.998 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.998 }
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-black text-white px-3 py-2 rounded-md">Skip to content</a>
      {/* Header */}
      <header className="h-16 sticky top-0 z-20 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold shadow shadow-cyan-500/20">PF</span>
            <span className="font-semibold text-white/90 tracking-wide">Portfolio</span>
          </div>
          <div className="text-sm text-white/60 hidden sm:block">Profil • About • Galeri • Projek • Link</div>
        </div>
      </header>

      <div className="relative flex-1">
        <SpaceBackground theme={theme} />
        <motion.div
          key={`${current}-camera`}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={camera}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div id="content" className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-6 md:py-10">
            <div className="flex flex-col md:flex-row gap-6">
              <Sidebar current={current} onChange={setCurrent} />
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-2xl border border-white/15 bg-white/10 backdrop-blur-xl p-5 md:p-8 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)]"
                  >
                    {/* subtle gradient highlight frame */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:linear-gradient(black,transparent_90%)]" />
                    {renderSection()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="mt-10 border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center">
          <p className="text-white/80">© {new Date().getFullYear()} Portofolio Saya — Crafted with precision and starlight.</p>
          <div className="mt-3 text-xs text-white/60">Tema dinamis terinspirasi Bumi, Mars, Saturnus, Jupiter, dan Black Hole.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
