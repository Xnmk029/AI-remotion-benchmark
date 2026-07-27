import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const CyberIntro: React.FC<{
  totalProjectsCount: number;
}> = ({ totalProjectsCount }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Non-linear spring & bezier curves
  const titleSpring = spring({
    frame,
    fps,
    config: { mass: 0.9, damping: 12, stiffness: 100 },
  });

  const collageTranslateX = interpolate(
    frame,
    [0, 30, 80],
    [-100, 0, 0],
    { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp' }
  );

  const scale = interpolate(titleSpring, [0, 1], [0.85, 1]);
  const opacity = interpolate(frame, [0, 15], [0, 1]);

  const glitchActive = frame % 12 === 0 || (frame > 60 && frame < 66);
  const rgbShift = glitchActive
    ? '4px -2px 0px rgba(255, 0, 85, 0.8), -4px 2px 0px rgba(0, 240, 255, 0.8)'
    : 'none';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090c15',
        color: '#ffffff',
        fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
        opacity,
        overflow: 'hidden',
      }}
    >
      {/* Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Constructivism Diagonal Color Slice */}
      <div
        style={{
          position: 'absolute',
          top: '-30%',
          right: '-15%',
          width: '60%',
          height: '160%',
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(255, 0, 85, 0.2) 100%)',
          transform: `translateX(${collageTranslateX}%) skewX(-25deg)`,
          transformOrigin: 'top right',
        }}
      />

      {/* Oversized Background Typography (Collage Art) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 160,
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.03)',
          letterSpacing: 20,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        CONSTRUCTIVISM // MD3
      </div>

      {/* Content Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transform: `scale(${scale})`,
          zIndex: 10,
        }}
      >
        {/* Top MD3 Assist Chip */}
        <div
          style={{
            backgroundColor: 'rgba(0, 240, 255, 0.15)',
            border: '1.5px solid #00f0ff',
            padding: '8px 24px',
            borderRadius: 12,
            color: '#00f0ff',
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 24,
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.3)',
          }}
        >
          ✦ DIGITAL COLLAGE • GLITCH ART • MD3 REEL ✦
        </div>

        {/* Display Title */}
        <h1
          style={{
            fontSize: 82,
            fontWeight: 900,
            margin: 0,
            letterSpacing: 4,
            lineHeight: 1.05,
            color: '#ffffff',
            textShadow: rgbShift,
            background: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 60%, #ff0055 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          PROJECT SHOWCASE
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.85)',
            marginTop: 20,
            maxWidth: 850,
            letterSpacing: 1,
            lineHeight: 1.4,
          }}
        >
          非线性曲线动效 • <span style={{ color: '#00f0ff', fontWeight: 800 }}>{totalProjectsCount} 个特选硬核项目</span> • 深度测试评语与主观评分
        </p>

        {/* MD3 Rating Badges Preview */}
        <div style={{ display: 'flex', gap: 16, marginTop: 40 }}>
          {['9.9 BALATRO', '9.8 WATCH DOGS', '9.7 TEARDOWN', '9.6 CFD FLUID'].map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                padding: '8px 18px',
                borderRadius: 10,
                fontSize: 12,
                fontWeight: 800,
                color: '#00f0ff',
                letterSpacing: 1.5,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
