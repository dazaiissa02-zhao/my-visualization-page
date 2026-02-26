import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Phone, X, Copy, Check } from 'lucide-react';

const resumeUrl = '/赵晓婷_上海大学_26届_产品经理.pdf';

export default function Page5() {
  const [bgLoaded, setBgLoaded] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = [
    "Hello again",
    "Product · AI Explorer",
    "我仍在加速旋转，仍在奋力发光",
    "被AGI的造梦牵引，奔向更深的浩瀚",
    "愿我们的星轨，在宇宙缤纷时再次相触"
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between lines
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 0,
      textShadow: "0 0 0px rgba(255,255,255,0)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: [
        "0 0 0px rgba(255,255,255,0)",
        "0 1px 5px rgba(0,0,0,0.45), 0 0 4px rgba(255,255,255,0.4)"
      ],
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const nameVariants = {
    hidden: { 
      opacity: 0, 
      y: 0,
      textShadow: "0 0 0px rgba(255,255,255,0)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: [
        "0 0 0px rgba(255,255,255,0)",
        "0 2px 6px rgba(0,0,0,0.4), 0 0 6px rgba(255,255,255,0.5)"
      ],
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('19855535582');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = '赵晓婷_上海大学_26届_产品经理.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const commonTextStyle = "text-white";

  return (
    <motion.div 
      className="w-full h-full relative overflow-hidden bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center px-6 w-full max-w-5xl mx-auto">
        <div className="relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={bgLoaded ? "visible" : "hidden"}
            viewport={{ once: false }}
            className="space-y-5"
          >
            {lines.map((line, index) => {
              if (index === 1) {
                return (
                  <motion.p 
                    key={index} 
                    variants={nameVariants}
                    className={`text-5xl md:text-7xl mb-10 tracking-wider font-medium ${commonTextStyle}`}
                    style={{ 
                      fontFamily: '"Noto Serif SC", serif', 
                      fontWeight: 500,
                      textShadow: "0 2px 6px rgba(0,0,0,0.4), 0 0 6px rgba(255,255,255,0.5)"
                    }}
                  >
                    {line}
                  </motion.p>
                );
              }

              return (
                <motion.p 
                  key={index} 
                  variants={lineVariants}
                  className={`${
                    index === 0
                      ? 'text-5xl md:text-7xl mb-4 tracking-wider font-normal' 
                      : 'text-lg md:text-2xl leading-normal tracking-wide font-normal font-serif'
                  } ${commonTextStyle}`}
                  style={{
                    ...(index === 0
                      ? { fontFamily: '"Montserrat", sans-serif', fontWeight: 300 } // English artistic font - Thinner
                      : { fontFamily: '"Noto Serif SC", serif', fontWeight: 400 }), // Chinese artistic font
                    textShadow: "0 1px 5px rgba(0,0,0,0.45), 0 0 4px rgba(255,255,255,0.4)"
                  }}
                >
                  {line}
                </motion.p>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Top Right Buttons */}
      <motion.div 
        className="absolute top-8 right-8 flex gap-3 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        {/* Download Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.4)] 
            text-[rgba(255,255,255,0.85)] backdrop-blur-sm text-sm 
            hover:bg-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.7)] 
            transition-colors duration-300 cursor-pointer"
          onClick={handleDownload}
        >
          <Download size={16} className="opacity-90" />
          <span className="font-light tracking-widest font-serif" style={{ fontFamily: '"Noto Serif SC", serif' }}>星图下载</span>
        </button>

        {/* Contact Button */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full 
            bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.4)] 
            text-[rgba(255,255,255,0.85)] backdrop-blur-sm text-sm 
            hover:bg-[rgba(255,255,255,0.2)] hover:border-[rgba(255,255,255,0.7)] 
            transition-colors duration-300 cursor-pointer"
          onClick={() => setShowContactModal(true)}
        >
          <Phone size={16} className="opacity-90" />
          <span className="font-light tracking-widest font-serif" style={{ fontFamily: '"Noto Serif SC", serif' }}>星轨相接</span>
        </button>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 2.7, duration: 1 }} 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-white/50 tracking-widest pointer-events-none" 
        style={{ fontFamily: '"Noto Serif SC", serif' }} 
      > 
        © 2025 赵晓婷 · 用AI构建，用心表达 
      </motion.p>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div 
              className="relative bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                onClick={() => setShowContactModal(false)}
              >
                <X size={24} />
              </button>
              
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone size={32} className="text-[#EDE8E3]" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif font-bold text-[#EDE8E3] drop-shadow-md" style={{ fontFamily: '"Noto Serif SC", serif' }}>联系方式</h3>
                  <p className="text-[#EDE8E3] font-normal drop-shadow-sm" style={{ fontFamily: '"Noto Serif SC", serif' }}>期待与您的每一次通话</p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-xl border border-white/10 w-full justify-between group">
                  <span className="text-xl text-[#EDE8E3] font-mono tracking-wider font-semibold drop-shadow-sm">19855535582</span>
                  <button 
                    onClick={handleCopy}
                    className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                    title="复制号码"
                  >
                    {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  </button>
                </div>
                
                <a 
                  href="tel:19855535582"
                  className="w-full py-3 bg-white/15 border border-white/40 text-[#EDE8E3] font-medium rounded-xl hover:bg-white/25 transition-colors backdrop-blur-sm"
                  style={{ fontFamily: '"Noto Serif SC", serif' }}
                >
                  立即拨打
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
