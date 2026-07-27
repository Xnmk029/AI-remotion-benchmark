import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ReferenceFrameHUD, ReferenceWaves, WhaleIcon } from './Backgrounds';

export const SilhouetteSequence: React.FC = () => {
  const frame = useCurrentFrame(); // local frame (0..300)
  const { fps } = useVideoConfig();

  // Pulse 1: frame 60
  const pulse1Spring = spring({
    frame: frame - 60,
    fps,
    config: { mass: 0.4, damping: 7, stiffness: 220 },
  });

  const pulse1Scale = interpolate(pulse1Spring, [0, 1], [1, 1.28]);
  const pulse1Decay = interpolate(frame, [80, 120], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse1Value = (pulse1Scale - 1) * pulse1Decay;

  // Pulse 2: frame 180
  const pulse2Spring = spring({
    frame: frame - 180,
    fps,
    config: { mass: 0.5, damping: 6, stiffness: 250 },
  });

  const pulse2Scale = interpolate(pulse2Spring, [0, 1], [1, 1.45]);
  const pulse2Decay = interpolate(frame, [200, 260], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse2Value = (pulse2Scale - 1) * pulse2Decay;

  const baseScale = 1.1 + Math.sin(frame * 0.05) * 0.02;
  const totalScale = baseScale + pulse1Value + pulse2Value;

  // Pulse Flash Overlay
  const flashOpacity = Math.max(
    interpolate(frame, [60, 68, 90], [0, 0.5, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
    interpolate(frame, [180, 188, 210], [0, 0.7, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  );

  // Sweep masks
  const sweep1Pos = interpolate(frame, [70, 95], [-120, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const sweep2Pos = interpolate(frame, [190, 215], [-120, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#EFF5FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
      }}
    >
      <ReferenceFrameHUD />
      <ReferenceWaves color="#7CB1FF" />

      {/* Floating Background Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          opacity: 0.08,
          transform: 'scale(3.5)',
          pointerEvents: 'none',
        }}
      >
        <WhaleIcon size={140} color="#1D6AFF" />
      </div>

      {/* Flash Background Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#1D6AFF',
          opacity: flashOpacity,
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Top Chinese Status Card */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 4,
        }}
      >
        <div
          style={{
            backgroundColor: '#FF3B30',
            color: '#FFFFFF',
            padding: '6px 20px',
            borderRadius: '20px',
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '2px',
            boxShadow: '0 4px 15px rgba(255, 59, 48, 0.4)',
          }}
        >
          ● 高能反应锁定
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#0B2B68',
            letterSpacing: '6px',
            transform: 'skewX(-4deg)',
          }}
        >
          深度未知生命体检测中
        </div>
      </div>

      {/* Character Silhouette */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${totalScale})`,
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 15px 35px rgba(29, 106, 255, 0.4))',
          zIndex: 3,
        }}
      >
        <Img
          src={staticFile('vtuber/vtuber_silhouette.png')}
          style={{
            maxHeight: '900px',
            objectFit: 'contain',
            filter: 'brightness(0) drop-shadow(0 0 12px #1D6AFF)',
          }}
        />
      </div>

      {/* White Sweep Lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sweep1Pos}%`,
          width: '200px',
          backgroundColor: '#FFFFFF',
          transform: 'skewX(-30deg)',
          opacity: 0.85,
          boxShadow: '0 0 60px #FFFFFF, 0 0 100px #60A5FA',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sweep2Pos}%`,
          width: '280px',
          backgroundColor: '#FFFFFF',
          transform: 'skewX(-35deg)',
          opacity: 0.9,
          boxShadow: '0 0 70px #FFFFFF, 0 0 120px #FF3B30',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  );
};
