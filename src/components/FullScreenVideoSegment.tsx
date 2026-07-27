import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ProjectItem } from '../clipsData';

export const FullScreenVideoSegment: React.FC<{
  project: ProjectItem;
  index: number;
  total: number;
}> = ({ project, index, total }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // MD3 Floating Chip Spring entrance
  const chipSpring = spring({
    frame: frame - 10,
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 100 },
  });

  const chipY = interpolate(chipSpring, [0, 1], [60, 0]);
  const chipOpacity = interpolate(chipSpring, [0, 1], [0, 1]);

  // Video progress
  const progress = Math.min(1, frame / durationInFrames);

  // Fade out at end of segment
  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
        opacity: fadeOutOpacity,
        overflow: 'hidden',
      }}
    >
      {/* 100% FULL SCREEN VIDEO */}
      <OffthreadVideo
        src={staticFile(project.filename)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        volume={0}
      />

      {/* Top Left MD3 Floating Header */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          zIndex: 20,
        }}
      >
        <span
          style={{
            backgroundColor: 'rgba(9, 12, 21, 0.8)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${project.primaryColor}`,
            color: project.primaryColor,
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: 2,
            padding: '6px 18px',
            borderRadius: 20,
            boxShadow: `0 4px 20px rgba(0,0,0,0.5)`,
          }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} // {project.category}
        </span>
      </div>

      {/* Bottom Floating MD3 Surface Container: Title, Rating & Review */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          left: 40,
          right: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          transform: `translateY(${chipY}px)`,
          opacity: chipOpacity,
          zIndex: 20,
        }}
      >
        {/* Review & Title Tonal Box */}
        <div
          style={{
            flex: 1,
            maxWidth: 850,
            backgroundColor: 'rgba(9, 12, 21, 0.82)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderLeft: `5px solid ${project.primaryColor}`,
            borderRadius: 16,
            padding: '16px 24px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', letterSpacing: 0.5 }}>
              {project.title}
            </span>
          </div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.85)',
              marginTop: 4,
              lineHeight: 1.35,
            }}
          >
            评语：{project.review}
          </div>
        </div>

        {/* Floating Rating Badge */}
        <div
          style={{
            backgroundColor: 'rgba(9, 12, 21, 0.85)',
            backdropFilter: 'blur(20px)',
            border: `1.5px solid ${project.primaryColor}`,
            borderRadius: 16,
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 15px ${project.primaryColor}33`,
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.6)', letterSpacing: 1.5 }}>
              RATING
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: project.primaryColor, lineHeight: 1 }}>
              {project.rating}
            </div>
          </div>
          <div
            style={{
              backgroundColor: project.primaryColor,
              color: '#000000',
              fontSize: 11,
              fontWeight: 900,
              padding: '4px 10px',
              borderRadius: 10,
              letterSpacing: 1,
            }}
          >
            {project.ratingTier}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 4,
          width: `${progress * 100}%`,
          backgroundColor: project.primaryColor,
          boxShadow: `0 0 10px ${project.primaryColor}`,
          zIndex: 30,
        }}
      />
    </AbsoluteFill>
  );
};
