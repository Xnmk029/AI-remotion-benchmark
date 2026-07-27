import React from 'react';
import { useCurrentFrame } from 'remotion';

export const AudioVisualizer: React.FC<{
  accentColor?: string;
  barCount?: number;
}> = ({ accentColor = '#00f2fe', barCount = 28 }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 50,
        right: 60,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 4,
        height: 48,
        padding: '10px 16px',
        backgroundColor: 'rgba(9, 11, 22, 0.7)',
        backdropFilter: 'blur(12px)',
        borderRadius: 14,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        zIndex: 20,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
    >
      <div
        style={{
          marginRight: 8,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 1.5,
          color: 'rgba(255, 255, 255, 0.7)',
          textTransform: 'uppercase',
          alignSelf: 'center',
        }}
      >
        AUDIO SYNC
      </div>
      {Array.from({ length: barCount }).map((_, i) => {
        // Compute pseudo-audio spectrum frequency curve
        const wave1 = Math.sin(frame * 0.12 + i * 0.45);
        const wave2 = Math.cos(frame * 0.2 + i * 0.3);
        const height = Math.max(6, Math.min(38, Math.abs(wave1 * wave2) * 36 + 6));

        return (
          <div
            key={i}
            style={{
              width: 3,
              height: `${height}px`,
              backgroundColor: accentColor,
              borderRadius: 2,
              boxShadow: `0 0 6px ${accentColor}`,
              transition: 'height 0.05s ease',
            }}
          />
        );
      })}
    </div>
  );
};
