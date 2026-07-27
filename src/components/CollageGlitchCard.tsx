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

export const CollageGlitchCard: React.FC<{
  project: ProjectItem;
  index: number;
  total: number;
}> = ({ project, index, total }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Non-linear Easing Curves (Cubic Bezier & Springs)
  // Block 1 (Constructivism Diagonal Strip) slide in with Easing.bezier
  const stripTranslateX = interpolate(
    frame,
    [0, 24, 60],
    [-100, 0, 0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateRight: 'clamp',
    }
  );

  // Block 2 (Main MD3 Container) spring with custom physics
  const mainCardSpring = spring({
    frame: frame - 10,
    fps,
    config: { mass: 0.9, damping: 13, stiffness: 110 },
  });

  // Block 3 (Review & Rating Box) non-linear elastic entrance
  const reviewSpring = spring({
    frame: frame - 22,
    fps,
    config: { mass: 0.7, damping: 10, stiffness: 130 },
  });

  // Glitch jitter calculation (chromatic aberration & slice offset)
  const glitchActive = frame % 18 < 4 || (frame > 40 && frame < 46);
  const glitchSliceX = glitchActive ? (Math.sin(frame * 3.7) * 28).toFixed(0) : '0';
  const glitchSliceY = glitchActive ? (Math.cos(frame * 2.3) * 14).toFixed(0) : '0';
  const rgbShift = glitchActive ? '3px -2px 0px rgba(255, 0, 85, 0.8), -3px 2px 0px rgba(0, 242, 254, 0.8)' : 'none';

  // Opacity & Outro fade
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090c15',
        color: '#ffffff',
        fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
        opacity: opacity * fadeOutOpacity,
        overflow: 'hidden',
      }}
    >
      {/* Background Vector Grid & Constructivism Shapes */}
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

      {/* Constructivism Big Diagonal Slash Slice */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '55%',
          height: '140%',
          backgroundColor: project.primaryColor,
          opacity: 0.15,
          transform: `translateX(${stripTranslateX}%) skewX(-20deg)`,
          transformOrigin: 'top right',
        }}
      />

      {/* Oversized Constructivism Number Collage ('01', '02'...) */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: 60,
          fontSize: 220,
          fontWeight: 900,
          color: 'rgba(255, 255, 255, 0.04)',
          letterSpacing: -10,
          lineHeight: 0.8,
          pointerEvents: 'none',
          userSelect: 'none',
          transform: `translateX(${glitchSliceX}px)`,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Main Digital Collage Layout Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '60px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Top Header: MD3 Top App Bar & Tag Chips */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: `translateY(${(1 - mainCardSpring) * -30}px)`,
            opacity: mainCardSpring,
          }}
        >
          {/* MD3 Assist Chips Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span
              style={{
                backgroundColor: project.primaryColor,
                color: '#000000',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.5,
                padding: '6px 16px',
                borderRadius: 8, // MD3 Chip corner
                textTransform: 'uppercase',
                boxShadow: `0 0 16px ${project.primaryColor}`,
              }}
            >
              {project.category}
            </span>

            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#e2e8f0',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '5px 14px',
                  borderRadius: 8,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Constructivist Index Badge */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              color: project.primaryColor,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              border: `1px solid ${project.primaryColor}`,
              padding: '6px 18px',
              borderRadius: 8,
            }}
          >
            INDEX // {String(index + 1).padStart(2, '0')} OF {String(total).padStart(2, '0')}
          </div>
        </div>

        {/* Center Section: Digital Collage Title Block with Glitch Aberration */}
        <div
          style={{
            maxWidth: 1100,
            transform: `scale(${interpolate(mainCardSpring, [0, 1], [0.9, 1])}) translateY(${glitchSliceY}px)`,
            opacity: mainCardSpring,
          }}
        >
          {/* Subtitle */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: project.primaryColor,
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 12,
              textShadow: rgbShift,
            }}
          >
            {project.subtitle}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 68,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: 1,
              color: '#ffffff',
              textShadow: rgbShift,
              background: `linear-gradient(135deg, #ffffff 0%, ${project.primaryColor} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {project.title}
          </h1>
        </div>

        {/* Bottom Section: MD3 Tonal Surface Container with Rating & Review */}
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 24,
            transform: `translateY(${(1 - reviewSpring) * 50}px)`,
            opacity: reviewSpring,
          }}
        >
          {/* Subjective Rating Badge (MD3 Filled Tonal Container) */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(20px)',
              border: `2px solid ${project.primaryColor}`,
              borderRadius: 16, // MD3 Medium Component Corner
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 200,
              boxShadow: `0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px ${project.primaryColor}33`,
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: 2 }}>
              主观评分 // SCORE
            </div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: project.primaryColor,
                lineHeight: 1,
                marginTop: 6,
                letterSpacing: 1,
                textShadow: `0 0 12px ${project.primaryColor}`,
              }}
            >
              {project.rating}
            </div>
            <div
              style={{
                marginTop: 8,
                backgroundColor: project.primaryColor,
                color: '#000000',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 1.5,
                padding: '3px 10px',
                borderRadius: 12,
              }}
            >
              {project.ratingTier}
            </div>
          </div>

          {/* Project Short Review Box (MD3 Elevated Container) */}
          <div
            style={{
              flex: 1,
              backgroundColor: project.surfaceContainer,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderLeft: `6px solid ${project.primaryColor}`,
              borderRadius: 16,
              padding: '24px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: project.primaryColor,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              💬 项目评语 // REVIEW COMMENTARY
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: project.onSurface,
                lineHeight: 1.45,
                letterSpacing: 0.5,
              }}
            >
              “{project.review}”
            </div>
          </div>
        </div>
      </div>

      {/* Glitch Scanlines & Noise Overlay */}
      {glitchActive && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) 2px, transparent 2px, transparent 4px)',
            pointerEvents: 'none',
            zIndex: 40,
          }}
        />
      )}
    </AbsoluteFill>
  );
};
