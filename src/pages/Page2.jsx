import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const educationData = [
  {
    id: 'anhui',
    title: '安徽农业大学',
    subtitle: 'ANHUI AGRICULTURAL UNIVERSITY',
    degree: '汉语言文学',
    time: '2019-2023.6',
    awards: [
      '2020-2021专业一等奖学金; 学习优异先进个人',
      '第七届“互联网+”大学生创新创业校二等奖',
      '安徽省第三届翻译大赛优秀奖',
      '2020安徽省大学生原创文学新星大赛优秀作品奖'
    ],
    courses: '中国现当代文学 (98)； 形式逻辑 (97)； 中国古代文学 (93)； 中国文化概论 (93)',
    experience: [
      '专业排名3/107',
      '安徽省高校团队赴鄂乡村评估项目实地考察员',
      '安徽省中安在线媒体撰稿30+',
      '主持国家级大学生创新创业训练计划项目并结项',
      '院辩论队四辩; 校礼仪队成员参与大型晚会10+'
    ],
    img: '/安徽农业大学校徽_纯白背景.png'
  },
  {
    id: 'shanghai',
    title: '上海大学',
    subtitle: 'SHANGHAI UNIVERSITY',
    degree: '汉语言文字学',
    time: '2023-2026.6',
    awards: [
      '2024-2025学院一等奖学金; 2023-2024学院三等奖学金; 2023学院二等奖学金',
      '参加国家社会科学基金青年项目并结项',
      '《由清华简〈五纪〉重论〈诗经·小星〉之“三五”》论文见刊'
    ],
    courses: '语法学文献研读 (92) ;语言学研究方法研读 (92) ;中国语言文学经典研读 (91)',
    experience: [
      '推免保研',
      '中文系硕士研究生第二党支部宣传委员,党建中心干事; 独立负责宣传工作2年+, 获评“校级样板党支部”。'
    ],
    img: '/上海大学校徽_纯白背景.png'
  }
];

