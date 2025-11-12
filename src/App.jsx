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

  const variants = {
    initial: { opacity: 0, y: 14, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -14, filter: 'blur(4px)' }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-7xl h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold">PF</span>
            <span className="font-semibold text-gray-800">Portfolio</span>
          </div>
          <div className="text-sm text-gray-600 hidden sm:block">Menu: Profil, About, Galeri, Projek, Link</div>
        </div>
      </header>

      <div className="relative flex-1">
        <SpaceBackground theme={theme} />
        <div className="relative mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-6 md:py-10">
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
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl p-5 md:p-8 shadow-xl"
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-10 border-t border-white/10 bg-white/5 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center">
          <p className="text-white/80">© {new Date().getFullYear()} Portofolio Saya — Dibuat dengan cinta dan bintang-bintang.</p>
          <div className="mt-3 text-xs text-white/60">Terinspirasi oleh alam semesta: Bumi, Mars, Saturnus, Jupiter, dan Black Hole.</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
