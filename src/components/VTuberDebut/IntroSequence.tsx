import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { ReferenceFrameHUD, ReferenceWaves, WhaleIcon } from './Backgrounds';

export const IntroSequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Text 1: "系统启动中..." (20-140)
  const text1Opacity = interpolate(
    frame,
    [20, 50, 110, 140],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const text1Scale = interpolate(
    frame,
    [20, 140],
    [0.92, 1.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Text 2: "深海信号已连接..." (150-280)
  const text2Opacity = interpolate(
    frame,
    [150, 180, 240, 280],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const text2Scale = interpolate(
    frame,
    [150, 280],
    [0.92, 1.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Progress 0..100%
  const progress = Math.min(
    100,
    Math.floor(
      interpolate(frame, [20, 270], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    )
  );

  // Glitch jitter
  const isGlitching =
    (frame >= 45 && frame <= 52) ||
    (frame >= 120 && frame <= 126) ||
    (frame >= 170 && frame <= 176) ||
    (frame >= 250 && frame <= 258);

  const glitchX = isGlitching ? Math.sin(frame * 88) * 10 : 0;
  const glitchY = isGlitching ? Math.cos(frame * 66) * 5 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, #051329 0%, #0A2246 50%, #061124 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
        overflow: 'hidden',
      }}
    >
      <ReferenceFrameHUD darkTheme />
      <ReferenceWaves color="rgba(37, 117, 255, 0.4)" />

      {/* Floating Whale Icon Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '100px',
          opacity: 0.15,
          transform: 'scale(2.5)',
          pointerEvents: 'none',
        }}
      >
        <WhaleIcon size={120} color="#00F0FF" />
      </div>

      {/* Coral Red Pill Badge */}
      <div
        style={{
          position: 'absolute',
          top: '140px',
          backgroundColor: '#FF3B30',
          color: '#FFFFFF',
          padding: '8px 24px',
          borderRadius: '30px',
          fontSize: '20px',
          fontWeight: 800,
          letterSpacing: '3px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 20px rgba(255, 59, 48, 0.5)',
        }}
      >
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 8px #FFFFFF',
          }}
        />
        直播准备中
      </div>

      {/* Center Text Phase 1 */}
      <div
        style={{
          position: 'absolute',
          opacity: text1Opacity,
          transform: `scale(${text1Scale}) translate(${glitchX}px, ${glitchY}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '76px',
            fontWeight: 900,
            letterSpacing: '6px',
            color: '#FFFFFF',
            textShadow: isGlitching
              ? '4px 0 #FF3B30, -4px 0 #00F0FF, 0 0 30px #2575FF'
              : '0 8px 30px rgba(37, 117, 255, 0.8)',
            transform: 'skewX(-4deg)',
          }}
        >
          系统启动中...
        </div>
        <div
          style={{
            marginTop: '16px',
            fontSize: '22px',
            letterSpacing: '4px',
            color: '#93C5FD',
            fontFamily: 'monospace',
          }}
        >
          SYSTEM BOOTING // CORE AI MATRIX v3.6
        </div>
      </div>

      {/* Center Text Phase 2 */}
      <div
        style={{
          position: 'absolute',
          opacity: text2Opacity,
          transform: `scale(${text2Scale}) translate(${-glitchX}px, ${-glitchY}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '76px',
            fontWeight: 900,
            letterSpacing: '6px',
            color: '#60A5FA',
            textShadow: isGlitching
              ? '-4px 0 #FF3B30, 4px 0 #FFFFFF, 0 0 30px #2575FF'
              : '0 8px 30px rgba(0, 240, 255, 0.8)',
            transform: 'skewX(-4deg)',
          }}
        >
          深海信号已连接...
        </div>
        <div
          style={{
            marginTop: '16px',
            fontSize: '22px',
            letterSpacing: '4px',
            color: '#FFFFFF',
            fontFamily: 'monospace',
          }}
        >
          DEEP SEA SIGNAL CONNECTED // 99.8%
        </div>
      </div>

      {/* Cyber Progress HUD */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          width: '640px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: '16px',
            color: '#93C5FD',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '2px',
          }}
        >
          <span>状态：信号接入中</span>
          <span>{progress}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #1D6AFF, #60A5FA)',
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </div>
  );
};