// Extracted Component to prevent re-creation on render (Performance Optimization)
const ResumeCard = ({ data, onClose }) => (
  <div className="w-full h-full rounded-3xl bg-black/20 backdrop-blur-md border border-white/10 shadow-[0_0_10px_rgba(0,0,0,0.2)] p-8 flex flex-col relative overflow-hidden text-white will-change-transform" onClick={(e) => e.stopPropagation()}>
    {/* Close Button */}
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* Header */}
    <div className="flex items-center mb-6 pb-6 border-b border-white/20">
      <div className="w-20 h-20 rounded-full overflow-hidden border border-white/30 mr-5 shadow-lg shrink-0 flex items-center justify-center bg-white">
        {data.img ? (
          <img src={data.img} alt={data.title} className="w-full h-full object-contain p-2" />
        ) : (
          <div className="text-2xl font-serif text-black/80">{data.title[0]}</div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-serif tracking-wide drop-shadow-md">{data.title}</h3>
        <p className="text-xs uppercase tracking-[0.15em] opacity-90 mt-1 font-medium text-blue-100">{data.subtitle}</p>
        <div className="mt-2 inline-flex items-center space-x-3 text-sm">
          <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20 font-medium">{data.degree}</span>
          <span className="font-mono opacity-90">{data.time}</span>
        </div>
      </div>
    </div>

    {/* Scrollable Body */}
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
      <section>
        <h4 className="text-lg font-bold mb-2 flex items-center text-blue-50" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          <span className="w-1 h-4 bg-blue-400 mr-2 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"/>所获奖项
        </h4>
        <ul className="space-y-2 text-sm opacity-100 leading-relaxed font-light tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          {data.awards.map((a, i) => <li key={i} className="flex items-start"><span className="mr-2 text-blue-300">•</span>{a}</li>)}
        </ul>
      </section>
      
      <section>
        <h4 className="text-lg font-bold mb-2 flex items-center text-blue-50" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          <span className="w-1 h-4 bg-blue-400 mr-2 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"/>专业课程
        </h4>
        <p className="text-sm opacity-100 leading-relaxed font-light tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>{data.courses}</p>
      </section>

      <section>
        <h4 className="text-lg font-bold mb-2 flex items-center text-blue-50" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          <span className="w-1 h-4 bg-blue-400 mr-2 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"/>经历
        </h4>
        <div className="space-y-2 text-sm opacity-100 leading-relaxed font-light tracking-wide" style={{ fontFamily: '"Noto Serif SC", serif' }}>
          {data.experience.map((e, i) => <p key={i}>{e}</p>)}
        </div>
      </section>
    </div>
  </div>
);

export default function Page2() {
  const [activePopups, setActivePopups] = useState({ anhui: false, shanghai: false });
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  // Reset active location when scrolling away
  React.useEffect(() => {
    if (!isInView) {
      setActivePopups({ anhui: false, shanghai: false });
    }
  }, [isInView]);

  const togglePopup = (id) => {
    // Support simultaneous popups: toggle the target id without resetting others
    setActivePopups(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-transparent flex items-center justify-center"
      onClick={() => setActivePopups({ anhui: false, shanghai: false })}
    >

      {/* Title */}
      <motion.div 
        className="absolute top-12 left-0 w-full text-center z-10 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
      >
        <h2 
          className="text-5xl font-serif tracking-[0.2em] text-white drop-shadow-lg"
        >
          星光积攒
        </h2>
        <p className="text-white text-base mt-3 tracking-widest font-sans uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Growth & Education</p>
      </motion.div>

      {/* Main Interaction Area */}
      <div className="relative w-full max-w-[90vw] h-[80vh] flex flex-row items-center justify-center">
        
        {/* Central Rising Light Strip */}
        <div className="relative h-[600px] w-1 bg-white/10 rounded-full z-10">
           {/* Animated Fill */}
           <motion.div 
             className="absolute bottom-0 w-full bg-gradient-to-t from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.8)]"
             initial={{ height: 0 }}
             animate={isInView ? { height: '100%' } : { height: 0 }}
             transition={{ duration: 2, ease: "easeOut" }}
           />

           {/* Node 1: Anhui (Bottom) */}
           <motion.div 
             className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
             initial={{ opacity: 0, scale: 0 }}
             animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
             transition={{ delay: isInView ? 1 : 0, duration: 0.5 }}
           >
              <div 
                className={`relative group cursor-pointer ${activePopups.anhui ? 'scale-110' : 'hover:scale-105'} transition-transform duration-300`}
                onClick={(e) => { e.stopPropagation(); togglePopup('anhui'); }}
              >
                {/* Ethereal Breathing Icon - Anhui (Pale Pink) */}
                <div className="w-14 h-14 rounded-full bg-pink-200/20 shadow-[0_0_20px_rgba(244,114,182,0.4)] backdrop-blur-[2px] border border-pink-200/30 animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-pink-100 rounded-full shadow-[0_0_10px_#fbcfe8]" />
                </div>
                {/* Label */}
                <div className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 ml-2 shadow-[0_0_24px_rgba(255,255,255,0.35)]">
                   <span className="text-white font-serif text-2xl tracking-widest drop-shadow-md transition-opacity">安徽 · 寻星</span>
                </div>
              </div>
           </motion.div>

           {/* Node 2: Shanghai (Top) */}
           <motion.div 
             className="absolute top-[20%] left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
             initial={{ opacity: 0, scale: 0 }}
             animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
             transition={{ delay: isInView ? 1.8 : 0, duration: 0.5 }}
           >
              <div 
                className={`relative group cursor-pointer ${activePopups.shanghai ? 'scale-110' : 'hover:scale-105'} transition-transform duration-300`}
                onClick={(e) => { e.stopPropagation(); togglePopup('shanghai'); }}
              >
                {/* Ethereal Breathing Icon - Shanghai (White-Blue) */}
                <div className="w-14 h-14 rounded-full bg-blue-400/20 shadow-[0_0_25px_rgba(96,165,250,0.6)] backdrop-blur-[2px] border border-blue-300/50 animate-pulse flex items-center justify-center">
                   <div className="w-2 h-2 bg-blue-100 rounded-full shadow-[0_0_15px_#dbeafe]" />
                </div>
                {/* Label */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap text-right px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mr-2 shadow-[0_0_24px_rgba(255,255,255,0.35)]">
                   <span className="text-white font-serif text-2xl tracking-widest drop-shadow-md transition-opacity">上海 · 浩瀚</span>
                </div>
              </div>
           </motion.div>
        </div>

        {/* Popup: Anhui (Right) */}
        <AnimatePresence>
          {activePopups.anhui && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[450px] h-[600px] z-40"
              onClick={(e) => e.stopPropagation()}
            >
               <ResumeCard data={educationData[0]} onClose={() => togglePopup('anhui')} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Popup: Shanghai (Left) */}
        <AnimatePresence>
          {activePopups.shanghai && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="absolute left-[5%] top-1/2 -translate-y-1/2 w-[450px] h-[600px] z-40"
              onClick={(e) => e.stopPropagation()}
            >
               <ResumeCard data={educationData[1]} onClose={() => togglePopup('shanghai')} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
