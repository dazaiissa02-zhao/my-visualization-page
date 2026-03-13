import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Phone, X, Copy, Check, ChevronDown, Mail } from 'lucide-react';
// Resume file is now served from public folder
const resumeUrl = '/赵晓婷-上海大学-26届-产品经理.pdf';

export default function Page1() {
  const [bgLoaded, setBgLoaded] = useState(true); // Always true as background is handled globally
  const [showContactModal, setShowContactModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const lines = [
    "Hello! I am ",
    "赵晓婷",
    "一粒加速自转，拼命发光的小行星",
    "非常高兴在此与您相遇",
    "愿我们星轨相接的片刻，能带给您片刻欢欣"
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

  const handleEmailCopy = () => {
    navigator.clipboard.writeText('zxt.zz@foxmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Create download link dynamically or use an anchor tag directly
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = '赵晓婷-上海大学-26届-产品经理.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Common text styles - Removed common drop-shadow to apply specific glowing effects
  const commonTextStyle = "text-white";

  return (
    <motion.div 
      className="w-full h-full relative overflow-hidden bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center px-6 w-full max-w-3xl mx-auto">
        <div className="relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={bgLoaded ? "visible" : "hidden"}
            viewport={{ once: false }}
            className="space-y-5"
          >
            {lines.map((line, index) => {
              // Special handling for the name line: display only the name, no prefix
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
                    // MODIFY HERE: Font Size and Styling
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
          
          <style>{`
            @keyframes phoneRing {
              0%, 100% { transform: rotate(0deg); }
              15% { transform: rotate(-15deg); }
              30% { transform: rotate(12deg); }
              45% { transform: rotate(-10deg); }
              60% { transform: rotate(8deg); }
              75% { transform: rotate(-5deg); }
            }
          `}</style>
          
          <div className="mt-12 flex flex-wrap gap-6 justify-center items-center">
            {/* Download Button */}
            <motion.button
              className="group pointer-events-auto flex items-center gap-3 px-8 py-3 rounded-full 
                bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)] 
                text-[rgba(255,255,255,0.95)] backdrop-blur-sm transition-colors duration-300
                hover:bg-[rgba(255,255,255,0.22)] hover:border-[rgba(255,255,255,0.9)] hover:text-white 
                hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
              style={{
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)"
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={bgLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                opacity: { delay: 2.0, duration: 0.8 },
                y: { delay: 2.0, duration: 0.8 },
                scale: { duration: 0.2 }
              }}
              onClick={handleDownload}
            >
              <Download size={20} className="drop-shadow-[0_0_3px_rgba(255,255,255,0.8)] opacity-100" />
              <span className="text-lg font-light tracking-widest font-serif drop-shadow-[0_0_3px_rgba(255,255,255,0.8)] opacity-100" style={{ fontFamily: '"Noto Serif SC", serif' }}>星图下载</span>
            </motion.button>

            {/* Contact Button */}
            <motion.button
              className="group pointer-events-auto flex items-center gap-3 px-8 py-3 rounded-full 
                bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.6)] 
                text-[rgba(255,255,255,0.95)] backdrop-blur-sm transition-colors duration-300
                hover:bg-[rgba(255,255,255,0.22)] hover:border-[rgba(255,255,255,0.9)] hover:text-white
                hover:shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
              style={{
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.3)"
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={bgLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                opacity: { delay: 2.2, duration: 0.8 },
                y: { delay: 2.2, duration: 0.8 },
                scale: { duration: 0.2 }
              }}
              onClick={() => setShowContactModal(true)}
            >
              <Phone size={20} className="drop-shadow-[0_0_3px_rgba(255,255,255,0.8)] opacity-100" />
              <span className="text-lg font-light tracking-widest font-serif drop-shadow-[0_0_3px_rgba(255,255,255,0.8)] opacity-100" style={{ fontFamily: '"Noto Serif SC", serif' }}>星轨相接</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1 }}
      >
        <div 
          className="flex flex-col items-center gap-1"
          style={{ 
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.95rem',
            color: 'rgba(255, 255, 255, 0.75)',
            textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: 300
          }}
        >
          <span className="tracking-widest">3 minutes · a journey to know a person, beyond the paper</span>
          <span style={{ letterSpacing: '0.2em', marginTop: '6px' }}>let's go</span>
        </div>
        
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-2"
        >
          <ChevronDown className="text-white/60" size={24} />
        </motion.div>
      </motion.div>

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

                <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-xl border border-white/10 w-full justify-between group">
                  <span className="text-lg text-[#EDE8E3] font-mono tracking-wider font-semibold drop-shadow-sm truncate">zxt.zz@foxmail.com</span>
                  <button 
                    onClick={handleEmailCopy}
                    className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg shrink-0"
                    title="复制邮箱"
                  >
                    {emailCopied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  </button>
                </div>
                
                <div className="flex gap-3 w-full">
                  <a 
                    href="tel:19855535582"
                    className="flex-1 py-3 bg-white/15 border border-white/40 text-[#EDE8E3] font-medium rounded-xl hover:bg-white/25 transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    <Phone size={18} />
                    立即拨打
                  </a>
                  <a 
                    href="mailto:zxt.zz@foxmail.com"
                    className="flex-1 py-3 bg-white/15 border border-white/40 text-[#EDE8E3] font-medium rounded-xl hover:bg-white/25 transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
                    style={{ fontFamily: '"Noto Serif SC", serif' }}
                  >
                    <Mail size={18} />
                    发送邮件
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
