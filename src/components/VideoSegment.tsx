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
import { VideoClipItem } from '../types';

export const VideoSegment: React.FC<{
  clip: VideoClipItem;
  index: number;
  totalClips: number;
}> = ({ clip, index, totalClips }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring animation
  const entranceSpring = spring({
    frame,
    fps,
    config: { mass: 0.7, damping: 12, stiffness: 90 },
  });

  // Scale and tilt effects
  const scale = interpolate(entranceSpring, [0, 1], [0.92, 1]);
  const rotateX = interpolate(entranceSpring, [0, 1], [8, 0]);
  const rotateY = interpolate(entranceSpring, [0, 1], [-6, 0]);

  // Lower-third title slide in
  const lowerThirdSpring = spring({
    frame: frame - 15,
    fps,
    config: { mass: 0.6, damping: 11, stiffness: 100 },
  });

  const lowerThirdY = interpolate(lowerThirdSpring, [0, 1], [80, 0]);
  const lowerThirdOpacity = interpolate(lowerThirdSpring, [0, 1], [0, 1]);

  // Progress within this clip
  const clipProgress = Math.min(1, frame / clip.durationInFrames);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090b16',
        color: '#ffffff',
        fontFamily: '"Outfit", "Inter", "Segoe UI", sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Glow matching accent color */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '70%',
          height: '70%',
          background: `radial-gradient(circle, ${clip.glowColor} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '70%',
          height: '70%',
          background: `radial-gradient(circle, ${clip.glowColor} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          opacity: 0.7,
        }}
      />

      {/* Main Video Frame with 3D Tilt Container */}
      <div
        style={{
          position: 'absolute',
          inset: 30,
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px ${clip.glowColor}`,
          border: `1px solid rgba(255, 255, 255, 0.15)`,
          transform: `scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Actual Video Clip */}
        <OffthreadVideo
          src={staticFile(clip.filename)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          volume={0} // Background music is mixed centrally in ShowreelMain
        />

        {/* Dynamic Top Header Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '20px 30px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          {/* Tag & Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span
              style={{
                backgroundColor: clip.accentColor,
                color: '#000000',
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 2,
                padding: '4px 12px',
                borderRadius: 20,
                textTransform: 'uppercase',
                boxShadow: `0 0 12px ${clip.accentColor}`,
              }}
            >
              {clip.tag}
            </span>
            <span
              style={{
                fontSize: 14,
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: 600,
                letterSpacing: 1.5,
              }}
            >
              {clip.category}
            </span>
          </div>

          {/* Clip Index Indicator */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              color: '#ffffff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '6px 16px',
              borderRadius: 20,
            }}
          >
            <span style={{ color: clip.accentColor }}>{String(index + 1).padStart(2, '0')}</span> / {String(totalClips).padStart(2, '0')}
          </div>
        </div>

        {/* Lower-Third Glassmorphism Card */}
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            maxWidth: 650,
            backgroundColor: 'rgba(9, 11, 22, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: `1px solid rgba(255, 255, 255, 0.18)`,
            borderLeft: `5px solid ${clip.accentColor}`,
            borderRadius: 16,
            padding: '20px 28px',
            transform: `translateY(${lowerThirdY}px)`,
            opacity: lowerThirdOpacity,
            zIndex: 10,
            boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: 1,
              lineHeight: 1.2,
            }}
          >
            {clip.title}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: clip.accentColor,
              marginTop: 4,
              letterSpacing: 0.5,
            }}
          >
            {clip.subtitle}
          </div>
          <div
            style={{
              fontSize: 14,
              color: 'rgba(255, 255, 255, 0.75)',
              marginTop: 8,
              lineHeight: 1.4,
            }}
          >
            {clip.description}
          </div>
        </div>

        {/* Top Progress Line for this clip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 4,
            width: `${clipProgress * 100}%`,
            backgroundColor: clip.accentColor,
            boxShadow: `0 0 10px ${clip.accentColor}`,
            zIndex: 15,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
