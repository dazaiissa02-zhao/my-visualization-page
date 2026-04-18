import React, { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Import images for Meituan (from public folder)
const meituanImages = [
  { src: '/商卡信息迭代.jpeg', title: '商卡信息迭代' },
  { src: '/搜索页.png', title: '搜索场景双栏卡' },
  { src: '/异体卡.jpg', title: '信息流异体卡' }
];

// Import images for Baidu (from public folder)
const baiduImages = [
  { src: '/政策问题.png', title: '政策问题' },
  { src: '/现金券操作台.png', title: '现金券操作台' },
  { src: '/现金券流转.png', title: '现金券流转' }
];

// Lovart is a denser experience, so it opens as a constellation of sub-projects.
const lovartProjects = [
  {
    id: 'team',
    title: '席位制团队版（0-1）',
    subtitle: '验证组织级付费可行性',
    tags: ['在期团队 420 个', '平均8席位', '月GMV 约180万美金'],
    problem: '基于用户访谈与竞品调研，识别组织用户核心诉求并非单纯协作，而是在可控成本下获得成员管理、统一结算与资源弹性分配能力。',
    action: '主导“席位费 + 团队共享积分池”混合方案，以席位费承接成员权限、统一结算、团队管理等组织价值，以共享积分池承接 AI 生成消耗；并设计共享、均分、自定义上限三种积分分配模式，配套团队空间、资产隔离、离职流转等机制。',
    result: '首期在期团队 420 个，平均席位 8 人，月度 GMV 约 180 万美金，验证了组织级付费模式的可行性。',
    images: [
      { src: '/团队版.png', title: '团队版' },
      { src: '/团队管理页.png', title: '团队管理页' }
    ]
  },
  {
    id: 'commercialization',
    title: '星流商业化重构',
    subtitle: '匹配产品价值升级的会员体系改版',
    tags: ['高端SKU +9pp', 'ARPU +44%', '迁移留存率 86%'],
    problem: '产品价值提升后，原有商业体系承接不足，需要通过 SKU、订阅机制与存量迁移方案同步升级，释放高价值用户付费空间。',
    action: '将原 3 档 SKU 重构为 4 档，顶档从 ¥199 抬升至 ¥999，并收窄年付折扣，将年付从“拉新折扣”转为“留存锚点”；同时将订阅机制由单会员排他重构为多会员并行，并基于“账号唯一 + 资产隔离”的双版本并行机制完成旧版用户权益承接。',
    result: '高端 SKU 的 GMV 占比提升 9pp，ARPU 提升 44%，存量活跃用户迁移留存率达 86%。',
    images: [
      { src: '/新星流付费墙.png', title: '新星流付费墙' },
      { src: '/原星流付费墙.png', title: '原星流付费墙' },
      { src: '/新星流首页.png', title: '新星流首页' },
      { src: '/原星流首页.png', title: '原星流首页' }
    ]
  },
  {
    id: 'multimodal',
    title: '多模态模型产品化',
    subtitle: '推动模型能力向付费价值转化',
    tags: ['渗透率 7%', '高端SKU +8pp', '图像/视频/语音'],
    problem: '多模态模型能力分散在 prompt 参数与模型语法中，非技术用户使用门槛高，同时涉及真人生成、版权风险等场景，需要完成合规与商业适配。',
    action: '主导 Midjourney V7、MiniMax speech-2.8、Seedance 2.0、可灵 3.0 + Omni 等模型接入，覆盖图像、视频、语音三类创作能力；将专业参数前置为 UI 主控件，并设计活体检测核验与素材免二次审核机制，将新模型纳入会员分层权益体系。',
    result: '新增模型用户渗透率达 7%，该群体高端 SKU 占比比未使用用户高 8pp，使新模型能力成为高端 SKU 的差异化付费驱动力。',
    images: [
      { src: '/MJ7 prototype.png', title: 'MJ Prototype' },
      { src: '/MiniMax speech prototype.png', title: 'MiniMax Prototype' }
    ]
  },
  {
    id: 'compute',
    title: '算力双轨调度',
    subtitle: '让“0积分无限生成”承诺可持续成立',
    tags: ['成本 -53%', '队列切换率 33%', '加速消耗 40%'],
    problem: '会员“0 积分无限生成”权益带来成本与体验矛盾，需要将问题从短期控成本，重构为保障权益可持续运行并释放加速付费空间。',
    action: '设计“0 积分队列 + 积分加速队列”双轨机制，按预算消耗梯度建立阶梯式降速，将“无限生成”拆解为“无限可用 + 加速优先”；并在全局入口、Agent 对话框和画布生成中分别承接偏好预设、任务发起切换与生成中决策。',
    result: '单模型成本中位数降低 53%，队列切换率 33%，加速场景积分消耗占比达 40%。',
    images: [
      { src: '/限速策略.png', title: '算力双轨调度' },
      { src: '/生成点位.png', title: '生成点位' }
    ]
  }
];

function Orbit({ radius, speed, children, paused }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current && !paused) {
      ref.current.rotation.z += speed;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <ringGeometry args={[radius - 0.005, radius + 0.005, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {children}
    </group>
  );
}

function Ripples() {
  const groupRef = useRef();
  const count = 8; 
  const duration = 3; 
  
  const ripples = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => (
      <mesh key={i} rotation={[0, 0, 0]}>
        <ringGeometry args={[0.5, 0.505, 128]} /> 
        <meshBasicMaterial color="#ffffff" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    ));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      const duration = 40; // Lower frequency (slower cycle)
      
      groupRef.current.children.forEach((mesh, i) => {
        const offset = (i / count) * duration;
        const timeInCycle = (time + offset) % duration;
        const progress = timeInCycle / duration;
        
        const maxScale = 12; 
        const scale = progress * maxScale;
        
        mesh.scale.set(scale, scale, 1);
        
        let opacity = 0;
        if (progress < 0.2) {
           opacity = (progress / 0.2) * 0.4; 
        } else {
           opacity = (1 - (progress - 0.2) / 0.8) * 0.4; 
        }
        
        mesh.material.opacity = opacity;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {ripples}
    </group>
  );
}

function createStarTexture(color) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const centerX = 64;
  const centerY = 64;

  ctx.clearRect(0, 0, 128, 128);

  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 60);
  
  gradient.addColorStop(0, color); 
  gradient.addColorStop(0.3, color); 
  gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)'); 
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 60, 0, Math.PI * 2);
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

