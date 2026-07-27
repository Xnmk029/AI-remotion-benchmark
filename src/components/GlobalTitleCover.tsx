import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { OVERALL_BENCHMARK_SCORE } from '../clipsData';
import { NonLinearDashedLine } from './NonLinearDashedLine';

interface GlobalTitleCoverProps {
  lang?: 'zh' | 'en';
}

export const GlobalTitleCover: React.FC<GlobalTitleCoverProps> = ({
  lang = 'zh',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // APPLE FLUID MOTION CURVES (cubic-bezier(0.16, 1, 0.3, 1))
  const appleEase = Easing.bezier(0.16, 1, 0.3, 1);

  // Background logo zoom with Apple ease
  const logoScale = interpolate(frame, [0, 60], [1.08, 1.0], {
    easing: appleEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Main Title Spring (Apple fluid spring physics)
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 18, mass: 0.8, stiffness: 120 },
  });

  // Staggered Score Badge Entrance (Frame 10 ~ 40)
  const scoreProgress = interpolate(frame, [10, 40], [0, 1], {
    easing: appleEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Staggered Quote Card Entrance with Motion Blur (Frame 22 ~ 55)
  const quoteProgress = interpolate(frame, [22, 55], [0, 1], {
    easing: appleEase,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const quoteBlur = (1 - quoteProgress) * 10;
  const quoteY = (1 - quoteProgress) * 35;

  const scoreLabel = lang === 'en' ? 'Subjective Rating' : '主观评分';
  const quoteText =
    lang === 'en'
      ? '“Featuring an ultra-fast output speed of 300 TPS. Although its intelligence is no longer tier-1 today, it remains Google\'s most powerful and fastest model.”'
      : '“有着极高的300TPS输出速度，虽然智能在如今已然掉落第一梯队，但它仍然是谷歌目前最强大同时最快速的模型。”';

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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* GEMINI COLOR LOGO IN BACKGROUND (APPLE FLUID MOTION ZOOM) */}
      <Img
        src={staticFile('gemini-color.png')}
        style={{
          position: 'absolute',
          bottom: -180,
          left: -180,
          height: 720,
          width: 'auto',
          opacity: 0.6,
          transform: `scale(${logoScale})`,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Background vector crosshairs */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 60,
          fontFamily: "'Space Mono', monospace",
          fontSize: 16,
          color: '#888',
          zIndex: 10,
          opacity: scoreProgress,
        }}
      >
        [ GEMINI 3.6 FLASH // OFFICIAL BENCHMARK ]
      </div>

      {/* Non-linear animated dashed line with Apple Easing */}
      <NonLinearDashedLine
        startX={960}
        startY={380}
        endX={960}
        endY={560}
        controlX={1080}
        controlY={470}
        color="#ff1744"
        delayFrames={20}
      />

      {/* MAIN TITLE BLOCK */}
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${0.92 + titleSpring * 0.08})`,
          opacity: titleSpring,
          marginBottom: 40,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 20,
            letterSpacing: 4,
            color: '#666',
            marginBottom: 16,
            textTransform: 'uppercase',
          }}
        >
          GOOGLE DEEPMIND // SHOWREEL 2026
        </div>
        <h1
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            color: '#1a1a1a',
          }}
        >
          GEMINI 3.6 FLASH
        </h1>

        {/* OVERALL SCORE BADGE (APPLE STAGGERED MOTION) */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            padding: '12px 32px',
            marginTop: 30,
            boxShadow: '8px 8px 0px #ff1744',
            opacity: scoreProgress,
            transform: `translateY(${(1 - scoreProgress) * -20}px)`,
          }}
        >
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: '#888' }}>
            TOTAL SCORE
          </span>
          <span style={{ fontSize: 44, fontWeight: 700, color: '#00e5ff' }}>
            {OVERALL_BENCHMARK_SCORE}
          </span>
          <span style={{ fontSize: 20, color: '#aaa' }}>/ 10</span>
          <span
            style={{
              backgroundColor: '#ff1744',
              color: '#fff',
              padding: '4px 12px',
              fontFamily: "'Space Mono', monospace",
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            {scoreLabel}
          </span>
        </div>
      </div>

      {/* QUOTE CARD (APPLE STAGGERED FLUID MOTION + MOTION BLUR) */}
      <div
        style={{
          maxWidth: 1100,
          backgroundColor: '#ffffff',
          border: '2px solid #1a1a1a',
          padding: '36px 48px',
          boxShadow: '12px 12px 0px rgba(0,0,0,0.06)',
          position: 'relative',
          opacity: quoteProgress,
          filter: `blur(${quoteBlur}px)`,
          transform: `translateY(${quoteY}px)`,
          zIndex: 10,
        }}
      >
        {/* Frosted Tape on Top */}
        <div
          style={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%) rotate(-1deg)',
            width: 160,
            height: 32,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(0,0,0,0.15)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        />

        <p
          style={{
            fontSize: 26,
            fontWeight: 500,
            lineHeight: 1.6,
            color: '#222',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          {quoteText}
        </p>
      </div>
    </AbsoluteFill>
  );
};
