import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

export const GlitchTransition: React.FC<{
  durationInFrames: number;
}> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  // Opacity peaks in the middle of transition
  const opacity = interpolate(
    frame,
    [0, durationInFrames * 0.5, durationInFrames],
    [0, 0.9, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const glitchX = (Math.sin(frame * 1.5) * 40).toFixed(0);

  if (opacity <= 0.01) return null;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 50,
        opacity,
        backgroundColor: 'rgba(0, 242, 254, 0.15)',
        mixBlendMode: 'screen',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(255,0,128,0.3), rgba(0,242,254,0.3))',
          transform: `translateX(${glitchX}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          right: 0,
          height: 12,
          backgroundColor: '#ffffff',
          boxShadow: '0 0 20px #00f2fe',
        }}
      />
    </AbsoluteFill>
  );
};
