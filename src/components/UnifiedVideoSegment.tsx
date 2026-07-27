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

export const UnifiedVideoSegment: React.FC<{
  project: ProjectItem;
  index: number;
  total: number;
}> = ({ project, index, total }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Floating HUD spring entrance
  const hudSpring = spring({
    frame: frame - 10,
    fps,
    config: { mass: 0.7, damping: 14, stiffness: 100 },
  });

  const hudY = interpolate(hudSpring, [0, 1], [40, 0]);
  const hudOpacity = interpolate(hudSpring, [0, 1], [0, 1]);

  // Real-time timecode formatting
  const currentSeconds = Math.floor(frame / 60);
  const totalSeconds = Math.floor(durationInFrames / 60);
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Video progress (0 to 1)
  const progress = Math.min(1, frame / durationInFrames);

  // Fade out at end of clip
  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: '"Outfit", "Inter", -apple-system, sans-serif',
        opacity: fadeOutOpacity,
        overflow: 'hidden',
      }}
    >
      {/* 100% FULL SCREEN UNTRUNCATED VIDEO */}
      <OffthreadVideo
        src={staticFile(project.filename)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        volume={0}
      />

      {/* Top Floating Vector HUD Header */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 32,
          right: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            style={{
              backgroundColor: 'rgba(12, 14, 20, 0.85)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${project.primaryColor}`,
              color: project.primaryColor,
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: 2,
              padding: '6px 16px',
              borderRadius: 8,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            FULL UNTRUNCATED VIDEO // NO. {String(index + 1).padStart(2, '0')} OF {String(total).padStart(2, '0')}
          </span>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '4px 12px',
              borderRadius: 6,
            }}
          >
            {project.title}
          </span>
        </div>

        {/* Real-time Video Timecode (e.g. 01:15 / 02:05) */}
        <div
          style={{
            fontFamily: 'monospace',
            fontSize: 14,
            fontWeight: 700,
            color: '#ffffff',
            backgroundColor: 'rgba(12, 14, 20, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '6px 16px',
            borderRadius: 8,
            letterSpacing: 1.5,
          }}
        >
          {formatTime(currentSeconds)} / {formatTime(totalSeconds)}
        </div>
      </div>

      {/* Bottom Floating MD3 Glass Surface Container */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: 32,
          right: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          transform: `translateY(${hudY}px)`,
          opacity: hudOpacity,
          zIndex: 20,
        }}
      >
        {/* Review Box */}
        <div
          style={{
            flex: 1,
            maxWidth: 900,
            backgroundColor: 'rgba(12, 14, 20, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderLeft: `5px solid ${project.primaryColor}`,
            borderRadius: 14,
            padding: '16px 24px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, color: project.primaryColor, letterSpacing: 2 }}>
            REVIEW COMMENTARY
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: '#f8fafc',
              marginTop: 4,
              lineHeight: 1.35,
            }}
          >
            “{project.review}”
          </div>
        </div>

        {/* Rating Badge */}
        <div
          style={{
            backgroundColor: 'rgba(12, 14, 20, 0.88)',
            backdropFilter: 'blur(20px)',
            border: `1.5px solid ${project.primaryColor}`,
            borderRadius: 14,
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: `0 8px 30px rgba(0,0,0,0.6)`,
          }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5 }}>
              SCORE
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: project.primaryColor, lineHeight: 1 }}>
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
              borderRadius: 8,
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
