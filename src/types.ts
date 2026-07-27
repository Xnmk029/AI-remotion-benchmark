export interface VideoClipItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  category: 'Game Engine' | 'Physics & Simulation' | 'UI & WebGL' | 'VFX & Kinetic';
  filename: string;
  durationInFrames: number;
  accentColor: string;
  glowColor: string;
  description: string;
}

export interface ShowreelConfig {
  fps: number;
  width: number;
  height: number;
  introDurationInFrames: number;
  outroDurationInFrames: number;
  transitionDurationInFrames: number;
}
