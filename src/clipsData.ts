export interface ProjectItem {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  category: string;
  categoryEn: string;
  filename: string;
  reviewZh: string; // PDF 真实评语
  reviewEn: string; // 英文评语
  review?: string; // Legacy fallback
  rating: number; // PDF 真实评分
  ratingTier: 'S TIER' | 'A TIER' | 'B TIER' | 'C TIER' | 'FAIL';
  primaryColor: string;
  surfaceContainer?: string;
  onSurface?: string;
  tags: string[];
  architectureCodeSnippet?: string;
  durationInSeconds: number; // EXACT FULL VIDEO DURATION
  durationInFrames: number; // EXACT FULL VIDEO DURATION AT 30 FPS
  introCardDuration: number; // Frozen collage intro duration (90 frames = 3.0s at 30fps)
}

export const TARGET_FPS = 30;
export const OVERALL_BENCHMARK_SCORE = 5.8;
export const BGM_FILENAME = 'chillhop.mp3';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'tps-demo',
    title: '300 TPS 极速吞吐生成展示',
    titleEn: '300 TPS Ultra-Fast Output Demo',
    subtitle: '谷歌最强大且最快速的模型生成测试',
    subtitleEn: 'Google High-Speed Generation Benchmark',
    category: '性能测试',
    categoryEn: 'Performance',
    filename: 'TPS展示.mp4',
    reviewZh: '有着极高的300TPS输出速度，虽然智能在如今已然掉落第一梯队，但它仍然是谷歌目前最强大同时最快速的模型。',
    reviewEn: 'Featuring an ultra-fast output speed of 300 TPS. Although its intelligence is no longer tier-1 today, it remains Google\'s most powerful and fastest model.',
    review: '有着极高的300TPS输出速度，虽然智能在如今已然掉落第一梯队，但它仍然是谷歌目前最强大同时最快速的模型。',
    rating: 7.0,
    ratingTier: 'B TIER',
    primaryColor: '#00f0ff',
    tags: ['300 TPS', 'Speed Benchmark', 'Google DeepMind'],
    durationInSeconds: 10.928,
    durationInFrames: Math.round(10.928 * 30), // 328 frames
    introCardDuration: 90, // 3.0s @ 30fps
  },
  {
    id: 'wishbone-suspension',
    title: '双叉臂悬架模拟',
    titleEn: 'Double Wishbone Kinematics',
    subtitle: '底盘侧倾角与外倾角机构仿真',
    subtitleEn: 'Automotive Suspension Simulation',
    category: '力学仿真',
    categoryEn: 'Physics',
    filename: '双叉臂.mp4',
    reviewZh: '修复6轮对话；可以显示，但是随意操作都会崩溃。',
    reviewEn: 'Fixed after 6 turns; renders, but crashes on arbitrary interaction.',
    review: '修复6轮对话；可以显示，但是随意操作都会崩溃。',
    rating: 4.0,
    ratingTier: 'C TIER',
    primaryColor: '#00b0ff',
    tags: ['Kinematics', 'Mechanical', 'Vector Geometry'],
    durationInSeconds: 33.768,
    durationInFrames: Math.round(33.768 * 30), // 1013 frames
    introCardDuration: 90,
  },
  {
    id: 'game-2048',
    title: '3D Roguelike 2048',
    titleEn: '2048 Roguelike Motion Engine',
    subtitle: '方块合并缓动与技能驱动机制',
    subtitleEn: 'Eased Tile Merging & Skill Mechanics',
    category: '游戏开发',
    categoryEn: 'Game Dev',
    filename: '2048.mp4',
    reviewZh: '一轮直出；画面渲染不好看，但动效合理；数值完全错误，玩法单一。',
    reviewEn: 'Single-shot; poor rendering, reasonable motion; incorrect numerical logic, limited gameplay.',
    review: '一轮直出；画面渲染不好看，但动效合理；数值完全错误，玩法单一。',
    rating: 5.0,
    ratingTier: 'B TIER',
    primaryColor: '#ff4081',
    tags: ['Grid Engine', 'Easing Physics', 'Matrix Logic'],
    durationInSeconds: 18.00,
    durationInFrames: Math.round(18.00 * 30), // 540 frames
    introCardDuration: 90,
  },
  {
    id: 'rtx-raytracing',
    title: '路径光线追踪测试房间',
    titleEn: 'RTX Real-Time Raytracing',
    subtitle: 'BVH 加速结构与全局光照求解',
    subtitleEn: 'BVH Acceleration & Global Illumination',
    category: '图形渲染',
    categoryEn: 'Graphics',
    filename: 'RTX.mp4',
    reviewZh: '四轮修复；性能不稳定，一分钟左右白屏；降噪效果基本为0。',
    reviewEn: '4 repair turns; unstable performance, white screen in 1 min; zero denoise.',
    review: '四轮修复；性能不稳定，一分钟左右白屏；降噪效果基本为0。',
    rating: 4.0,
    ratingTier: 'C TIER',
    primaryColor: '#ffab00',
    tags: ['Ray Tracing', 'BVH Tree', 'Reflection Shaders'],
    durationInSeconds: 46.15,
    durationInFrames: Math.round(46.15 * 30), // 1385 frames
    introCardDuration: 90,
  },
  {
    id: 'balatro',
    title: '小丑牌 Roguelike 复刻',
    titleEn: 'Balatro Rogue-Lite Poker',
    subtitle: '漩涡 Shader 与复古 CRT 滤镜',
    subtitleEn: 'Vortex Shaders & Dynamic Deck Mechanics',
    category: '游戏开发',
    categoryEn: 'Game Dev',
    filename: '小丑牌.mp4',
    reviewZh: '一轮直出；部分UI显示异常，相似度较差；性能开销极高，大量滥用 Emoji。',
    reviewEn: 'Single-shot; UI glitches, low fidelity to original; extreme performance cost, excessive emojis.',
    review: '一轮直出；部分UI显示异常，相似度较差；性能开销极高，大量滥用 Emoji。',
    rating: 4.0,
    ratingTier: 'C TIER',
    primaryColor: '#ff1744',
    tags: ['Shader Graph', 'CRT Filter', 'Rogue-lite'],
    durationInSeconds: 28.75,
    durationInFrames: Math.round(28.75 * 30), // 863 frames
    introCardDuration: 90,
  },
  {
    id: 'svg-motion',
    title: '复合弓 SVG 贝塞尔绘制',
    titleEn: 'SVG Composite Bow Morphing',
    subtitle: '路径动画与机械结构变形',
    subtitleEn: 'Keyframe Morph & Path Animation Engine',
    category: '矢量动效',
    categoryEn: 'Vector VFX',
    filename: 'SVG.mp4',
    reviewZh: '一轮直出；滑轮结构有误，弓臂方向错误；但整体动画流畅，功能齐全。',
    reviewEn: 'Single-shot; incorrect pulley/arm structure; smooth animation, feature-complete.',
    review: '一轮直出；滑轮结构有误，弓臂方向错误；但整体动画流畅，功能齐全。',
    rating: 6.5,
    ratingTier: 'B TIER',
    primaryColor: '#00e676',
    tags: ['SVG Path', 'Bezier Curves', 'Morphing FX'],
    durationInSeconds: 36.02,
    durationInFrames: Math.round(36.02 * 30), // 1081 frames
    introCardDuration: 90,
  },
  {
    id: 'fpv-flight',
    title: 'SO(3) FPV 穿梭机模拟器',
    titleEn: 'SO(3) FPV Flight Simulator',
    subtitle: '四轴空气动力学与 3D 地形',
    subtitleEn: 'Quadcopter Aerodynamics & 3D Terrain',
    category: '物理引擎',
    categoryEn: 'Physics Engine',
    filename: 'FPV.mp4',
    reviewZh: '三轮输出；SO(3) 角度换算混乱导致无法控制；未应用天空盒与 HDRI 贴图。',
    reviewEn: '3-turn output; broken SO(3) angle math, unmanageable control; missing skybox/HDRI.',
    review: '三轮输出；SO(3) 角度换算混乱导致无法控制；未应用天空盒与 HDRI 贴图。',
    rating: 4.0,
    ratingTier: 'C TIER',
    primaryColor: '#e040fb',
    tags: ['Aerodynamics', 'PID Loop', 'Three.js'],
    durationInSeconds: 56.72,
    durationInFrames: Math.round(56.72 * 30), // 1702 frames
    introCardDuration: 90,
  },
  {
    id: 'frontend-architecture',
    title: '模块化前端 UI 搭建',
    titleEn: 'Modular Frontend UI Systems',
    subtitle: '组件解耦与响应式布局',
    subtitleEn: 'Decoupled Tokens & Micro-Interactions',
    category: 'UI 交互',
    categoryEn: 'UI Systems',
    filename: '前端.mp4',
    reviewZh: '一轮直出；整体画面庸俗 AI 味重，使用了不符合风格的蓝粉渐变；内存高达 300MB。',
    reviewEn: 'Single-shot; generic AI gradient aesthetics; severe memory overhead (300MB).',
    review: '一轮直出；整体画面庸俗 AI 味重，使用了不符合风格的蓝粉渐变；内存高达 300MB。',
    rating: 4.0,
    ratingTier: 'C TIER',
    primaryColor: '#d500f9',
    tags: ['React 18', 'UI Design', 'Micro-Interactions'],
    durationInSeconds: 17.60,
    durationInFrames: Math.round(17.60 * 30), // 528 frames
    introCardDuration: 90,
  },
  {
    id: 'teardown',
    title: 'Teardown 风格体素摧毁沙盘',
    titleEn: 'Teardown Voxel Destruction Sim',
    subtitle: '刚体碰撞与光线步进渲染',
    subtitleEn: 'Rigid-Body Collision & Ray-Marching Engine',
    category: '物理引擎',
    categoryEn: 'Physics Engine',
    filename: 'teardown复刻沙盘.mp4',
    reviewZh: '一轮直出；水面有小巧思，参考了提示词；但缺少天空盒与桌面，画面较油腻。',
    reviewEn: 'Single-shot; clever water details; follows prompt, but lacks skybox/table; oily style.',
    review: '一轮直出；水面有小巧思，参考了提示词；但缺少天空盒与桌面，画面较油腻。',
    rating: 4.5,
    ratingTier: 'C TIER',
    primaryColor: '#ff9100',
    tags: ['Voxel Physics', 'Ray Marching', 'Destruction Sim'],
    durationInSeconds: 43.69,
    durationInFrames: Math.round(43.69 * 30), // 1311 frames
    introCardDuration: 90,
  },
  {
    id: 'magic-tower',
    title: '魔塔策略 RPG 复刻',
    titleEn: 'Magic Tower Strategy Dungeon Crawler',
    subtitle: '像素地图与伤害数值推演',
    subtitleEn: 'Retro Tile Engine & Damage Deductions',
    category: '游戏开发',
    categoryEn: 'Game Dev',
    filename: '魔塔.mp4',
    reviewZh: '一轮直出；第二关关卡死锁；玩法还原度尚可，但滥用 Emoji。',
    reviewEn: 'Single-shot; level 2 deadlock bug; decent gameplay logic, excessive emojis.',
    review: '一轮直出；第二关关卡死锁；玩法还原度尚可，但滥用 Emoji。',
    rating: 4.0,
    ratingTier: 'C TIER',
    primaryColor: '#2979ff',
    tags: ['Tilemap System', 'RPG Mechanics', 'State Machine'],
    durationInSeconds: 50.68,
    durationInFrames: Math.round(50.68 * 30), // 1520 frames
    introCardDuration: 90,
  },
  {
    id: 'cfd-fluid',
    title: '液体 CFD 3D 流体模拟',
    titleEn: '3D CFD Fluid Dynamics Simulation',
    subtitle: '纳维-斯托克斯网格速度场解算',
    subtitleEn: 'Navier-Stokes Grid Velocity & Smoke Sim',
    category: '物理引擎',
    categoryEn: 'Physics Engine',
    filename: 'CFD.mp4',
    reviewZh: '一轮直出；粒子无碰撞解算，性能开销极大，判定死刑。',
    reviewEn: 'Single-shot; no particle collisions, massive lag; critical failure.',
    review: '一轮直出；粒子无碰撞解算，性能开销极大，判定死刑。',
    rating: 2.0,
    ratingTier: 'FAIL',
    primaryColor: '#00e676',
    tags: ['WebGL 2.0', 'GPGPU', 'Fluid Mechanics'],
    durationInSeconds: 15.52,
    durationInFrames: Math.round(15.52 * 30), // 466 frames
    introCardDuration: 90,
  },
  {
    id: 'watch-dogs',
    title: '看门狗 2 黑客 HUD 界面',
    titleEn: 'Watch Dogs 2 Cyberpunk HUD',
    subtitle: '动态 Glitch 与节点交互系统',
    subtitleEn: 'Dynamic Glitch & Ambient Audio UI System',
    category: 'UI 交互',
    categoryEn: 'UI Systems',
    filename: '看门狗UI复刻.mp4',
    reviewZh: 'UI相对较为还原，但是选项的字体跳动动效没有还原，同时UX设计用力过猛。',
    reviewEn: 'UI is relatively accurate, but option font glitch animations were omitted; UX design is over-engineered.',
    review: 'UI相对较为还原，但是选项的字体跳动动效没有还原，同时UX设计用力过猛。',
    rating: 6.0,
    ratingTier: 'B TIER',
    primaryColor: '#00f0ff',
    tags: ['React 18', 'Canvas API', 'Audio Synthesizer'],
    durationInSeconds: 33.43,
    durationInFrames: Math.round(33.43 * 30), // 1003 frames
    introCardDuration: 90,
  },
  {
    id: 'knowledge-graph',
    title: '3D 交互式世界知识图谱',
    titleEn: '3D World Knowledge Graph',
    subtitle: '三维力导向节点关联网络',
    subtitleEn: '3D Force-Directed Node Network',
    category: '数据可视化',
    categoryEn: 'Data Viz',
    filename: '世界知识.mp4',
    reviewZh: '使用音乐乐理题目进行评测，模型达成了19题中15题正确的准确率。',
    reviewEn: 'Evaluated using music theory questions; model achieved 15/19 accuracy.',
    review: '使用音乐乐理题目进行评测，模型达成了19题中15题正确的准确率。',
    rating: 8.0,
    ratingTier: 'S TIER',
    primaryColor: '#651fff',
    tags: ['3D Graph', 'Force Layout', 'Three.js'],
    durationInSeconds: 14.81,
    durationInFrames: Math.round(14.81 * 30), // 444 frames
    introCardDuration: 90,
  },
  {
    // MOVED TO VERY LAST SEGMENT AS REQUESTED
    id: 'kinetic-typography',
    title: 'ASCII 代码绘图与动效',
    titleEn: 'ASCII Code Drawing & Kinetic Typography',
    subtitle: '矢量字符散化与 Spring 粒子物理',
    subtitleEn: 'Procedural Text Dispersal & Spring Motion',
    category: '矢量动效',
    categoryEn: 'Vector VFX',
    filename: '文字.mp4',
    reviewZh: '两轮输出；结构还原准确，粒子效果符合预期。',
    reviewEn: '2-turn output; accurate structure restoration, solid particle physics.',
    review: '两轮输出；结构还原准确，粒子效果符合预期。',
    rating: 6.5,
    ratingTier: 'B TIER',
    primaryColor: '#ffd600',
    tags: ['Canvas 2D', 'Kinetic Motion', 'Typography'],
    durationInSeconds: 125.08,
    durationInFrames: Math.round(125.08 * 30), // 3752 frames
    introCardDuration: 90,
  }
];

export const INTRO_SHOWCASE_DURATION = 90; // 3.0s @ 30fps
export const OUTRO_SHOWCASE_DURATION = 105; // 3.5s @ 30fps
