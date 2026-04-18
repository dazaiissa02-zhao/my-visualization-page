export const anchorStoryData = {
  intro: {
    eyebrow: 'A desktop anchor for deep work',
    titleEn: 'Anchor',
    titleCn: '锚',
    subtitle: '一个桌面端的锚点应用 · 视觉草图',
    summary: [
      '很多分心并不是因为事情太难，而是因为脑子里冒出的岔念，总让当前这件事被带走。Anchor 想做的不是更强势地管理你，而是替你把当下这件事轻轻按住。',
      '它把“接住念头”和“处理念头”拆开：专注时只守住眼前，结束后再回头整理。整个界面的气质，也因此应该安静、温热、克制。',
    ],
  },
  scenes: [
    {
      id: 'focus',
      numeral: 'I',
      title: '主窗口 · 专注中',
      subtitle: 'main window / focusing',
      layout: 'full',
      paragraphs: [
        '这是 Anchor 最核心的一帧。倒计时放到最大，整个环境退到画面之后。琥珀黄只做一件事: 标记当前的焦点。其他所有东西都不和它争。',
      ],
    },
    {
      id: 'idle',
      numeral: 'II',
      title: '主窗口 · 待锚定',
      subtitle: 'main window / ready to anchor',
      layout: 'split-right',
      paragraphs: [
        '还没开始的时候，系统不替你选方向。它只问一句“现在要定个什么”。你说了，它才开始计时。',
      ],
    },
    {
      id: 'capture',
      numeral: 'III',
      title: '菜单栏 · 即时捕捉',
      subtitle: 'menubar / hover & capture',
      layout: 'split-left',
      paragraphs: [
        'Anchor 最日常的动作，不在主窗口里，而在菜单栏上。按下快捷键，写完就收起，不打断当前锚点。这是它区别于普通计时器的地方。',
      ],
    },
    {
      id: 'saved',
      numeral: 'IV',
      title: '存草 · 两种形态',
      subtitle: 'capture / drafting & saved',
      layout: 'stacked',
      paragraphs: [
        '从“想法正在输入”到“已接住”，界面只做最小的变化。背景从纸白变成淡琥珀，一个勾。不弹窗，不播放音效，不跳路径。',
      ],
    },
    {
      id: 'checkpoint',
      numeral: 'V',
      title: '锚定结束 · Checkpoint',
      subtitle: 'checkpoint / what did this block leave behind',
      layout: 'split-right',
      paragraphs: [
        '25 分钟到了，Anchor 不自动进入下一段，先停下来问一句: 这段你留下了什么？这个停顿，是它最想保护的东西。',
      ],
    },
    {
      id: 'review',
      numeral: 'VI',
      title: '今日回顾',
      subtitle: 'daily review / only keep the trace',
      layout: 'split-left',
      paragraphs: [
        '一天结束时只看三件事: 你锚定了几段、花了多久、留下了什么。不统计效率，不算专注分数，不做排行榜。只留下轨迹。',
      ],
    },
    {
      id: 'inbox',
      numeral: 'VII',
      title: '收草棚 · Inbox',
      subtitle: 'inbox / thoughts waiting for a decision',
      layout: 'centered',
      paragraphs: [
        '没有被立刻锚定的念头都归这里。Inbox 不是待办清单，而是等着被决定去向的东西。它可以被锚定、被归档，也可以被忘掉。',
      ],
    },
  ],
  principles: [
    {
      label: 'Color',
      title: 'Warm Paper',
      body: '纸色负责承托，琥珀只负责提醒当前焦点，墨绿留给完成态。颜色不是装饰，而是秩序。',
    },
    {
      label: 'Type',
      title: 'Serif, Not Noise',
      body: '中文用 Noto Serif SC，英文和数字交给 Garamond 系列。信息像页边批注，而不是控制台。',
    },
    {
      label: 'Principle',
      title: 'Catch, Then Decide',
      body: '先接住，再处理。专注时不引导发散，复盘时再决定去向。界面必须体现这个先后顺序。',
    },
    {
      label: 'State',
      title: 'Quiet Feedback',
      body: '已完成用墨绿，已保存只给一个勾。反馈存在，但永远不比当前任务更响亮。',
    },
  ],
  ending: {
    note:
      '我没有在专注阶段接入 AI。因为对话最容易放大发散，而 Anchor 的整个产品假设，就是此刻不要再多一条岔路。',
    signature: 'Anchor · Visual Draft · Zhao · 2026',
  },
};
