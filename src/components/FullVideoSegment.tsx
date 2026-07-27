import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { OVERALL_BENCHMARK_SCORE, ProjectItem } from '../clipsData';
import { NonLinearDashedLine } from './NonLinearDashedLine';

interface FullVideoSegmentProps {
  project: ProjectItem;
  lang?: 'zh' | 'en';
}

export const FullVideoSegment: React.FC<FullVideoSegmentProps> = ({
  project,
  lang = 'zh',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = lang === 'en' ? project.titleEn : project.title;
  const review = lang === 'en' ? project.reviewEn : project.reviewZh;

  const scoreLabel = lang === 'en' ? 'Subjective Rating' : '主观评分';
  const totalScoreLabel = lang === 'en' ? 'OVERALL BENCHMARK' : '总分';

  // APPLE FLUID MOTION CURVES (30 FPS TIMING)
  const appleEntranceEase = Easing.bezier(0.16, 1, 0.3, 1);
  const appleExitEase = Easing.bezier(0.32, 0, 0.67, 0);

  // Fade in at beginning of video
  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    easing: appleEntranceEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // RATING HUD CARD SLIDE-IN (0 ~ 15 frames @ 30fps)
  const slideIn = interpolate(frame, [0, 15], [0, 1], {
    easing: appleEntranceEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // RATING HUD CARD SLIDE-OUT AFTER 5 SECONDS (165 ~ 180 frames @ 30fps)
  const slideOut = interpolate(frame, [165, 180], [0, 1], {
    easing: appleExitEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Combined smooth Y translation & motion blur
  const translateY = (1 - slideIn) * 200 + slideOut * 200;
  const blurAmount = (1 - slideIn) * 10 + slideOut * 10;
  const cardOpacity = slideIn * (1 - slideOut);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#050505',
        opacity: fadeIn,
      }}
    >
      {/* 100% UNTRUNCATED FULL VIDEO */}
      <OffthreadVideo
        src={staticFile(project.filename)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />

      {/* NON-LINEAR DASHED LINE (SYNCHRONIZED WITH HUD CARD OPACITY) */}
      {cardOpacity > 0.05 && (
        <NonLinearDashedLine
          startX={240}
          startY={120}
          endX={180}
          endY={780}
          controlX={80}
          controlY={450}
          color={project.primaryColor || '#00e5ff'}
          delayFrames={3}
        />
      )}

      {/* TOP FLOATING BANNER (APPLE FLUID ENTRANCE) */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 50,
          right: 50,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Space Mono', monospace",
          fontSize: 22,
          color: '#ffffff',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)',
          padding: '16px 32px',
          border: '1px solid rgba(255,255,255,0.2)',
          transform: `translateY(${(1 - slideIn) * -30}px)`,
          opacity: slideIn,
        }}
      >
        <div>
          <span style={{ color: project.primaryColor || '#00e5ff', fontWeight: 'bold' }}>
            ● NOW PLAYING // #{project.id.toUpperCase()}
          </span>{' '}
          | {title}
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ backgroundColor: '#ff1744', color: '#fff', padding: '4px 12px', fontSize: 20, fontWeight: 'bold' }}>
            {totalScoreLabel}: {OVERALL_BENCHMARK_SCORE}分 ({scoreLabel})
          </div>
          <div>FULL DUR: {project.durationInSeconds.toFixed(2)}s</div>
        </div>
      </div>

      {/* RATING CARD: APPLE FLUID SLIDE-IN, STAY 5s, FLUID DISMISSAL */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 50,
          maxWidth: 680,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          color: '#1a1a1a',
          padding: 32,
          borderLeft: `8px solid ${project.primaryColor || '#1a1a1a'}`,
          boxShadow: '0 15px 40px rgba(0,0,0,0.35)',
          fontFamily: "'Space Grotesk', sans-serif",
          transform: `translateY(${translateY}px)`,
          filter: `blur(${blurAmount}px)`,
          opacity: cardOpacity,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: project.rating < 5.0 ? '#ff1744' : '#00e676',
            }}
          >
            {project.rating.toFixed(1)}{' '}
            <span style={{ fontSize: 28, color: '#666' }}>/ 10</span>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 20,
                backgroundColor: '#ff1744',
                color: '#fff',
                padding: '4px 10px',
                fontWeight: 'bold',
              }}
            >
              {scoreLabel}
            </span>
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 20,
                backgroundColor: '#1a1a1a',
                color: '#fff',
                padding: '4px 12px',
              }}
            >
              {project.ratingTier}
            </span>
          </div>
        </div>

        <p
          style={{
            fontSize: 24.5,
            lineHeight: 1.5,
            color: '#222',
            borderTop: '2px solid #eee',
            paddingTop: 16,
          }}
        >
          {review}
        </p>
      </div>
    </AbsoluteFill>
  );
};
