import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { OVERALL_BENCHMARK_SCORE, ProjectItem } from '../clipsData';
import { NonLinearDashedLine } from './NonLinearDashedLine';

interface CollageIntroWindowProps {
  project: ProjectItem;
  lang?: 'zh' | 'en';
}

export const CollageIntroWindow: React.FC<CollageIntroWindowProps> = ({
  project,
  lang = 'zh',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // APPLE FLUID MOTION CURVE
  const appleEase = Easing.bezier(0.16, 1, 0.3, 1);

  // Main Floating Collage Window Animation (Frame 0 ~ 25)
  const windowProgress = interpolate(frame, [0, 25], [0, 1], {
    easing: appleEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = 0.92 + windowProgress * 0.08;
  const windowY = (1 - windowProgress) * 30;
  const opacity = windowProgress;

  // Video Freeze Frame Zoom (Frame 0 ~ 45)
  const imgScale = interpolate(frame, [0, 45], [1.06, 1.0], {
    easing: appleEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Staggered Rating Card Entrance (Frame 8 ~ 32)
  const cardProgress = interpolate(frame, [8, 32], [0, 1], {
    easing: appleEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cardX = (1 - cardProgress) * 50;
  const cardBlur = (1 - cardProgress) * 8;

  const title = lang === 'en' ? project.titleEn : project.title;
  const subtitle = lang === 'en' ? project.subtitleEn : project.subtitle;
  const category = lang === 'en' ? project.categoryEn : project.category;
  const review = lang === 'en' ? project.reviewEn : project.reviewZh;

  const scoreLabel = lang === 'en' ? 'Subjective Rating' : '主观评分';
  const totalScoreLabel = lang === 'en' ? 'OVERALL BENCHMARK SCORE' : '基准测试总分';

  // Glitch text effect calculation
  const glitchOffset = Math.sin(frame * 0.8) * (frame < 15 ? 6 : 0);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f7f7f7',
        backgroundImage: `
          linear-gradient(#e0e0e0 1px, transparent 1px),
          linear-gradient(90deg, #e0e0e0 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        fontFamily: "'Space Grotesk', sans-serif",
        color: '#1a1a1a',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      {/* GEMINI COLOR LOGO IN BACKGROUND (APPLE FLUID EASE ZOOM) */}
      <Img
        src={staticFile('gemini-color.png')}
        style={{
          position: 'absolute',
          bottom: -180,
          left: -180,
          height: 720,
          width: 'auto',
          opacity: 0.6,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* GLOBAL BENCHMARK OVERALL SCORE HEADER BANNER */}
      <div
        style={{
          position: 'absolute',
          top: 32,
          left: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          padding: '12px 28px',
          fontFamily: "'Space Mono', monospace",
          fontSize: 20,
          boxShadow: '6px 6px 0px rgba(0,0,0,0.1)',
          zIndex: 10,
        }}
      >
        <span style={{ color: '#00e5ff', fontWeight: 'bold' }}>[ GEMINI 3.6 FLASH ]</span>
        <span style={{ color: '#888' }}>|</span>
        <span>
          {totalScoreLabel}: <strong style={{ color: '#ff1744', fontSize: 26 }}>{OVERALL_BENCHMARK_SCORE}</strong> / 10 ({scoreLabel})
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 60,
          fontFamily: "'Space Mono', monospace",
          fontSize: 20,
          color: '#888',
          zIndex: 10,
        }}
      >
        FPS: 60.0 // RES: 1920x1080
      </div>

      {/* Non-linear animated dashed line connecting Score Badge to Video Frame */}
      <NonLinearDashedLine
        startX={1450}
        startY={340}
        endX={1220}
        endY={560}
        color={project.primaryColor || '#ff1744'}
        delayFrames={12}
      />

      {/* MAIN FLOATING COLLAGE WINDOW (APPLE MOTION DECELEATION) */}
      <div
        style={{
          position: 'relative',
          width: 1220,
          height: 720,
          backgroundColor: '#ffffff',
          boxShadow: '0 30px 70px rgba(0,0,0,0.12)',
          border: '2px solid #e0e0e0',
          transform: `scale(${scale}) translateY(${windowY}px)`,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Frosted Glass Tape overlays on corners */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: 60,
            width: 175,
            height: 45,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(0,0,0,0.15)',
            transform: 'rotate(-3deg)',
            zIndex: 10,
          }}
        />

        {/* Window Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'Space Mono', monospace",
            fontSize: 22,
            borderBottom: '2px solid #eee',
            paddingBottom: 16,
          }}
        >
          <span>[{category.toUpperCase()}]</span>
          <span>DUR: {project.durationInSeconds.toFixed(2)}s</span>
        </div>

        {/* Video Freeze Frame / Preview Box */}
        <div
          style={{
            width: '100%',
            height: 480,
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
            margin: '20px 0',
          }}
        >
          <OffthreadVideo
            src={staticFile(project.filename)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.05) saturate(1.1)',
              transform: `scale(${imgScale})`,
            }}
          />
          {/* Halftone overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(rgba(0,0,0,0.3) 20%, transparent 20%)',
              backgroundSize: '4px 4px',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Window Bottom Information */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 49,
                fontWeight: 700,
                lineHeight: 1.1,
                transform: `translateX(${glitchOffset}px)`,
                color: project.primaryColor || '#1a1a1a',
              }}
            >
              {title}
            </h2>
            <p
              style={{
                fontSize: 28,
                fontWeight: 300,
                color: '#555',
                marginTop: 6,
              }}
            >
              {subtitle}
            </p>
          </div>
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 22,
              backgroundColor: '#1a1a1a',
              color: '#fff',
              padding: '8px 18px',
            }}
          >
            {project.ratingTier}
          </span>
        </div>
      </div>

      {/* RATING & REVIEW CARD (APPLE STAGGERED FLUID MOTION) */}
      <div
        style={{
          position: 'absolute',
          right: 80,
          top: 220,
          width: 480,
          backgroundColor: '#ffffff',
          border: '2px solid #1a1a1a',
          padding: 32,
          boxShadow: '12px 12px 0px #1a1a1a',
          opacity: cardProgress,
          filter: `blur(${cardBlur}px)`,
          transform: `translateX(${cardX}px)`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: "'Space Mono', monospace",
            fontSize: 18,
            color: '#888',
            marginBottom: 12,
          }}
        >
          <span>PDF EVALUATION LOG</span>
          <span
            style={{
              backgroundColor: '#f0f0f0',
              color: '#1a1a1a',
              padding: '4px 10px',
              fontSize: 16,
              border: '1px solid #ccc',
            }}
          >
            {scoreLabel}
          </span>
        </div>
        
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            fontFamily: "'Space Grotesk', sans-serif",
            color: project.rating < 5.0 ? '#ff1744' : '#00e676',
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          {project.rating.toFixed(1)}{' '}
          <span style={{ fontSize: 32, color: '#888' }}>/ 10</span>
        </div>

        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 20,
            color: '#ff1744',
            marginBottom: 16,
            fontWeight: 'bold',
          }}
        >
          {project.rating.toFixed(1)}分 ({scoreLabel})
        </div>

        <p
          style={{
            fontSize: 24.5,
            lineHeight: 1.5,
            color: '#333',
            borderTop: '2px dashed #ddd',
            paddingTop: 16,
          }}
        >
          {review}
        </p>
      </div>
    </AbsoluteFill>
  );
};
