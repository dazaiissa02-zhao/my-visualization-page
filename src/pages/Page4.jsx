import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import page4Data from '../data/page4Data.json';
import { portfolioDrawerData } from '../data/portfolioDrawerData';

const page4Font = '"Noto Serif SC", serif';

const getStatusClass = (tone) => (
  tone === 'green'
    ? 'border-emerald-300/45 bg-emerald-300/10 text-emerald-100'
    : 'border-rose-300/45 bg-rose-300/10 text-rose-100'
);


// ── 弹窗内的视觉占位区 ───────────────────────────────────
// 作品一：截图占位，hover 显示「打开在线版」
function ScreenshotSlot({ hoverLink }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex h-full items-center justify-center">
        <span className="text-sm text-white/30" style={{ fontFamily: page4Font }}>网页截图 · 待补</span>
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={hoverLink.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/55 text-sm font-medium text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {hoverLink.label}
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}

// 作品二、三：dashed border 占位方块
function PlaceholderSlot({ label, sublabel }) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-10"
      style={{ aspectRatio: '4/3' }}
    >
      <span className="text-sm text-white/35" style={{ fontFamily: page4Font }}>{label}</span>
      <span className="max-w-[280px] text-center text-xs leading-relaxed text-white/20" style={{ fontFamily: page4Font }}>{sublabel}</span>
    </div>
  );
}

function ExpandedCard({ orb, onClose, onPrev, onNext }) {
  // 从 portfolioDrawerData 找到对应这颗星球的新内容
  const work = portfolioDrawerData.find((d) => d.id === orb?.id);

  if (!orb || !work) return null;

  return (
    <>
      {/* 遮罩 —— 保持和原来一样的轻度模糊 */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/18 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* 居中弹窗外框 —— 完全不变 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: 'spring', damping: 24, stiffness: 180 }}
          className="pointer-events-auto relative w-[90vw] max-w-[1180px] max-h-[84vh] overflow-hidden rounded-[30px] border border-white/[0.12] shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
          style={{ background: 'linear-gradient(145deg, rgba(22,12,48,0.62) 0%, rgba(38,14,62,0.52) 50%, rgba(22,12,48,0.62) 100%)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
          style={{ fontFamily: page4Font }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>

          {/* 左右切换箭头 */}
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

          {/* ── 内容区（线性滚动，无 tab）── */}
          <div className="max-h-[84vh] overflow-y-auto custom-scrollbar px-6 py-7 md:px-10 md:py-9">
            <div className="mx-auto max-w-[780px] space-y-7">

              {/* 顶部：状态标签 + 标题 + 副标题 */}
              <div className="flex flex-col gap-5 border-b border-white/10 pb-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs tracking-wider text-white/40">作品展示</span>
                  <span className="mx-1 text-white/20">·</span>
                  {/* 状态标签：绿色或灰色 */}
                  {work.statusType === 'green' ? (
                    <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-300">
                      {work.statusLabel}
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white/60">
                      {work.statusLabel}
                    </span>
                  )}
                  {/* 出口链接 */}
                  {work.exitLink && (
                    <a
                      href={work.exitLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/60 transition-colors hover:text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {work.exitLink.label}
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-medium leading-tight text-white md:text-4xl">
                    {work.title}
                  </h2>
                  <p className="mt-2 text-sm text-white/50 md:text-base">{work.subtitle}</p>
                </div>
              </div>

              {/* 主视觉占位 */}
              {work.visual.type === 'screenshot' ? (
                <ScreenshotSlot hoverLink={work.visual.hoverLink} />
              ) : (
                <PlaceholderSlot label={work.visual.label} sublabel={work.visual.sublabel} />
              )}

              {/* 细分隔线 */}
              <div className="border-t border-white/10" />

              {/* 正文：三个 ◦ 小标题段落，线性滚动 */}
              <div className="space-y-8">
                {work.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="mb-3 text-base font-medium text-white/80">◦ {section.heading}</h3>
                    <div className="space-y-3">
                      {section.content.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx} className="text-base leading-relaxed text-white/70">{para}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 底部收束区 */}
              <div className="space-y-4 border-t border-white/10 pt-6 pb-2">
                {/* 技术栈 chips（作品一、二） */}
                {work.footer.chips?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {work.footer.chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50">{chip}</span>
                    ))}
                  </div>
                )}
                {/* 相关仓库 chips（作品三，可点击） */}
                {work.footer.repoChips?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {work.footer.repoChips.map((chip) => (
                      <a
                        key={chip.label}
                        href={chip.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-colors hover:border-white/25 hover:text-white/75"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {chip.label}
                      </a>
                    ))}
                  </div>
                )}
                {/* 链接行 */}
                <div className="flex flex-wrap items-center gap-4">
                  {work.footer.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/50 transition-colors hover:text-white/80"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.label}
                    </a>
                  ))}
                  {work.footer.note && (
                    <span className="text-xs text-white/30">{work.footer.note}</span>
                  )}
                </div>
                {/* 引语（作品一、三有；作品二没有） */}
                {work.footer.quote && (
                  <p className="text-sm italic text-white/30">{work.footer.quote}</p>
                )}
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