function PlanetNode({ radius, angle, color, project, onClick, hidden }) {
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  
  const texture = useMemo(() => createStarTexture(color), [color]);

  return (
    <group position={[x, y, 0]}>
      <mesh 
        onClick={onClick} 
        onPointerOver={() => document.body.style.cursor = 'pointer'} 
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <planeGeometry args={[1.8, 1.8]} />
        <meshBasicMaterial map={texture} transparent opacity={0.9} depthWrite={false} />
      </mesh>
      <Html position={[0, 0, 0]} center style={{ pointerEvents: 'none', display: hidden ? 'none' : 'block' }}>
        <div className="text-white text-xl font-serif tracking-widest whitespace-nowrap text-center select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          {project}
        </div>
      </Html>
    </group>
  );
}

// Left Panel: Resume Content
function LeftPanel({ data }) {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute left-[5vw] top-20 bottom-20 w-[32vw] glass-panel p-8 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.2)] flex flex-col pointer-events-auto z-50"
      style={{ fontFamily: '"Noto Serif SC", serif' }}
    >
      <div className="mb-6">
        <h2 className="text-4xl font-serif text-blue-100 mb-2 tracking-wide drop-shadow-lg">
          {data.project}
        </h2>
        <div className="text-blue-50/90 text-base uppercase tracking-wider font-medium drop-shadow-md">{data.dept}</div>
        <div className="text-blue-50/80 text-sm mt-1 font-serif drop-shadow-md">{data.time} | {data.role}</div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6 text-white font-normal text-lg leading-relaxed font-serif">
        {data.desc.map((item, i) => (
          <div key={i} className="mb-4">
            <h4 className="font-bold text-blue-200 mb-1">{item.title}</h4>
            <p className="text-blue-50/90 text-justify">{item.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Right Panel: Image Gallery
function RightPanel({ data, onImageClick }) {
  // Even if no images, we render the panel to maintain symmetry or maybe just hide it?
  // User asked for "Left popup resume, Right popup images".
  // If no images (Baidu/Meituan), maybe we should show a placeholder or just hide?
  // User said "Click Lovart... Right calls 4 images".
  // For others, maybe just empty or "No images"?
  // Let's render it but maybe with a placeholder text if empty.
  
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute right-[5vw] top-20 bottom-20 w-[56vw] glass-panel p-6 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md shadow-[0_0_10px_rgba(0,0,0,0.2)] flex flex-col pointer-events-auto z-50"
      style={{ fontFamily: '"Noto Serif SC", serif' }}
    >
      <h3 className="text-2xl font-serif text-blue-100 mb-6 tracking-wide drop-shadow-lg border-b border-white/20 pb-2">
        项目展示
      </h3>
      
      {data.images && data.images.length > 0 ? (
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
          {data.images.map((img, i) => (
            <div key={i} className="group relative cursor-zoom-in" onClick={() => onImageClick(img.src)}>
              <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 shadow-lg bg-black/50">
                 <img 
                   src={img.src} 
                   alt={img.title} 
                   loading="lazy"
                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                 />
              </div>
              <p className="text-white/80 text-sm mt-2 text-center font-serif">{img.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-white/50 italic font-serif">
          暂无项目图片展示
        </div>
      )}
    </motion.div>
  );
}

function LovartConstellationPanel({ data, selectedProjectId, onSelectProject, onImageClick }) {
  const selectedProject = lovartProjects.find((project) => project.id === selectedProjectId) || lovartProjects[0];

  return (
    <>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute left-[4vw] top-16 bottom-16 w-[35vw] glass-panel p-7 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md shadow-[0_0_24px_rgba(170,190,255,0.12)] flex flex-col pointer-events-auto z-50"
        style={{ fontFamily: '"Noto Serif SC", serif' }}
      >
        <div className="mb-5">
          <div className="flex items-center gap-3 text-blue-50/70 text-xs tracking-[0.35em] uppercase mb-3">
            <span className="h-px w-10 bg-blue-100/40" />
            Lovart Project Cluster
          </div>
          <h2 className="text-4xl font-serif text-blue-100 mb-2 tracking-wide drop-shadow-lg">
            {data.project}
          </h2>
          <div className="text-blue-50/90 text-base uppercase tracking-wider font-medium drop-shadow-md">{data.dept}</div>
          <div className="text-blue-50/80 text-sm mt-1 font-serif drop-shadow-md">{data.time} | {data.role}</div>
          <p className="mt-5 text-blue-50/85 text-base leading-relaxed text-justify">
            围绕 AIGC 产品商业化，从订阅体系、算力成本、团队付费到策略调研拆解成 4 个项目节点。点击任意星点，可以在右侧切换对应细节与项目图。
          </p>
        </div>

        <div className="relative flex-1 min-h-0">
          <div className="absolute left-6 top-5 bottom-5 w-px bg-gradient-to-b from-white/0 via-blue-100/35 to-white/0" />
          <div className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-3">
            {lovartProjects.map((project, index) => {
              const isActive = project.id === selectedProject.id;
              return (
                <motion.button
                  key={project.id}
                  type="button"
                  onClick={() => onSelectProject(project.id)}
                  className={`relative w-full text-left rounded-2xl border p-4 pl-14 transition-all duration-300 ${
                    isActive
                      ? 'bg-white/18 border-blue-100/60 shadow-[0_0_26px_rgba(180,205,255,0.2)]'
                      : 'bg-white/[0.06] border-white/10 hover:bg-white/10 hover:border-white/25'
                  }`}
                  whileHover={{ x: 4 }}
                >
                  <span className={`absolute left-4 top-5 flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                    isActive
                      ? 'border-blue-100 bg-blue-100/25 text-white shadow-[0_0_14px_rgba(190,215,255,0.55)]'
                      : 'border-white/25 bg-white/10 text-white/60'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="text-blue-50 text-lg font-semibold tracking-wide">{project.title}</div>
                  <div className="mt-1 text-sm text-blue-50/65 tracking-widest">{project.subtitle}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs text-blue-50/85">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        key={selectedProject.id}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="absolute right-[4vw] top-16 bottom-16 w-[55vw] glass-panel p-7 rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md shadow-[0_0_24px_rgba(170,190,255,0.12)] flex flex-col pointer-events-auto z-50"
        style={{ fontFamily: '"Noto Serif SC", serif' }}
      >
        <div className="flex items-start justify-between gap-6 border-b border-white/15 pb-5">
          <div>
            <div className="text-blue-50/60 text-xs tracking-[0.35em] uppercase mb-2">Selected Orbit</div>
            <h3 className="text-3xl font-serif text-blue-100 tracking-wide drop-shadow-lg">{selectedProject.title}</h3>
            <p className="mt-2 text-blue-50/70 tracking-widest">{selectedProject.subtitle}</p>
          </div>
          <div className="hidden xl:flex items-center gap-2 pt-2">
            {lovartProjects.map((project) => (
              <button
                key={project.id}
                type="button"
                aria-label={project.title}
                onClick={() => onSelectProject(project.id)}
                className={`h-3 rounded-full transition-all ${
                  project.id === selectedProject.id
                    ? 'w-10 bg-blue-100 shadow-[0_0_14px_rgba(190,215,255,0.75)]'
                    : 'w-3 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 py-6">
            {[
              ['问题背景', selectedProject.problem],
              ['我的动作', selectedProject.action],
              ['结果沉淀', selectedProject.result]
            ].map(([title, content]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <div className="text-blue-200 text-base font-bold mb-2">{title}</div>
                <p className="text-blue-50/86 text-sm leading-relaxed text-justify">{content}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl text-blue-100 tracking-wide">项目图谱</h4>
              {selectedProject.images.length > 0 && (
                <span className="text-xs text-blue-50/55 tracking-[0.25em]">click to zoom</span>
              )}
            </div>
            {selectedProject.images.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {selectedProject.images.map((img) => (
                  <button
                    key={img.src}
                    type="button"
                    className="group text-left cursor-zoom-in"
                    onClick={() => onImageClick(img.src)}
                  >
                    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black/45 shadow-lg">
                      <img
                        src={img.src}
                        alt={img.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-center text-sm text-blue-50/75">{img.title}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.04] text-blue-50/55">
                该项目图示待补充
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// Navigation Arrows
function NavigationArrows({ onPrev, onNext }) {
  return (
    <>
      <motion.button
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all z-[60] cursor-pointer drop-shadow-lg"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        animate={{ x: [-5, 0, -5], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </motion.button>

      <motion.button
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all z-[60] cursor-pointer drop-shadow-lg"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        animate={{ x: [5, 0, 5], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </motion.button>
    </>
  );
}

// Image Modal (Lightbox)
function ImageLightbox({ src, onClose }) {
  if (!src) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-10 cursor-zoom-out backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.img 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={src} 
        alt="Preview" 
        className="max-w-full max-h-full object-contain rounded shadow-2xl border border-white/10"
      />
      <button className="absolute top-8 right-8 text-white/70 hover:text-white text-4xl font-light transition-colors">
        ✕
      </button>
    </motion.div>
  );
}

export default function Page3() {
  const [activeProject, setActiveProject] = useState(null); // 'baidu' | 'meituan' | 'lovart' | null
  const [activeLovartProject, setActiveLovartProject] = useState(lovartProjects[0].id);
  const [previewImage, setPreviewImage] = useState(null);

  const experiences = [
    {
      id: 'baidu',
      project: '百度',
      role: '产品实习生',
      dept: 'MEG商业产品部',
      time: '2024.02 - 2024.05',
      radius: 3.2,
      angle: (4 * Math.PI) / 3,
      color: '#FFDAB9', 
      desc: [
        {
          title: "政策制定维护系统化",
          content: "针对人工政策制定和维护效率低下以及新业务拓展慢的问题，构建统一的政策管理系统，实现了政策规则的线上化配置与优惠券全生命周期管理。系统上线后，发券周期从5-14天缩短至0.5天，效率提升80%，并为运营团队每周释放3.5人天的精力。"
        },
        {
          title: "流量价值拆解自动化",
          content: "为解决买赠策略中不同广告流量价值难以量化、依赖人工估算的问题，引入“R值”重构计费与收入分摊规则。该措施极大提升了政策调整的灵活性，最终推动开屏广告年化收入提升20%（占部门总营收50%）。"
        },
        {
          title: "客户投放体验灵动化",
          content: "围绕线下复杂规则导致的合同无法修改、客户投放不灵活等问题，设计了支持政策快速建立与落地的线上系统，使客户能按需投放。该方案显著提升了客户体验，测算每年为平台引入超1亿元的新增广告预算。"
        }
      ],
      images: baiduImages
    },
    {
      id: 'meituan',
      project: '美团',
      role: '产品实习生',
      dept: '即时零售和医药健康服务产品部',
      time: '2025.03 - 2025.07',
      radius: 2.3,
      angle: (2 * Math.PI) / 3,
      color: '#FFB6C1', 
      desc: [
        {
          title: "迭代全品类一级商卡",
          content: "聚焦建立专业医疗服务平台形象，负责平台横纵向六大区位全品类一级商卡的迭代。通过重构商品信息呈现规则，显著强化医疗属性，弱化交易属性。上线后一个月，商卡转化率提升近3pp，带动平台新增GMV提升3%，占比贡献达84%，驱动业务增长与品牌升级。"
        },
        {
          title: "打造搜索场景双栏卡",
          content: "为优化用户体验，提高用户决策效率，在搜索页面新增“家庭常备”和“相关商品”推荐板块，通过差异化召回逻辑主动为用户提供情境化方案。功能上线搜索页面用户点击率从9%上升到了11%，页面转化率正向拉增近3pp。"
        },
        {
          title: "创新信息流异体卡",
          content: "围绕满足用户情境式方案需求并解决商家新品冷启动，设计了并推动上线三种首页信息流异体卡：用药清单结算卡、情境需求预填卡和商家营销卡。上线后首页推荐流GMV占比提升2pp，其中用药清单结算卡转化率为12%，商品冷启动效率提升了6pp。"
        }
      ],
      images: meituanImages
    },
    {
      id: 'lovart',
      project: 'Lovart',
      role: '产品实习生',
      dept: '商业化部门 (AIGC-Agent)',
      time: '2025.10 - 2026.02',
      radius: 1.4,
      angle: 0,
      color: '#E0B0FF', 
      desc: [
        {
          title: "商业化体系迁移重构",
          content: "主导Lovart商业化体系向国内版（星流）迁移，系统性完成支付本地化、定价结构重构及SKU体系优化，通过权益平移方案与分阶段切换策略保障迁移稳定性。上线后高端SKU占比提升9pp，ARPU提升44%，迁移留存率达86%。"
        },
        {
          title: "限速队列机制设计",
          content: "针对会员用户“0积分无限生成”权益带来的算力成本压力，协同技术团队设计并落地限速切换队列策略，通过排队时长预期提示与积分加速机制，在降低单模型成本53%的同时保持用户体验稳定，队列切换接受度达33%。"
        },
        {
          title: "席位制团队版构建",
          content: "基于多成员协作需求，从0到1设计并上线席位制团队版，构建团队成员管理、权限与积分共享机制，解决个人订阅模式下协作与费用分摊问题。上线后团队平均席位数8人，月度GMV达178.5万，验证了AIGC产品在团队协作场景下的付费可行性。"
        }
      ],
      images: []
    }
  ];

  const activeData = experiences.find(e => e.id === activeProject);
  // Define order: Lovart -> Meituan -> Baidu (Inner to Outer)
  const projectOrder = ['lovart', 'meituan', 'baidu'];

  const handleNext = () => {
    if (!activeProject) return;
    const currentIndex = projectOrder.indexOf(activeProject);
    const nextIndex = (currentIndex + 1) % projectOrder.length;
    setActiveProject(projectOrder[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeProject) return;
    const currentIndex = projectOrder.indexOf(activeProject);
    const prevIndex = (currentIndex - 1 + projectOrder.length) % projectOrder.length;
    setActiveProject(projectOrder[prevIndex]);
  };

  // Swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!activeProject) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <div 
      className="w-full h-full relative overflow-hidden bg-transparent"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} onPointerMissed={() => setActiveProject(null)}>
        <ambientLight intensity={0.5} />
        
        {/* Center Text */}
        <Html position={[0, 0, 0]} center zIndexRange={[0, 0]} style={{ pointerEvents: 'none' }}>
          <div className={`flex flex-col items-center justify-center text-center transition-opacity duration-500 ${activeProject ? 'opacity-20' : 'opacity-80'}`}>
            <h1 className="text-white text-3xl font-serif tracking-widest mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              星轨初具
            </h1>
          </div>
        </Html>

        {/* Background Ripples */}
        <Ripples />

        {/* Orbits */}
        <group>
          <Orbit radius={1.4} speed={0.0005} paused={!!activeProject}>
            <PlanetNode {...experiences.find(e => e.id === 'lovart')} onClick={() => { setActiveProject('lovart'); setActiveLovartProject(lovartProjects[0].id); }} hidden={!!activeProject} />
          </Orbit>
          <Orbit radius={2.3} speed={0.0003} paused={!!activeProject}>
            <PlanetNode {...experiences.find(e => e.id === 'meituan')} onClick={() => setActiveProject('meituan')} hidden={!!activeProject} />
          </Orbit>
          <Orbit radius={3.2} speed={0.0002} paused={!!activeProject}>
            <PlanetNode {...experiences.find(e => e.id === 'baidu')} onClick={() => setActiveProject('baidu')} hidden={!!activeProject} />
          </Orbit>
        </group>
      </Canvas>

      {/* Background Mask for Popups */}
      <div 
        className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] z-40 transition-opacity duration-500 ${activeProject ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setActiveProject(null)}
      />

      {/* Navigation Arrows - Persistent during transitions */}
      {activeProject && (
        <NavigationArrows onPrev={handlePrev} onNext={handleNext} />
      )}

      {/* Main Content Panels */}
      <AnimatePresence mode="wait">
        {activeProject && activeData && (
          <React.Fragment key={activeProject}>
            {activeProject === 'lovart' ? (
              <LovartConstellationPanel
                data={activeData}
                selectedProjectId={activeLovartProject}
                onSelectProject={setActiveLovartProject}
                onImageClick={setPreviewImage}
              />
            ) : (
              <>
                <LeftPanel data={activeData} />
                <RightPanel data={activeData} onImageClick={setPreviewImage} />
              </>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* Image Lightbox */}
      <AnimatePresence>
        {previewImage && (
          <ImageLightbox src={previewImage} onClose={() => setPreviewImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
