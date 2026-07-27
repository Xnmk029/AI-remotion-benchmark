import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const OutroCard: React.FC<{
  totalClipsCount: number;
}> = ({ totalClipsCount }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 90 },
  });

  const statsSpring = spring({
    frame: frame - 25,
    fps,
    config: { mass: 0.7, damping: 11, stiffness: 80 },
  });

  const scale = interpolate(logoSpring, [0, 1], [0.8, 1]);
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // End fade to black
  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#070913',
        color: '#ffffff',
        fontFamily: '"Outfit", "Inter", "Segoe UI", sans-serif',
        opacity: opacity * fadeOutOpacity,
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background:
            'radial-gradient(circle, rgba(120, 75, 255, 0.25) 0%, rgba(0, 242, 254, 0.1) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Outro Content */}
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
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f2fe 0%, #784bff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            boxShadow: '0 0 40px rgba(0, 242, 254, 0.5)',
            marginBottom: 24,
          }}
        >
          ⚡
        </div>

        <h2
          style={{
            fontSize: 64,
            fontWeight: 900,
            margin: 0,
            letterSpacing: 4,
            background: 'linear-gradient(135deg, #ffffff 0%, #00f2fe 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          THANK YOU FOR WATCHING
        </h2>

        <p
          style={{
            fontSize: 22,
            color: 'rgba(255, 255, 255, 0.8)',
            marginTop: 14,
            letterSpacing: 2,
          }}
        >
          {totalClipsCount} Projects Compiled • Powered by Remotion & Motion Engine
        </p>

        {/* Stats Row */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginTop: 40,
            opacity: Math.min(1, Math.max(0, statsSpring)),
            transform: `translateY(${(1 - Math.min(1, Math.max(0, statsSpring))) * 30}px)`,
          }}
        >
          {[
            { label: 'PROJECTS REELED', val: `${totalClipsCount}` },
            { label: 'FRAME RATE', val: '60 FPS' },
            { label: 'RESOLUTION', val: '1080P FULL HD' },
            { label: 'AUDIO TRACK', val: 'CHILLHOP' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 16,
                padding: '16px 28px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 800, color: '#00f2fe' }}>{stat.val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4, letterSpacing: 1.5 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
