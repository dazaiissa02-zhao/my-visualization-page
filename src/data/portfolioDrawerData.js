// 第四页「星辰涌现」——三个作品的抽屉弹窗内容
// 文案来源：规格书 §4，严格照抄，不做任何修改
// 每个对象对应一颗星球（id 对应 page4Data.json 里的 orb.id）

export const portfolioDrawerData = [
  // ─────────────────────────────────────────────
  // 作品一：个人可视化网页
  // ─────────────────────────────────────────────
  {
    id: 1,
    // 顶栏状态标签
    statusLabel: '已上线',
    statusType: 'green', // green | gray

    // 顶栏出口链接
    exitLink: {
      label: '在线访问',
      url: 'https://zhaoxiaoting.vercel.app/',
    },

    // 作品名区域
    title: '个人可视化网页',
    subtitle: '让一次自我介绍，变成一段可被走进的旅程',

    // 主视觉位：作品一直接通过外链访问，不再展示占位截图
    visual: {
      type: 'none',
    },

    // 正文——三个小标题段落
    // content 里用 \n\n 分隔换行段落，渲染时会分成多个 <p>
    sections: [
      {
        heading: '我想解决的问题',
        content:
          'PDF 简历只能告诉面试官"我做过什么"，却很难让人感觉到"我是什么样的人"。于是我把它重新定义成了一次信息产品设计：用户是面试官，场景是短时间扫读，目标是让对方在最短的路径里，对我建立一个立体的印象。',
      },
      {
        heading: '我做的取舍',
        content:
          '整份网页以一次宇宙旅程为线索，五页各自只回答一个问题：我是谁、我从哪里来、我走过哪些路、我创造了什么、以及——我们还会再相遇。\n\n交互只出现在关键节点，而不是到处都动。因为我希望您是在"被一段叙事带着走"，而不是在评判一个作品站的动效密度。',
      },
      {
        heading: 'AI 在里面的角色',
        content:
          '从架构推演到代码落地，这份网页全程由 AI 协作完成。但真正决定每一页长什么样的，始终是我对"什么该被看见、什么应该留白"的判断。AI 让实现的门槛降了下来，被放大的，反而是人的审美和取舍。',
      },
    ],

    // 底部收束区
    footer: {
      // 技术栈 chips
      chips: ['React', 'Vite', 'Framer Motion', 'Tailwind', 'Vercel'],
      // 相关仓库 chips（作品一没有）
      repoChips: null,
      // 链接
      links: [
        { label: '🔗 在线访问', url: 'https://zhaoxiaoting.vercel.app/' },
        {
          label: '📂 GitHub 仓库',
          url: 'https://github.com/dazaiissa02-zhao/my-visualization-page',
        },
      ],
      // 附注（作品一没有）
      note: null,
      // 引语（作品一有）
      quote: '愿您在这段星轨里，看见我想让您看见的那个我。',
    },
  },

  // ─────────────────────────────────────────────
  // 作品二：Anchor
  // ─────────────────────────────────────────────
  {
    id: 2,
    statusLabel: 'iOS 原生 · 开发中',
    statusType: 'gray',

    exitLink: {
      label: 'GitHub',
      url: 'https://github.com/dazaiissa02-zhao/Anchor',
    },

    title: 'Anchor',
    subtitle: '在念头分叉的时刻，替您守住当下这件事',

    // 主视觉位：可直接浏览的 Anchor 视觉草图
    visual: {
      type: 'anchor-story',
    },

    sections: [
      {
        heading: '我看到的问题',
        content:
          '很多工作不是被难度打断的，而是被自己打断的——做着做着，脑子里冒出一个相关的念头，那个念头又牵出另一件要查的事、一条要发的消息。每一个分支看起来都合理，但当前这件事，始终没有真正深入下去。',
      },
      {
        heading: '我做的判断',
        content:
          '问题不在于这些念头没有价值，恰恰相反，它们往往是有价值的。真正的问题是——一旦您决定"现在就处理它"，当前这件事，就被带走了。\n\n所以 Anchor 做的事情很小：它只想把"接住念头"和"处理念头"这两个动作分开。',
      },
      {
        heading: '一个我刻意没做的决定',
        content:
          '我没有在专注阶段接入 AI。因为对话最容易放大发散，而 Anchor 的整个产品假设，就是"此刻不要再多一条岔路"。\n\n这件事本身也体现了我对 AI 产品的态度：不是哪里都该接 AI，AI 也需要被产品边界约束。',
      },
    ],

    footer: {
      chips: ['SwiftUI', 'iOS 原生'],
      repoChips: null,
      links: [
        {
          label: '📂 GitHub 仓库',
          url: 'https://github.com/dazaiissa02-zhao/Anchor',
        },
      ],
      // 作品二有附注，无引语（气质克制）
      note: '产品仍在迭代中',
      quote: null,
    },
  },

  // ─────────────────────────────────────────────
  // 作品三：AI 赋能的 PM 工作流
  // ─────────────────────────────────────────────
  {
    id: 3,
    statusLabel: '方法沉淀',
    statusType: 'gray',

    exitLink: {
      label: 'GitHub 主页',
      url: 'https://github.com/dazaiissa02-zhao/prototype-hub',
    },

    title: 'AI 赋能的 PM 工作流',
    subtitle: '不是一份工具清单，而是一种工作方式的重新组织',

    // 主视觉位：两张可点击的交互原型图
    visual: {
      type: 'prototype-gallery',
      items: [
        {
          title: 'MJ Prototype',
          src: '/MJ7 prototype.png',
          url: 'https://dazaiissa02-zhao.github.io/prototype-hub/prototypes/mj7/',
        },
        {
          title: 'MiniMax Prototype',
          src: '/MiniMax speech prototype.png',
          url: 'https://dazaiissa02-zhao.github.io/prototype-hub/prototypes/minimax-speech/',
        },
      ],
    },

    sections: [
      {
        heading: '我想解决的问题',
        content:
          '大家都在讲 AI 提效，但很多所谓的"提效"其实只是零散的加速——今天让它写一段，明天让它总结一份。工具越来越多，方法却没有沉淀下来。\n\n对横跨输入、分析、输出、沉淀四段工作的 PM 来说，这种零散的用法只会让流程更碎。',
      },
      {
        heading: '我做的判断',
        content:
          '所以我没有从"找最好用的工具"开始，而是先把自己的工作拆成四段，再判断每一段里什么适合交给 AI，什么必须由人来保留。\n\nAI 最适合承接的，是高重复、重整理、重结构化的部分。而真正的产品判断、优先级取舍、目标定义和结果验收——必须留在我这里。',
      },
      {
        heading: '我最想说的一件事',
        content:
          'AI 时代里，PM 的竞争力不在于"会不会用工具"，而在于"能不能先把一项复杂工作，拆成可执行的结构"。\n\n结构清晰时，AI 才能真正进入流程；结构不清晰时，它只会制造更多的噪音。',
      },
    ],

    footer: {
      chips: null,
      repoChips: [
        {
          label: 'prototype-hub',
          url: 'https://github.com/dazaiissa02-zhao/prototype-hub',
        },
      ],
      links: [
        { label: '📂 GitHub 主页', url: 'https://github.com/dazaiissa02-zhao/prototype-hub' },
      ],
      note: null,
      quote: '工具在变，但做事的人，始终是自己。',
    },
  },
];
