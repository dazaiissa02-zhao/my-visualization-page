import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import page4Data from '../data/page4Data.json';

const page4Font = '"Noto Serif SC", serif';

const getStatusClass = (tone) => (
  tone === 'green'
    ? 'border-emerald-300/45 bg-emerald-300/10 text-emerald-100'
    : 'border-rose-300/45 bg-rose-300/10 text-rose-100'
);

function SnapshotPanel({ orb }) {
  if (!orb.screenshot) {
    return (
      <div className="flex min-h-[240px] items-center justify-center rounded-[24px] border border-dashed border-white/14 bg-white/[0.03] text-white/35">
        截图待补充
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/30 shadow-[0_20px_80px_rgba(0,0,0,0.26)]">
      <img
        src={orb.screenshot.src}
        alt={orb.screenshot.alt}
        loading="lazy"
        className="h-auto w-full object-cover"
      />
      <div
        className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-white/58"
        style={{ fontFamily: page4Font }}
      >
        {orb.screenshot.caption}
      </div>
    </div>
  );
}

function ExpandedCard({ orb, onClose, onPrev, onNext }) {
  const [activeSectionId, setActiveSectionId] = useState(null);

  useEffect(() => {
    if (orb?.sections?.length) {
      setActiveSectionId(orb.sections[0].id);
    }
  }, [orb]);

  if (!orb) return null;

  const activeSection = orb.sections.find((section) => section.id === activeSectionId) || orb.sections[0];
  const hasLink = Boolean(orb.linkUrl);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/18 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', damping: 24, stiffness: 180 }}
          className="pointer-events-auto relative w-[90vw] max-w-[1180px] max-h-[84vh] overflow-hidden rounded-[30px] border border-white/10 bg-[rgba(10,16,30,0.36)] shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-[18px]"
          style={{ fontFamily: page4Font }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 text-white/45 transition-colors hover:text-white md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 text-white/45 transition-colors hover:text-white md:block"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-10 w-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="max-h-[84vh] overflow-y-auto custom-scrollbar px-6 py-7 md:px-10 md:py-9">
            <div className="mx-auto max-w-[1020px]">
              <div className="flex flex-col gap-6 border-b border-white/10 pb-7 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="text-sm tracking-[0.22em] text-white/38">
                    作品展示
                  </div>
                  <h2 className="mt-3 text-4xl leading-tight text-white font-serif tracking-wide">
                    {orb.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/58">
                    {orb.hoverText}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 md:justify-end">
                  <span className={`rounded-full border px-3 py-1 text-sm ${getStatusClass(orb.statusTone)}`}>
                    {orb.status}
                  </span>
                  {hasLink ? (
                    <a
                      href={orb.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-white/72 transition-colors hover:border-white/35 hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {orb.linkLabel}
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm text-white/35">
                      {orb.linkLabel}
                    </span>
                  )}
                </div>
              </div>

              <blockquote className="mt-7 border-l-2 border-rose-300/70 pl-5 text-xl leading-relaxed text-white/55 font-serif">
                {orb.tagline}
              </blockquote>

              <div className="mt-7 flex flex-wrap gap-2">
                {orb.sections.map((section) => {
                  const isActive = section.id === activeSection.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSectionId(section.id)}
                      className={`rounded-full border px-4 py-1.5 text-base transition-all ${
                        isActive
                          ? 'border-white/28 bg-white/12 text-white shadow-[0_0_18px_rgba(255,255,255,0.06)]'
                          : 'border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:text-white/75'
                      }`}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-7">
                <motion.div
                  key={activeSection.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                  className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_50px_rgba(0,0,0,0.16)] md:p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-rose-200 text-base font-medium tracking-[0.16em]">
                      {activeSection.label}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <h3 className="text-3xl leading-tight text-white font-serif">
                    {activeSection.title}
                  </h3>
                  <p
                    className="mt-6 text-lg leading-[1.95] text-white/82 text-justify"
                    style={{ fontFamily: page4Font }}
                  >
                    {activeSection.content}
                  </p>
                </motion.div>
              </div>

              <div className="mt-7">
                <SnapshotPanel orb={orb} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function Page4() {
  const [activeOrbId, setActiveOrbId] = useState(null);
  const [isHoveringCluster, setIsHoveringCluster] = useState(false);
  const [hoveredOrbId, setHoveredOrbId] = useState(null);

  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  const activeOrb = page4Data.orbs.find((orb) => orb.id === activeOrbId);

  const handlePrevOrb = () => {
    if (!activeOrbId) return;
    const currentIndex = page4Data.orbs.findIndex((orb) => orb.id === activeOrbId);
    const prevIndex = (currentIndex - 1 + page4Data.orbs.length) % page4Data.orbs.length;
    setActiveOrbId(page4Data.orbs[prevIndex].id);
  };

  const handleNextOrb = () => {
    if (!activeOrbId) return;
    const currentIndex = page4Data.orbs.findIndex((orb) => orb.id === activeOrbId);
    const nextIndex = (currentIndex + 1) % page4Data.orbs.length;
    setActiveOrbId(page4Data.orbs[nextIndex].id);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent font-sans flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
          />
        ))}

        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[860px] h-[860px] rounded-full blur-[110px] opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(255,200,220,0.42), rgba(167,139,250,0.28), transparent 72%)' }}
        />
      </div>

      <div
        className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHoveringCluster ? 0 : 1 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <h2 className="text-5xl font-serif tracking-[0.2em] text-white drop-shadow-lg">
            星辰涌现
          </h2>
          <p className="text-white text-base mt-3 tracking-widest font-sans uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] pl-1">
            Portfolio & Product Thinking
          </p>
        </motion.div>
      </div>

      <div
        className="relative z-20 h-[600px] w-[640px]"
        onMouseEnter={() => setIsHoveringCluster(true)}
        onMouseLeave={() => {
          setIsHoveringCluster(false);
          setHoveredOrbId(null);
        }}
      >
        {page4Data.orbs.map((orb) => {
          const clusterX = orb.id === 1 ? -40 : orb.id === 2 ? 40 : 0;
          const clusterY = orb.id === 1 ? -30 : orb.id === 2 ? -30 : 40;

          const targetX = isHoveringCluster ? orb.offsetX : clusterX;
          const targetY = isHoveringCluster ? orb.offsetY : clusterY;
          const isHovered = hoveredOrbId === orb.id;
          const isActive = activeOrbId === orb.id;
          const isOtherActive = activeOrbId !== null && !isActive;

          return (
            <motion.button
              key={orb.id}
              type="button"
              className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center bg-transparent"
              animate={{
                x: targetX,
                y: targetY,
                scale: isHovered ? 1.04 : isHoveringCluster ? 1.01 : 1,
                opacity: isActive ? 0 : (isOtherActive ? 0 : 1)
              }}
              transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 1 }}
              onMouseEnter={() => setHoveredOrbId(orb.id)}
              onFocus={() => setHoveredOrbId(orb.id)}
              onClick={() => setActiveOrbId(orb.id)}
            >
              <div
                className="relative flex items-center justify-center rounded-full"
                style={{ width: orb.size, height: orb.size }}
              >
                <div
                  className="absolute rounded-full blur-2xl opacity-40 pointer-events-none"
                  style={{
                    width: orb.size * 1.8,
                    height: orb.size * 1.8,
                    background: orb.glowColor
                  }}
                />
                <div
                  className="absolute rounded-full border border-white/12 opacity-65"
                  style={{
                    width: orb.size * 1.34,
                    height: orb.size * 0.56,
                    transform: 'rotate(-18deg)'
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${orb.color}, transparent)`,
                    boxShadow: `0 0 60px ${orb.glowColor}, 0 0 120px ${orb.glowColor.replace('0.6', '0.2')}, inset 0 0 40px rgba(255,255,255,0.4)`
                  }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.9, 1, 0.9]
                  }}
                  transition={{
                    duration: 3 + orb.id,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.24 }}
                    className="mt-7 flex w-[280px] flex-col items-center text-center"
                  >
                    <span className="text-2xl font-serif tracking-wide text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.48)]">
                      {orb.title}
                    </span>
                    <span className="mt-2 text-sm leading-relaxed text-white/68 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      {orb.hoverText}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {activeOrbId && (
          <ExpandedCard
            orb={activeOrb}
            onClose={() => setActiveOrbId(null)}
            onPrev={handlePrevOrb}
            onNext={handleNextOrb}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
