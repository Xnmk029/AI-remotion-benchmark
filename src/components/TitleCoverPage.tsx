import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { OVERALL_BENCHMARK_SCORE } from '../clipsData';

interface TitleCoverPageProps {
  lang?: 'zh' | 'en';
}

export const TitleCoverPage: React.FC<TitleCoverPageProps> = ({ lang = 'zh' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const title = lang === 'en' ? 'GEMINI 3.6 FLASH' : 'GEMINI 3.6 FLASH';
  const subtitle = lang === 'en' ? 'BENCHMARK EVALUATION SHOWREEL' : '基准测试与全能力综合展示';
  
  const quote = lang === 'en'
    ? '“Boasting an extremely fast 300 TPS output speed, its intelligence has dropped from the tier-1 echelon today, yet it remains Google\'s most powerful and fastest model to date.”'
    : '“有着极高的300TPS输出速度，但是智能在如今已然掉落第一梯队，但它仍然是谷歌目前最强大同时最快速的模型。”';

  const scoreLabel = lang === 'en' ? 'Subjective Rating' : '主观评分';

  // Entrance animations
  const titleY = interpolate(frame, [0, 25], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const quoteScale = interpolate(frame, [15, 35], [0.95, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#f7f7f7',
        backgroundImage: `
          linear-gradient(#e0e0e0 1px, transparent 1px),
          linear-gradient(90deg, #e0e0e0 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        fontFamily: "'Space Grotesk', sans-serif",
        color: '#1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        opacity,
      }}
    >
      {/* Background Crosshairs */}
      <div style={{ position: 'absolute', top: 60, left: 80, fontFamily: "'Space Mono', monospace", fontSize: 20, color: '#888' }}>
        + 300 TPS ARCHITECTURE
      </div>
      <div style={{ position: 'absolute', top: 60, right: 80, fontFamily: "'Space Mono', monospace", fontSize: 20, color: '#888' }}>
        SYSTEM VERDICT // 2026
      </div>

      {/* COVER CARD CONTAINER (ENLARGED) */}
      <div
        style={{
          width: 1400,
          backgroundColor: '#ffffff',
          border: '2px solid #1a1a1a',
          boxShadow: '16px 16px 0px #1a1a1a',
          padding: 64,
          transform: `translateY(${titleY}px)`,
          position: 'relative',
        }}
      >
        {/* Frosted Tape Decoration */}
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: 80,
            width: 180,
            height: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(0,0,0,0.15)',
            transform: 'rotate(-2deg)',
          }}
        />

        {/* Top Meta Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'Space Mono', monospace",
            fontSize: 20,
            color: '#666',
            borderBottom: '2px solid #eee',
            paddingBottom: 20,
            marginBottom: 36,
          }}
        >
          <span>[ GOOGLE DEEPMIND // BENCHMARK REPORT ]</span>
          <span>MODEL ID: GEMINI-3.6-FLASH</span>
        </div>

        {/* MAIN TITLE (75% ENLARGED TEXT) */}
        <h1
          style={{
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 16,
            color: '#1a1a1a',
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#555',
            fontFamily: "'Space Mono', monospace",
            marginBottom: 48,
          }}
        >
          {subtitle}
        </p>

        {/* OVERALL SCORE DISPLAY BLOCK (75% ENLARGED) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            padding: '24px 40px',
            marginBottom: 48,
          }}
        >
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 18, color: '#888', marginBottom: 4 }}>
              OVERALL SCORE
            </div>
            <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1, color: '#ff1744' }}>
              {OVERALL_BENCHMARK_SCORE} <span style={{ fontSize: 32, color: '#fff' }}>/ 10</span>
            </div>
          </div>
          
          <div
            style={{
              backgroundColor: '#ff1744',
              color: '#ffffff',
              fontFamily: "'Space Mono', monospace",
              fontSize: 24,
              fontWeight: 'bold',
              padding: '10px 20px',
            }}
          >
            {scoreLabel}
          </div>
        </div>

        {/* MODEL QUOTE / VERDICT BOX */}
        <div
          style={{
            borderLeft: '8px solid #00f0ff',
            paddingLeft: 24,
            transform: `scale(${quoteScale})`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              lineHeight: 1.5,
              fontWeight: 500,
              color: '#222',
              fontStyle: 'italic',
            }}
          >
            {quote}
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
