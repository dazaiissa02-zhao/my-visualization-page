/**
 * PortfolioDrawer.jsx
 *
 * 第四页「星辰涌现」的作品详情抽屉。
 * 桌面端：从右侧推出（宽 min(640px, 50vw)，高 100vh）
 * 移动端：从底部上拉（高 85vh，顶部圆角）
 *
 * 关闭方式：
 *   - 点击左侧遮罩
 *   - 点击右上角 × 按钮
 *   - 按 ESC 键
 *   - 移动端：向下拖拽超过阈值
 *
 * 不引入任何新依赖，使用 Framer Motion + Tailwind（项目已有）
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

// 沿用第四页的字体设置
const page4Font = '"Noto Serif SC", serif';

// ─── 动效参数 ─────────────────────────────────────────
// 进入：easeOutQuart，流畅推入感
const enterTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] };
// 退出：easeIn，快速收回
const exitTransition = { duration: 0.25, ease: [0.4, 0, 1, 1] };

// ─── 子组件：状态标签 ────────────────────────────────
// type = 'green' → 绿色（已上线）
// type = 'gray'  → 灰色（开发中 / 方法沉淀）
function StatusBadge({ label, type }) {
  if (type === 'green') {
    return (
      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-300">
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-white/60">
      {label}
    </span>
  );
}

// ─── 子组件：普通技术栈 Chip ─────────────────────────
function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50">
      {children}
    </span>
  );
}

// ─── 子组件：可点击的仓库 Chip（作品三专用）────────────
function LinkChip({ label, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/50 transition-colors hover:border-white/25 hover:text-white/75"
    >
      {label}
    </a>
  );
}

// ─── 子组件：作品一的截图占位（hover 显示「打开在线版」）
function ScreenshotPlaceholder({ hoverLink }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 占位文字 */}
      <div className="flex h-full items-center justify-center">
        <span className="text-sm text-white/30" style={{ fontFamily: page4Font }}>
          网页截图 · 待补
        </span>
      </div>

      {/* hover 浮层 */}
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

// ─── 子组件：机制图 / 结构图占位（作品二、三）──────────
// dashed border 方块，内部标注「待补」
function MechanismPlaceholder({ label, sublabel }) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] px-6 py-10"
      style={{ aspectRatio: '4/3' }}
    >
      <span className="text-sm text-white/35" style={{ fontFamily: page4Font }}>
        {label}
      </span>
      <span
        className="max-w-[280px] text-center text-xs leading-relaxed text-white/20"
        style={{ fontFamily: page4Font }}
      >
        {sublabel}
      </span>
    </div>
  );
}

// ─── 子组件：主视觉位路由──────────────────────────────
// 根据 visual.type 决定渲染截图占位还是机制图占位
function VisualSlot({ visual }) {
  if (visual.type === 'screenshot') {
    return <ScreenshotPlaceholder hoverLink={visual.hoverLink} />;
  }
  return <MechanismPlaceholder label={visual.label} sublabel={visual.sublabel} />;
}

