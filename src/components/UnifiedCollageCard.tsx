import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ProjectItem } from '../clipsData';

export const UnifiedCollageCard: React.FC<{
  project: ProjectItem;
  index: number;
  total: number;
}> = ({ project, index, total }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Non-linear Smooth Cubic-Bezier Easing
  const cardSpring = spring({
    frame,
    fps,
    config: { mass: 0.8, damping: 14, stiffness: 100 },
  });

  const pillarHeight = interpolate(
    frame,
    [0, 20, 60],
    [0, 100, 100],
    { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp' }
  );

  const collageSlideX = interpolate(
    frame,
    [0, 25, 60],
    [-60, 0, 0],
    { easing: Easing.bezier(0.16, 1, 0.3, 1), extrapolateRight: 'clamp' }
  );

  // 2. Refined Glitch Tick (Non-distracting, high-end)
  const glitchActive = frame < 6 || (frame > 35 && frame < 39);
  const rgbShadow = glitchActive
    ? `2px -1px 0px rgba(255, 0, 85, 0.7), -2px 1px 0px rgba(0, 240, 255, 0.7)`
    : 'none';

  const opacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0c0e14',
        color: '#f8fafc',
        fontFamily: '"Outfit", "Inter", -apple-system, sans-serif',
        opacity: opacity * fadeOutOpacity,
        overflow: 'hidden',
      }}
    >
      {/* Pillar 1: Minimalist 1px Vector Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Pillar 2: Constructivism Solid Axis Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 72,
          width: 4,
          height: `${pillarHeight}%`,
          backgroundColor: project.primaryColor,
          boxShadow: `0 0 20px ${project.primaryColor}`,
          zIndex: 5,
        }}
      />

      {/* Pillar 3: Minimalist Vector Corner Ticks (+) */}
      <div style={{ position: 'absolute', top: 32, left: 32, fontSize: 16, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>+</div>
      <div style={{ position: 'absolute', top: 32, right: 32, fontSize: 16, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>+</div>
      <div style={{ position: 'absolute', bottom: 32, left: 32, fontSize: 16, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>+</div>
      <div style={{ position: 'absolute', bottom: 32, right: 32, fontSize: 16, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>+</div>

      {/* Constructivism / Vector Spec Tag */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 50,
          fontSize: 12,
          fontFamily: 'monospace',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: 2,
        }}
      >
        FULL UNTRUNCATED VIDEO // {project.durationInSeconds.toFixed(1)}S DURATION
      </div>

      {/* Pillar 4: Digital Collage Oversized Layered Index ('01', '02') */}
      <div
        style={{
          position: 'absolute',
          bottom: -40,
          right: 20,
          fontSize: 260,
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.03)',
          letterSpacing: -12,
          lineHeight: 0.8,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Main Content Layout Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '64px 64px 64px 104px', // Offset for left constructivism axis
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Top Header: MD3 Assist Chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: `translateY(${(1 - cardSpring) * -20}px)`,
            opacity: cardSpring,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                backgroundColor: project.primaryColor,
                color: '#000000',
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: 2,
                padding: '5px 14px',
                borderRadius: 8,
                textTransform: 'uppercase',
              }}
            >
              {project.category}
            </span>

            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#cbd5e1',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '4px 12px',
                  borderRadius: 8,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: project.primaryColor }}>
            NO. {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        </div>

        {/* Center Section: Digital Collage & MD3 Typography Title Block */}
        <div
          style={{
            transform: `translateX(${collageSlideX}px)`,
            opacity: cardSpring,
            maxWidth: 1100,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: project.primaryColor,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 10,
              textShadow: rgbShadow,
            }}
          >
            {project.subtitle}
          </div>

          <h1
            style={{
              fontSize: 66,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: 0.5,
              color: '#ffffff',
              textShadow: rgbShadow,
            }}
          >
            {project.title}
          </h1>
        </div>

        {/* Bottom Section: MD3 Surface Container with Review Commentary & Rating */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 20,
            transform: `translateY(${(1 - cardSpring) * 30}px)`,
            opacity: cardSpring,
          }}
        >
          {/* MD3 Rating Badge Container */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(20px)',
              border: `1.5px solid ${project.primaryColor}`,
              borderRadius: 16,
              padding: '20px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 190,
              boxShadow: `0 8px 30px rgba(0, 0, 0, 0.5)`,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255, 255, 255, 0.5)', letterSpacing: 2 }}>
              主观评分 // RATING
            </div>
            <div
              style={{
                fontSize: 44,
                fontWeight: 900,
                color: project.primaryColor,
                lineHeight: 1,
                marginTop: 4,
              }}
            >
              {project.rating}
            </div>
            <div
              style={{
                marginTop: 6,
                backgroundColor: project.primaryColor,
                color: '#000000',
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 1.5,
                padding: '2px 8px',
                borderRadius: 8,
              }}
            >
              {project.ratingTier}
            </div>
          </div>

          {/* MD3 Elevated Surface Review Commentary */}
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderLeft: `5px solid ${project.primaryColor}`,
              borderRadius: 16,
              padding: '20px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: project.primaryColor,
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              💬 项目评语 // REVIEW COMMENTARY
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#f1f5f9',
                lineHeight: 1.4,
              }}
            >
              “{project.review}”
            </div>
          </div>
        </div>
      </div>

      {/* Refined Scanline overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 3px)',
          pointerEvents: 'none',
          zIndex: 30,
        }}
      />
    </AbsoluteFill>
  );
};
