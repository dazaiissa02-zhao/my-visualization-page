import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { anchorStoryData } from '../data/anchorStoryData';
import './anchor-story.css';

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.2, 0.6, 0.1, 1],
    },
  }),
};

function StoryReveal({ children, className, delay = 0, amount = 0.3 }) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

function SceneVisual({ id }) {
  switch (id) {
    case 'focus':
      return (
        <div className="anchor-frame anchor-frame--hero">
          <div className="anchor-card">
            <div className="anchor-card__head">
              <div className="anchor-card__title">
                <span className="anchor-card__star">★</span>
                当前锚定中
              </div>
              <span className="anchor-card__meta">今日回顾 ›</span>
            </div>
            <div className="anchor-card__body anchor-card__body--centered">
              <div className="anchor-focus__eyebrow">现在只做</div>
              <h3 className="anchor-focus__title">写 Anchor 的下一版桌面体验</h3>
              <div className="anchor-focus__timer">18:42</div>
              <div className="anchor-focus__return">
                回来时: <em>先完成主窗口草图</em>
              </div>
              <div className="anchor-focus__stats">
                <div>
                  <div className="anchor-focus__statLabel">今天</div>
                  <div className="anchor-focus__statValue">4段 · 2h15m</div>
                </div>
                <span className="anchor-focus__divider" />
                <div>
                  <div className="anchor-focus__statLabel">收草棚</div>
                  <div className="anchor-focus__statValue">6 条</div>
                </div>
              </div>
              <div className="anchor-focus__actions">
                <button className="anchor-btn anchor-btn--ghost" type="button">暂停</button>
                <button className="anchor-btn anchor-btn--primary" type="button">提前复盘</button>
                <button className="anchor-btn anchor-btn--ghost" type="button">存草想法</button>
              </div>
              <div className="anchor-focus__hint">
                <kbd>⌘ ⇧ A</kbd> 呼出菜单 · <kbd>⌘ N</kbd> 存草念头
              </div>
            </div>
          </div>
        </div>
      );
    case 'idle':
      return (
        <div className="anchor-frame">
          <div className="anchor-card">
            <div className="anchor-card__head">
              <div className="anchor-card__title">
                <span className="anchor-card__star">★</span>
                待锚定
              </div>
              <span className="anchor-card__meta">session draft</span>
            </div>
            <div className="anchor-card__body">
              <div className="anchor-idle__prompt">· 现在要定个什么 ·</div>
              <div className="anchor-field">
                <label>当前锚点</label>
                <input readOnly value="写 Anchor 的下一版桌面体验" />
              </div>
              <div className="anchor-field">
                <label>回来时</label>
                <input readOnly value="先看主窗口运行状态" />
              </div>
              <div className="anchor-chipRow">
                <button className="anchor-chip" type="button">15</button>
                <button className="anchor-chip anchor-chip--active" type="button">25</button>
                <button className="anchor-chip" type="button">45</button>
                <button className="anchor-chip" type="button">60</button>
                <span className="anchor-chip__unit">分钟</span>
              </div>
              <div className="anchor-idle__footer">
                <button className="anchor-btn anchor-btn--ghost" type="button">存草想法</button>
                <button className="anchor-btn anchor-btn--primary" type="button">开始锚定 →</button>
              </div>
            </div>
          </div>
        </div>
      );
    case 'capture':
      return (
        <div className="anchor-frame anchor-frame--menubar">
          <div className="anchor-menubar">
            <span className="anchor-menubar__item">⚓ 锚定中</span>
            <span className="anchor-menubar__sep">·</span>
            <span className="anchor-menubar__item">18:42</span>
            <span className="anchor-menubar__badge">hover 预览</span>
          </div>
          <div className="anchor-splitCards">
            <div className="anchor-popover">
              <div className="anchor-popover__eyebrow">当前锚点</div>
              <h4>写 Anchor 的下一版桌面体验</h4>
              <div className="anchor-popover__meta">
                <span>进行中</span>
                <span>·</span>
                <span className="anchor-popover__amber">18:42</span>
                <span>·</span>
                <span>25m</span>
              </div>
              <div className="anchor-popover__footer">
                <kbd>⌘ ⇧ A</kbd>
                呼出主窗口
              </div>
            </div>
            <div className="anchor-captureCard">
              <div className="anchor-captureCard__title">
                <span className="anchor-captureCard__plus">+</span>
                存草想法
              </div>
              <textarea readOnly value="要不要把今日回顾改成只看半刻，而不是看总效率？" />
              <div className="anchor-captureCard__hint">
                保存至: <em>写 Anchor 的下一版体验</em> 的收草棚
              </div>
              <div className="anchor-captureCard__footer">
                <span>已存草 3 条</span>
                <button className="anchor-btn anchor-btn--primary anchor-btn--small" type="button">保存</button>
              </div>
            </div>
          </div>
        </div>
      );
    case 'saved':
      return (
        <div className="anchor-doubleShot">
          <div className="anchor-captureCard anchor-captureCard--plain">
            <div className="anchor-captureCard__title">
              <span className="anchor-captureCard__plus">+</span>
              存草想法
            </div>
            <textarea readOnly value="今日回顾是不是应该只看留下了什么，而不是看分数？" />
            <ul className="anchor-exampleList">
              <li>菜单栏 hover 不要显示状态细节</li>
              <li>给 Inbox 增加“开它锚定”入口</li>
              <li>结束页导出成 markdown</li>
            </ul>
          </div>
          <div className="anchor-captureCard anchor-captureCard--saved">
            <div className="anchor-saved__tag">已接住</div>
            <div className="anchor-saved__body">
              今日回顾是不是应该只看留下了什么，而不是看分数？
            </div>
            <div className="anchor-saved__meta">saved at 14:12 · inbox +1</div>
          </div>
        </div>
      );
    case 'checkpoint':
      return (
        <div className="anchor-frame">
          <div className="anchor-card">
            <div className="anchor-card__head">
              <div className="anchor-card__title">
                <span className="anchor-card__diamond">◆</span>
                Checkpoint
              </div>
              <span className="anchor-card__meta">25m · 04/18 14:30</span>
            </div>
            <div className="anchor-card__body">
              <h3 className="anchor-checkpoint__title">写 Anchor 的下一版桌面体验</h3>
              <div className="anchor-checkpoint__grid">
                <div>
                  <div className="anchor-checkpoint__label">产出</div>
                  <div className="anchor-checkpoint__output">
                    把你这段做完的东西放这里
                  </div>
                </div>
                <div>
                  <div className="anchor-checkpoint__label">存草想法</div>
                  <div className="anchor-checkpoint__thought">今日回顾要每段只看半刻 <span>▾</span></div>
                  <div className="anchor-checkpoint__thought">给 Inbox 一次开箱向导 <span>▾</span></div>
                  <div className="anchor-checkpoint__thought">菜单栏 hover 不要显示太细 <span>▾</span></div>
                </div>
              </div>
              <div className="anchor-focus__actions">
                <button className="anchor-btn anchor-btn--primary" type="button">继续 15 分钟</button>
                <button className="anchor-btn anchor-btn--ghost" type="button">完成复盘</button>
                <button className="anchor-btn anchor-btn--ghost" type="button">下它</button>
              </div>
            </div>
          </div>
        </div>
      );
    case 'review':
      return (
        <div className="anchor-frame">
          <div className="anchor-card">
            <div className="anchor-card__head">
              <div className="anchor-card__title">
                <span className="anchor-card__diamond">◇</span>
                今日回顾
              </div>
              <span className="anchor-card__meta">4月18日 · 周六</span>
            </div>
            <div className="anchor-card__body">
              <div className="anchor-review__stats">
                <div>
                  <div className="anchor-focus__statLabel">今天锚了</div>
                  <div className="anchor-review__statValue">4 段</div>
                </div>
                <div>
                  <div className="anchor-focus__statLabel">总锚定时间</div>
                  <div className="anchor-review__statValue">2h15m</div>
                </div>
                <div>
                  <div className="anchor-focus__statLabel">留下了什么</div>
                  <div className="anchor-review__statValue">产出 3</div>
                </div>
              </div>
              <ul className="anchor-timeline">
                <li>
                  <span className="anchor-timeline__time">09:20–09:45</span>
                  <div>
                    <div className="anchor-timeline__title">写 Anchor 的下一版桌面体验</div>
                    <div className="anchor-timeline__sub">产出: 完成主窗口两个状态 · 存草 1 条</div>
                  </div>
                  <span className="anchor-timeline__pill">25m</span>
                </li>
                <li>
                  <span className="anchor-timeline__time">11:10–11:35</span>
                  <div>
                    <div className="anchor-timeline__title">梳理菜单栏捕捉逻辑</div>
                    <div className="anchor-timeline__sub">产出: 菜单栏 hover 状态说明</div>
                  </div>
                  <span className="anchor-timeline__pill">25m</span>
                </li>
                <li>
                  <span className="anchor-timeline__time">14:05–14:30</span>
                  <div>
                    <div className="anchor-timeline__title">补 Checkpoint 的复盘结构</div>
                    <div className="anchor-timeline__sub">产出: 复盘节点文案与按钮关系</div>
                  </div>
                  <span className="anchor-timeline__pill">25m</span>
                </li>
              </ul>
              <div className="anchor-review__actions">
                <button className="anchor-btn anchor-btn--ghost" type="button">批准归档</button>
                <button className="anchor-btn anchor-btn--primary" type="button">导出当日记录</button>
              </div>
            </div>
          </div>
        </div>
      );
    case 'inbox':
      return (
        <div className="anchor-frame anchor-frame--hero">
          <div className="anchor-card">
            <div className="anchor-card__head">
              <div className="anchor-card__title">收草棚</div>
              <span className="anchor-card__meta">6 条念头</span>
            </div>
            <div className="anchor-card__body">
              <div className="anchor-inbox">
                {[
                  ['给 Anchor 一次开箱向导，写一个地面版说明', '昨日'],
                  ['今日回顾可以导出成 markdown', '昨日'],
                  ['菜单栏 hover 不要显示状态细节', '昨日'],
                ].map(([text, date]) => (
                  <div className="anchor-inbox__item" key={text}>
                    <span className="anchor-inbox__text">{text}</span>
                    <span className="anchor-inbox__date">{date}</span>
                    <button className="anchor-btn anchor-btn--ghost anchor-btn--small" type="button">开它锚定</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function AnchorScene({ scene }) {
  return (
    <section className={`anchor-scene anchor-scene--${scene.layout}`}>
      <StoryReveal className="anchor-scene__copy" delay={0}>
        <div className="anchor-scene__head">
          <span className="anchor-scene__numeral">{scene.numeral}</span>
          <div>
            <h3 className="anchor-scene__title">{scene.title}</h3>
            <p className="anchor-scene__subtitle">{scene.subtitle}</p>
          </div>
        </div>
        <div className="anchor-scene__text">
          {scene.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </StoryReveal>

      <StoryReveal className="anchor-scene__visual" delay={0.15}>
        <SceneVisual id={scene.id} />
      </StoryReveal>
    </section>
  );
}

function StoryView({ work }) {
  return (
    <article className="anchor-story">
      <div className="anchor-story__backdrop" aria-hidden="true" />
      <div className="anchor-story__content">
        <header className="anchor-story__intro">
          <StoryReveal className="anchor-story__introText" delay={0}>
            <div className="anchor-story__eyebrow">{anchorStoryData.intro.eyebrow}</div>
            <div className="anchor-story__brand">
              <span>{anchorStoryData.intro.titleEn}</span>
              <span>{anchorStoryData.intro.titleCn}</span>
            </div>
            <p className="anchor-story__subtitle">{anchorStoryData.intro.subtitle}</p>
            <div className="anchor-story__summary">
              {anchorStoryData.intro.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </StoryReveal>
          <StoryReveal className="anchor-story__introMeta" delay={0.15}>
            <div className="anchor-story__statusBlock">
              <span className="anchor-story__statusLabel">{work.statusLabel}</span>
              <h2>{work.title}</h2>
              <p>{work.subtitle}</p>
            </div>
            <a
              className="anchor-story__link"
              href={work.exitLink?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              查看 GitHub
              <ExternalLink size={14} />
            </a>
          </StoryReveal>
        </header>

        <div className="anchor-story__sequence">
          {anchorStoryData.scenes.map((scene) => (
            <AnchorScene key={scene.id} scene={scene} />
          ))}
        </div>

        <StoryReveal className="anchor-story__system" delay={0}>
          <div className="anchor-story__systemHead">
            <span>Appendix</span>
            <h3>Design Fragments</h3>
          </div>
          <div className="anchor-story__systemGrid">
            {anchorStoryData.principles.map((item) => (
              <div className="anchor-story__systemCard" key={item.label}>
                <span className="anchor-story__systemLabel">{item.label}</span>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </StoryReveal>

        <StoryReveal className="anchor-story__ending" delay={0}>
          <p>{anchorStoryData.ending.note}</p>
          <span>{anchorStoryData.ending.signature}</span>
        </StoryReveal>
      </div>
    </article>
  );
}

// ── 外层包装：「设计意图 / 在线体验」双 tab 切换 ──
function tabBtnStyle(active) {
  return {
    padding: '8px 22px',
    borderRadius: 9999,
    border: active ? '1px solid #e0b658' : '1px solid rgba(255,255,255,0.18)',
    background: active ? 'rgba(224,182,88,0.18)' : 'rgba(255,255,255,0.04)',
    color: active ? '#f4e3a8' : 'rgba(255,255,255,0.65)',
    cursor: 'pointer',
    fontSize: 14,
    letterSpacing: '0.04em',
    fontFamily: 'inherit',
    transition: 'all 0.18s ease',
    whiteSpace: 'nowrap',
  };
}

export default function AnchorStoryExperience({ work }) {
  const [view, setView] = useState('story');

  return (
    <div style={{ position: 'relative' }}>
      {/* 顶部 sticky tab 切换条 */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 6,
          padding: '12px 16px',
          background: 'transparent',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: 'none',
        }}
      >
        <button type="button" onClick={() => setView('story')} style={tabBtnStyle(view === 'story')}>
          设计意图
        </button>
        <button type="button" onClick={() => setView('live')} style={tabBtnStyle(view === 'live')}>
          在线体验
        </button>
      </div>

      {/* 内容区：两个视图二选一 */}
      {view === 'story' ? (
        <StoryView work={work} />
      ) : (
        <iframe
          src="/anchor-interactive.html"
          title="Anchor · 注意力停靠 · 交互原型"
          style={{
            width: '100%',
            height: 'calc(88vh - 60px)',
            border: 0,
            display: 'block',
            background: '#ede2bd',
          }}
          sandbox="allow-scripts allow-same-origin"
          loading="eager"
        />
      )}
    </div>
  );
}
