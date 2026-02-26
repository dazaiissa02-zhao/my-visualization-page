import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import HeroBackground from './components/HeroBackground';

function App() {
  const videoSrc = '/背景视频压缩.mp4';
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Global Background Layer */}
      <div className="absolute inset-0 z-0">
        <HeroBackground 
          videoSrc={videoSrc}
          showParticles={false}
          showVeil={false}
          filter="brightness(0.85) contrast(1.1)"
        />
      </div>

      {/* Scrollable Content Layer */}
      <div className="relative z-10 w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        <AnimatePresence mode="wait">
          <section className="snap-section w-full h-screen snap-start relative overflow-hidden">
            <Page1 />
          </section>
          <section className="snap-section w-full h-screen snap-start relative overflow-hidden">
            <Page2 />
          </section>
          <section className="snap-section w-full h-screen snap-start relative overflow-hidden">
            <Page3 />
          </section>
          <section className="snap-section w-full h-screen snap-start relative overflow-hidden">
            <Page4 />
          </section>
          <section className="snap-section w-full h-screen snap-start relative overflow-hidden">
            <Page5 />
          </section>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