// ─── 子组件：抽屉内部的共用滚动内容区 ──────────────────
// 顶栏（sticky）+ 滚动主体（作品名 / 视觉位 / 正文 / 底部）
function DrawerContent({ workData, onClose, scrollRef }) {
  const hasChips = workData.footer?.chips?.length > 0;
  const hasRepoChips = workData.footer?.repoChips?.length > 0;
  const hasQuote = Boolean(workData.footer?.quote);
  const hasNote = Boolean(workData.footer?.note);

  return (
    <>
      {/* ── sticky 顶栏 ── */}
      {/* 高度 64px，滚动时固定在抽屉顶部 */}
      <div
        className="sticky top-0 z-10 flex flex-shrink-0 items-center justify-between border-b border-white/8 px-6"
        style={{
          height: '64px',
          // 和抽屉背景一致，防止滚动时正文内容透出顶栏
          background: 'rgba(10, 14, 26, 0.88)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
        }}
      >
        {/* 左侧：「作品展示」小标识 */}
        <span className="text-xs tracking-wider text-white/50">作品展示</span>

        {/* 右侧：状态标签 + 出口链接 + 关闭按钮 */}
        <div className="flex items-center gap-2">
          <StatusBadge label={workData.statusLabel} type={workData.statusType} />

          {workData.exitLink && (
            <a
              href={workData.exitLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/60 transition-colors hover:border-white/30 hover:text-white"
            >
              {workData.exitLink.label}
              <ExternalLink size={10} />
            </a>
          )}

          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ── 滚动主体 ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-7"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
      >
        <div className="space-y-7">

          {/* 作品名区域 */}
          <div>
            <h2
              className="text-3xl font-medium leading-tight text-white md:text-4xl"
              style={{ fontFamily: page4Font }}
            >
              {workData.title}
            </h2>
            <p
              className="mt-2 text-sm text-white/50 md:text-base"
              style={{ fontFamily: page4Font }}
            >
              {workData.subtitle}
            </p>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-white/10" />

          {/* 主视觉位（截图 or 机制图占位） */}
          <VisualSlot visual={workData.visual} />

          {/* 分隔线 */}
          <div className="border-t border-white/10" />

          {/* 正文区——线性滚动，无 tab 切换 */}
          <div className="space-y-8">
            {workData.sections.map((section, idx) => (
              <div key={idx}>
                {/* 小标题：用 ◦ 作为装饰符 */}
                <h3
                  className="mb-3 text-base font-medium text-white/80"
                  style={{ fontFamily: page4Font }}
                >
                  ◦ {section.heading}
                </h3>

                {/* 正文：\n\n 换段 */}
                <div className="space-y-3">
                  {section.content.split('\n\n').map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base leading-relaxed text-white/70"
                      style={{ fontFamily: page4Font }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 底部收束区 */}
          <div className="space-y-4 border-t border-white/10 pt-6 pb-4">
            {/* 技术栈 chips（作品一、二） */}
            {hasChips && (
              <div className="flex flex-wrap gap-2">
                {workData.footer.chips.map((chip) => (
                  <Chip key={chip}>{chip}</Chip>
                ))}
              </div>
            )}

            {/* 相关仓库 chips（作品三，可点击） */}
            {hasRepoChips && (
              <div className="flex flex-wrap gap-2">
                {workData.footer.repoChips.map((chip) => (
                  <LinkChip key={chip.label} label={chip.label} url={chip.url} />
                ))}
              </div>
            )}

            {/* 链接行 */}
            <div className="flex flex-wrap items-center gap-4">
              {workData.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/50 transition-colors hover:text-white/80"
                >
                  {link.label}
                </a>
              ))}
              {/* 附注（作品二：「产品仍在迭代中」） */}
              {hasNote && (
                <span className="text-xs text-white/30">{workData.footer.note}</span>
              )}
            </div>

            {/* 引语（作品一、三有；作品二没有） */}
            {hasQuote && (
              <p
                className="text-sm italic text-white/30"
                style={{ fontFamily: page4Font }}
              >
                {workData.footer.quote}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── 主组件：PortfolioDrawer ──────────────────────────
// Props:
//   workData  - 当前要展示的作品数据（来自 portfolioDrawerData）
//   onClose   - 关闭回调
export default function PortfolioDrawer({ workData, onClose }) {
  const scrollRef = useRef(null);

  // ── ESC 键关闭 ──
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // ── 切换作品时滚动到顶部 ──
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [workData?.id]);

  // ── 禁止背景滚动（抽屉打开时） ──
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (!workData) return null;

  // 抽屉背景：和原来弹窗保持一致的半透明毛玻璃风格
  // 原 Modal 用的是 bg-[rgba(10,16,30,0.36)] backdrop-blur-[18px]
  // 抽屉稍微不透明一点（避免内容可读性问题），但保持同样的玻璃气质
  const drawerBg = {
    background: 'rgba(10, 14, 26, 0.72)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
  };

  return (
    <>
      {/* ── 半透明遮罩（点击关闭） ── */}
      {/* 不加 backdrop-blur：星空背景是这个产品的灵魂，不能被模糊掉 */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* ── 桌面端：右侧侧拉抽屉（md 及以上） ── */}
      {/* 高度 100vh，宽度 min(640px, 50vw) */}
      <div className="fixed inset-0 z-50 hidden items-stretch justify-end md:flex">
        <motion.div
          className="flex h-full flex-col overflow-hidden"
          style={{
            width: 'min(640px, 50vw)',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            ...drawerBg,
            fontFamily: page4Font,
          }}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={enterTransition}
        >
          <DrawerContent
            workData={workData}
            onClose={onClose}
            scrollRef={scrollRef}
          />
        </motion.div>
      </div>

      {/* ── 移动端：底部上拉抽屉（md 以下） ── */}
      {/* 高度 85vh，顶部两个圆角 */}
      <div className="fixed inset-0 z-50 flex items-end md:hidden">
        <motion.div
          className="flex w-full flex-col overflow-hidden rounded-t-3xl"
          style={{
            height: '85vh',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            ...drawerBg,
            fontFamily: page4Font,
          }}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={enterTransition}
        >
          {/* 顶部拖拽指示条：4px × 40px 灰色小横条 */}
          <div className="flex flex-shrink-0 justify-center pb-1 pt-3">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <DrawerContent
            workData={workData}
            onClose={onClose}
            scrollRef={scrollRef}
          />
        </motion.div>
      </div>
    </>
  );
}
