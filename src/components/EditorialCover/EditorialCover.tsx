import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface EditorialCoverProps {
  bgWatermarkText?: string;
  mainTitle?: string;
  subTitle?: string;
  usModels?: string[];
  chModels?: string[];
  categoryText?: string;
}

export const EditorialCover: React.FC<EditorialCoverProps> = ({
  bgWatermarkText = 'US  VS  CH',
  mainTitle = '中美大模型巅峰横评',
  subTitle = 'MODEL BENCHMARK REPORT // 2026 EDITION',
  usModels = ['GPT-4o', 'Claude 3.5 Sonnet'],
  chModels = ['DeepSeek-V3', 'Qwen 2.5'],
  categoryText = 'LLM EVALUATION VOL. 01',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background Watermark Animation (Slow continuous zoom & subtle opacity fade in)
  const bgScale = interpolate(frame, [0, 300], [1, 1.08], {
    extrapolateRight: 'clamp',
  });
  const bgOpacity = interpolate(frame, [0, 20], [0, 0.08], {
    extrapolateRight: 'clamp',
  });

  // Entrance Animations
  const lineSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 200 },
  });

  const titleSpring = spring({
    frame: frame - 12,
    fps,
    config: { damping: 14 },
  });

  const badgeSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 16 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0c0d0f',
        color: '#ffffff',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* LAYER 1: Subtle Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* LAYER 2: Enormous Condensed Background Watermark (US VS CH) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${bgScale})`,
          opacity: bgOpacity,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontFamily: '"Impact", "Bebas Neue", "Arial Black", sans-serif',
            fontSize: '280px',
            fontWeight: 900,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#ffffff',
          }}
        >
          {bgWatermarkText}
        </span>
      </div>

      {/* LAYER 3: Swiss Border Framework & Grid Lines */}
      <div
        style={{
          position: 'absolute',
          inset: '40px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          pointerEvents: 'none',
        }}
      >
        {/* Top left corner marker */}
        <div
          style={{
            position: 'absolute',
            top: '-1px',
            left: '-1px',
            width: '24px',
            height: '24px',
            borderTop: '3px solid #ffe600',
            borderLeft: '3px solid #ffe600',
          }}
        />
        {/* Bottom right corner marker */}
        <div
          style={{
            position: 'absolute',
            bottom: '-1px',
            right: '-1px',
            width: '24px',
            height: '24px',
            borderBottom: '3px solid #ffe600',
            borderRight: '3px solid #ffe600',
          }}
        />
      </div>

      {/* LAYER 4: Content Layout Area */}
      <div
        style={{
          position: 'absolute',
          inset: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
            paddingBottom: '16px',
            transform: `scaleX(${lineSpring})`,
            transformOrigin: 'left center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#ffe600',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                backgroundColor: '#ffe600',
                borderRadius: '50%',
              }}
            />
            {categoryText}
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'monospace',
            }}
          >
            CONFIDENTIAL // TECH EVALUATION
          </div>
        </div>

        {/* Center Main Title */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            {subTitle}
          </div>
          <h1
            style={{
              fontSize: '76px',
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              background: 'linear-gradient(to right, #ffffff, #d1d5db)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {mainTitle}
          </h1>
        </div>

        {/* Bottom Model Cards Comparison Area */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 60px 1fr',
            alignItems: 'center',
            gap: '24px',
            transform: `translateY(${interpolate(badgeSpring, [0, 1], [30, 0])}px)`,
            opacity: interpolate(badgeSpring, [0, 1], [0, 1]),
          }}
        >
          {/* US Models Group */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#3b82f6',
              }}
            >
              USA MODEL CAMP
            </div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {usModels.map((m, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.4)',
                    color: '#93c5fd',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* VS Divider */}
          <div
            style={{
              textAlign: 'center',
              fontFamily: '"Impact", "Bebas Neue", sans-serif',
              fontSize: '32px',
              fontWeight: 900,
              color: '#ffe600',
              fontStyle: 'italic',
            }}
          >
            VS
          </div>

          {/* CH Models Group */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: '#ef4444',
              }}
            >
              CHINA MODEL CAMP
            </div>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {chModels.map((m, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#fca5a5',
                    padding: '6px 14px',
                    borderRadius: '2px',
                    fontSize: '16px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
