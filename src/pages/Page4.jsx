import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import page4Data from '../data/page4Data.json';
import AIKnowledgeMap from '../components/AIKnowledgeMap';

// --- Components ---

// 1. Expanded Card
const ExpandedCard = ({ orb, onClose, onPrev, onNext, onOpenAIKnowledgeMap }) => {
  const [activeItemId, setActiveItemId] = useState(null);

  // Set default active item when orb opens
  useEffect(() => {
    if (orb && orb.items && orb.items.length > 0) {
      setActiveItemId(orb.items[0].id);
    }
  }, [orb]);

  if (!orb) return null;

  const activeItem = orb.items.find(item => item.id === activeItemId);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Card Container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4 md:p-0">
        <motion.div
          layoutId={`orb-card-${orb.id}`}
          className="w-[90vw] h-[85vh] overflow-hidden pointer-events-auto flex flex-col md:flex-row relative group/card"
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)'
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-50 bg-white/5 rounded-full p-2 hover:bg-white/10 backdrop-blur-sm border border-white/10"
          >
            <X size={20} />
          </button>

          {/* Navigation Arrows - Styled like Page 3 */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all z-[60] cursor-pointer drop-shadow-lg opacity-0 group-hover/card:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all z-[60] cursor-pointer drop-shadow-lg opacity-0 group-hover/card:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Left Column: Navigation */}
          <div className="w-full md:w-[30%] h-full flex flex-col border-b md:border-b-0 md:border-r border-white/10 bg-black/20">
            {/* Header */}
            <div className="p-8 pb-4 shrink-0">
              <h2 className="text-2xl font-serif text-white tracking-wider mb-3">
                {orb.title}
              </h2>
              <div 
                className="h-1 w-16 rounded-full" 
                style={{ backgroundColor: orb.color }}
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-8 space-y-2">
              {orb.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${
                    activeItemId === item.id 
                      ? 'bg-white/10 text-white shadow-lg' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {/* Active Indicator Strip */}
                  {activeItemId === item.id && (
                    <motion.div
                      layoutId="active-strip"
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: orb.color }}
                    />
                  )}
                  
                  <div className="pl-2">
                    <h3 className="font-medium text-base mb-1">{item.title}</h3>
                    <p className="text-xs opacity-70 line-clamp-1 font-light">{item.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-[70%] h-full flex flex-col bg-transparent relative">
             {/* Content Area */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 relative">
               <AnimatePresence mode="wait">
                 {activeItem && (
                   <motion.div
                     key={activeItem.id}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                     className="max-w-3xl mx-auto"
                   >
                     <h3 className="text-3xl font-serif text-white mb-8 leading-tight">
                       {activeItem.title}
                     </h3>
                     
                     <div 
                       className="prose prose-invert prose-lg max-w-none"
                       style={{
                         fontFamily: '"Noto Serif SC", serif',
                         lineHeight: '1.8',
                         color: 'rgba(255,255,255,0.85)'
                       }}
                     >
                       {/* Simulating rich text content with Markdown-style links and images */}
                       {activeItem.content.split('\n').map((paragraph, idx) => {
                         // Check for markdown images: ![alt](src)
                         const imgRegex = /!\[(.*?)\]\((.*?)\)/;
                         const imgMatch = paragraph.match(imgRegex);

                         if (imgMatch) {
                           return (
                             <div key={idx} className="my-8 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                               <img 
                                 src={imgMatch[2]} 
                                 alt={imgMatch[1]} 
                                 loading="lazy"
                                 className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                               />
                             </div>
                           );
                         }

                         // Check for markdown links: [text](url)
                         const linkRegex = /\[(.*?)\]\((.*?)\)/g;
                         const parts = [];
                         let lastIndex = 0;
                         let match;

                         while ((match = linkRegex.exec(paragraph)) !== null) {
                           // Add text before link
                           if (match.index > lastIndex) {
                             parts.push(paragraph.substring(lastIndex, match.index));
                           }
                           
                           // Handle Special Link for AI Knowledge Map
                           if (match[2] === '/ai-knowledge-map.html') {
                             parts.push(
                               <button 
                                 key={`btn-${idx}-${match.index}`} // Unique key
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   if (onOpenAIKnowledgeMap) onOpenAIKnowledgeMap();
                                 }}
                                 className="text-blue-300 hover:text-blue-200 underline decoration-blue-300/50 hover:decoration-blue-200 transition-colors bg-transparent border-none p-0 inline font-inherit cursor-pointer"
                               >
                                 {match[1]}
                               </button>
                             );
                           } else {
                             // Regular Link
                             parts.push(
                              <a 
                                key={`link-${idx}-${match.index}`} // Unique key
                                href={match[2]} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-300 hover:text-blue-200 underline decoration-blue-300/50 hover:decoration-blue-200 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // 如果是本地PDF文件，确保在新标签页打开
                                  if (match[2].endsWith('.pdf')) {
                                    window.open(match[2], '_blank');
                                    e.preventDefault();
                                  }
                                }}
                              >
                                {match[1]}
                              </a>
                            );
                           }
                           
                           lastIndex = linkRegex.lastIndex;
                         }
                         
                         // Add remaining text
                         if (lastIndex < paragraph.length) {
                           parts.push(paragraph.substring(lastIndex));
                         }

                         return (
                           <p key={idx} className="mb-6 font-light">
                             {parts.length > 0 ? parts : paragraph}
                           </p>
                         );
                       })}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default function Page4() {
  const [activeOrbId, setActiveOrbId] = useState(null);
  const [isHoveringCluster, setIsHoveringCluster] = useState(false);
  const [showAIKnowledgeMap, setShowAIKnowledgeMap] = useState(false);
  
  // Use useMemo for stars to prevent re-generation on every render
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // %
      y: Math.random() * 100, // %
      size: Math.random() * 2 + 1, // px
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  const activeOrb = page4Data.orbs.find(o => o.id === activeOrbId);

  // Helper functions for navigation
  const handlePrevOrb = () => {
    if (!activeOrbId) return;
    const currentIndex = page4Data.orbs.findIndex(o => o.id === activeOrbId);
    const prevIndex = (currentIndex - 1 + page4Data.orbs.length) % page4Data.orbs.length;
    setActiveOrbId(page4Data.orbs[prevIndex].id);
  };

  const handleNextOrb = () => {
    if (!activeOrbId) return;
    const currentIndex = page4Data.orbs.findIndex(o => o.id === activeOrbId);
    const nextIndex = (currentIndex + 1) % page4Data.orbs.length;
    setActiveOrbId(page4Data.orbs[nextIndex].id);
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent font-sans flex flex-col items-center justify-center">
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Static Stars */}
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
        
        {/* Large Ambient Glow */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] opacity-20 pointer-events-none" 
          style={{ background: 'radial-gradient(circle, rgba(255,200,220,0.4), rgba(167,139,250,0.3), transparent 70%)' }} 
        />
      </div>

      {/* Top Title - Aligned with Page 2 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none transition-opacity duration-500" style={{ opacity: isHoveringCluster ? 0 : 1 }}>
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
             Growth & Progress
           </p>
         </motion.div>
      </div>

      {/* Interactive Cluster Container */}
      {/* We use a large invisible container to detect hover for the "scattering" effect */}
      <div 
        className="relative w-[600px] h-[600px] flex items-center justify-center z-20"
        onMouseEnter={() => setIsHoveringCluster(true)}
        onMouseLeave={() => setIsHoveringCluster(false)}
      >
        {/* Orbs - Always Rendered */}
        {page4Data.orbs.map((orb) => {
          // Calculate Position
          // Cluster positions: orb1(-40, -30), orb2(40, -30), orb3(0, 40)
          // Scatter positions: from data
          const clusterX = orb.id === 1 ? -40 : orb.id === 2 ? 40 : 0;
          const clusterY = orb.id === 1 ? -30 : orb.id === 2 ? -30 : 40;
          
          const targetX = isHoveringCluster ? orb.offsetX : clusterX;
          const targetY = isHoveringCluster ? orb.offsetY : clusterY;
          
          // If active orb exists, hide non-active ones or move active one to center?
          // Requirement: "activeOrbId" controls expanded card. 
          // Usually when card expands, we might want to hide the original orbs or let layoutId handle it.
          // Since we use layoutId, we should keep rendering them but maybe lower opacity if not active?
          // Actually, AnimatePresence + layoutId usually implies the item "morphs" into the card.
          // But here we are rendering the card separately. 
          // Let's hide the orb when it is active so it looks like it expanded.
          
          const isActive = activeOrbId === orb.id;
          const isOtherActive = activeOrbId !== null && !isActive;

          return (
            <motion.div
              key={orb.id}
              layoutId={`orb-card-${orb.id}`}
              className="absolute flex flex-col items-center justify-center cursor-pointer"
              style={{ 
                width: orb.size, 
                height: orb.size,
                borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, ${orb.color}, transparent)`,
                boxShadow: `0 0 60px ${orb.glowColor}, 0 0 120px ${orb.glowColor.replace('0.6', '0.2')}, inset 0 0 40px rgba(255,255,255,0.4)`,
                zIndex: isActive ? 50 : 20,
                opacity: isActive ? 0 : (isOtherActive ? 0 : 1) // Hide if active (expanded) or if another is active
              }}
              animate={{
                x: targetX,
                y: targetY,
                scale: isHoveringCluster ? 1.05 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
              }}
              onClick={() => setActiveOrbId(orb.id)}
            >
              {/* Blur Diffusion Layer (Underneath) */}
              <div 
                className="absolute rounded-full blur-2xl opacity-40 pointer-events-none -z-10" 
                style={{ 
                  width: orb.size * 1.8, 
                  height: orb.size * 1.8, 
                  background: orb.glowColor, 
                  top: '50%', left: '50%', 
                  transform: 'translate(-50%, -50%)' 
                }} 
              />

              {/* Breathing Animation (Inner pulse) */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20 blur-md"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3 + orb.id,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Title (Only visible on Hover) */}
              <motion.div
                className="absolute top-full mt-8 whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: isHoveringCluster ? 1 : 0, 
                  y: isHoveringCluster ? 0 : -10 
                }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-white font-serif tracking-widest text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  {orb.title}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {activeOrbId && (
          <ExpandedCard 
            orb={activeOrb} 
            onClose={() => setActiveOrbId(null)} 
            onPrev={handlePrevOrb}
            onNext={handleNextOrb}
            onOpenAIKnowledgeMap={() => setShowAIKnowledgeMap(true)}
          />
        )}
      </AnimatePresence>

      {/* AI Knowledge Map Modal */}
      <AnimatePresence>
        {showAIKnowledgeMap && (
          <AIKnowledgeMap onClose={() => setShowAIKnowledgeMap(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}