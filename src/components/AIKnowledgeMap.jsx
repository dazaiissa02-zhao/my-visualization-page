import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, BookOpen, Brain, GitBranch, Target, Zap } from 'lucide-react';

const AIKnowledgeMap = ({ onClose }) => {
  const [activeStage, setActiveStage] = useState('stage1');

  const stages = [
    {
      id: 'stage1',
      title: '海量积累',
      subtitle: '预训练 (Pre-training)',
      icon: <BookOpen size={20} />,
      metaphor: '从出生到高考',
      desc: '就像一个学生在进入职场前，通过阅读海量书籍（互联网文本）来学习通用的语言规则和世界知识。这一阶段不需要知道具体的答案，而是通过“完形填空”来预测下一个字，从而学会语言的概率分布。',
      tech: ['Transformer 架构', '自监督学习', '海量语料清洗']
    },
    {
      id: 'stage2',
      title: '题海纠错',
      subtitle: '监督微调 (SFT)',
      icon: <Brain size={20} />,
      metaphor: '备考刷题',
      desc: '光看书不够，还要会做题。这一阶段引入了人工编写的高质量问答对（Q&A），就像老师给学生布置习题并提供标准答案。模型通过模仿这些标准回答，学会了如何遵循指令（Instruction Following）和特定格式输出。',
      tech: ['指令微调', 'Prompt Engineering', '思维链 (CoT)']
    },
    {
      id: 'stage3',
      title: '职场培训',
      subtitle: '人类反馈强化学习 (RLHF)',
      icon: <Target size={20} />,
      metaphor: '入职后的导师反馈',
      desc: '职场中很多问题没有标准答案，只有“好”与“更好”。这一阶段，人类作为裁判对模型的多个回答进行排序（打分），训练一个“奖励模型”。AI 为了获得更高的奖励，会不断调整策略，学习人类的价值观和偏好。',
      tech: ['PPO 算法', '奖励模型 (Reward Model)', '价值对齐']
    },
    {
      id: 'stage4',
      title: '独当一面',
      subtitle: 'Agent (智能体)',
      icon: <GitBranch size={20} />,
      metaphor: '项目经理',
      desc: '不仅能回答问题，还能使用工具。Agent 就像一个成熟的项目经理，接到一个模糊的目标（如“策划一次旅行”），能自主拆解任务、调用搜索工具、预订机票、甚至在遇到错误时自我修正，直到完成目标。',
      tech: ['ReAct 框架', '工具调用 (Function Calling)', '记忆模块 (Memory)']
    },
    {
      id: 'stage5',
      title: '外挂大脑',
      subtitle: 'RAG (检索增强生成)',
      icon: <Zap size={20} />,
      metaphor: '开卷考试',
      desc: '人脑容量有限，需要查阅资料。RAG 就是给 AI 配备了一个外挂知识库。在回答问题前，先去知识库里检索相关片段，然后结合检索到的信息生成答案。这解决了大模型“幻觉”和知识过时的问题。',
      tech: ['向量数据库', '语义检索', '上下文注入']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-6xl h-[85vh] bg-[#0F1115]/75 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row relative backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white/50 hover:text-white p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Sidebar: Navigation */}
        <div className="w-full md:w-[300px] bg-black/20 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-2xl font-serif text-white tracking-wider">AI 成长图谱</h2>
            <p className="text-white/40 text-xs mt-2 font-mono uppercase tracking-widest">Knowledge Graph</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative group flex items-center gap-4 ${
                  activeStage === stage.id 
                    ? 'bg-blue-500/10 border border-blue-500/30' 
                    : 'hover:bg-white/5 border border-transparent hover:border-white/5'
                }`}
              >
                {/* Connector Line */}
                {index < stages.length - 1 && (
                  <div className="absolute left-[29px] top-[50px] w-[1px] h-[30px] bg-white/5 z-0" />
                )}

                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                  activeStage === stage.id ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/10 text-white/40 group-hover:bg-white/20 group-hover:text-white'
                }`}>
                  {stage.icon}
                </div>
                
                <div>
                  <h3 className={`font-medium text-sm transition-colors ${activeStage === stage.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                    {stage.title}
                  </h3>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{stage.subtitle.split(' ')[0]}</p>
                </div>

                {activeStage === stage.id && (
                  <motion.div 
                    layoutId="active-arrow"
                    className="absolute right-4 text-blue-400"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content: Detail View */}
        <div className="flex-1 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0F1115] to-[#0F1115] relative overflow-hidden flex flex-col">
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          
          <AnimatePresence mode="wait">
            {stages.map((stage) => (
              activeStage === stage.id && (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex-1 p-8 md:p-12 overflow-y-auto relative z-10"
                >
                  {/* Header */}
                  <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
                      {stage.icon}
                      <span>{stage.metaphor}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
                      {stage.title}
                    </h1>
                    <h2 className="text-xl text-white/50 font-light tracking-wide font-mono">
                      {stage.subtitle}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="prose prose-invert prose-lg max-w-3xl mb-12">
                    <p className="text-lg leading-relaxed text-white/80 font-light">
                      {stage.desc}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4 border-b border-white/10 pb-2 inline-block">
                      关键技术概念
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {stage.tech.map((tech, i) => (
                        <div 
                          key={i}
                          className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-blue-200/80 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AIKnowledgeMap;