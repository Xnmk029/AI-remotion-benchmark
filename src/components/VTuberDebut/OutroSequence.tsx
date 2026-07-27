import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ReferenceFrameHUD, ReferenceWaves, RotatingSunburst, WhaleIcon } from './Backgrounds';
import { TypographySequence } from './TypographySequence';

export const OutroSequence: React.FC = () => {
  const frame = useCurrentFrame(); // local frame (0..300)
  const { fps } = useVideoConfig();

  // Slide previous elements upwards (0..30 frames)
  const slideUpSpring = spring({
    frame,
    fps,
    config: { mass: 0.9, damping: 11, stiffness: 150 },
  });

  const prevY = interpolate(slideUpSpring, [0, 1], [0, -1200]);

  // Outro Entrance Spring (frame 20)
  const outroSpring = spring({
    frame: frame - 20,
    fps,
    config: { mass: 0.7, damping: 9, stiffness: 180 },
  });

  const outroScale = interpolate(outroSpring, [0, 1], [0, 1]);
  const outroY = interpolate(outroSpring, [0, 1], [100, 0]);

  // Dots for "等待信号中..."
  const dotsCount = Math.floor(frame / 12) % 4;
  const dotsStr = '.'.repeat(dotsCount);

  // Fade out in last 60 frames
  const fadeOutOpacity = interpolate(
    frame,
    [240, 300],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F2F7FF',
        opacity: fadeOutOpacity,
        overflow: 'hidden',
        fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
      }}
    >
      {/* Sliding Out Previous Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateY(${prevY}px)`,
          pointerEvents: 'none',
        }}
      >
        <TypographySequence />
      </div>

      {/* Main Outro Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <RotatingSunburst speed={0.3} darkTheme={false} />
        <ReferenceFrameHUD />
        <ReferenceWaves color="#7CB1FF" />

        {/* Card Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `scale(${outroScale}) translateY(${outroY}px)`,
            zIndex: 10,
          }}
        >
          {/* Coral Red Pill Badge from Reference Image */}
          <div
            style={{
              backgroundColor: '#FF3B30',
              color: '#FFFFFF',
              padding: '10px 36px',
              borderRadius: '30px',
              fontSize: '24px',
              fontWeight: 900,
              letterSpacing: '3px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 6px 20px rgba(255, 59, 48, 0.4)',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 0 10px #FFFFFF',
              }}
            />
            直播中 • 鲸鱼娘开播啦
          </div>

          {/* Avatar Ring */}
          <div
            style={{
              position: 'relative',
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              padding: '8px',
              background: 'linear-gradient(135deg, #1D6AFF, #60A5FA, #FF3B30)',
              boxShadow: '0 12px 40px rgba(29, 106, 255, 0.4)',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('vtuber/vtuber_full.png')}
                style={{
                  width: '140%',
                  height: '140%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                }}
              />
            </div>

            {/* Whale Decorator */}
            <div
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-10px',
                backgroundColor: '#FFFFFF',
                borderRadius: '50%',
                padding: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <WhaleIcon size={40} color="#1D6AFF" />
            </div>
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              letterSpacing: '6px',
              color: '#0B2B68',
              WebkitTextStroke: '2px #FFFFFF',
              textShadow: '0 8px 20px rgba(11, 43, 104, 0.25)',
              transform: 'skewX(-4deg)',
            }}
          >
            DEEPSEEK <span style={{ color: '#1D6AFF' }}>鲸鱼娘</span>
          </div>

          {/* Waiting Subtext */}
          <div
            style={{
              marginTop: '16px',
              fontSize: '28px',
              fontWeight: 900,
              letterSpacing: '4px',
              color: '#2575FF',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            等待信号中<span style={{ width: '40px', display: 'inline-block' }}>{dotsStr}</span>
            <span style={{ fontSize: '18px', color: '#93C5FD', marginLeft: '12px', fontFamily: 'monospace' }}>
              WAITING FOR SIGNAL
            </span>
          </div>

          {/* Badges */}
          <div
            style={{
              marginTop: '36px',
              display: 'flex',
              gap: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#1D6AFF',
                color: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: '30px',
                fontSize: '18px',
                fontWeight: 800,
                letterSpacing: '2px',
                boxShadow: '0 4px 15px rgba(29, 106, 255, 0.35)',
              }}
            >
              ● 哔哩哔哩 独家首播
            </div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #FF3B30',
                color: '#FF3B30',
                padding: '10px 26px',
                borderRadius: '30px',
                fontSize: '18px',
                fontWeight: 800,
                letterSpacing: '2px',
                boxShadow: '0 4px 15px rgba(255, 59, 48, 0.2)',
              }}
            >
              ● 敬请期待 COMING SOON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
