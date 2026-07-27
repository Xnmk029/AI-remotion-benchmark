import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ReferenceFrameHUD, ReferenceWaves, RotatingSunburst, WhaleIcon } from './Backgrounds';

export const RevealSequence: React.FC = () => {
  const frame = useCurrentFrame(); // local frame (0..600)
  const { fps } = useVideoConfig();

  // Flashbang opacity
  const flashbangOpacity = interpolate(
    frame,
    [0, 5, 25],
    [1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Character Slide-In Spring
  const characterSpring = spring({
    frame: frame - 5,
    fps,
    config: { mass: 1.2, damping: 11, stiffness: 120 },
  });

  const characterY = interpolate(characterSpring, [0, 1], [900, 0]);
  const characterScale = interpolate(characterSpring, [0, 1], [0.7, 1.0]);

  // Subtle Floating
  const floatY = Math.sin(frame * 0.06) * 10;
  const floatRotate = Math.sin(frame * 0.04) * 1.5;

  // Title Text Smash Spring
  const textSpring = spring({
    frame: frame - 18,
    fps,
    config: { mass: 0.8, damping: 9, stiffness: 180 },
  });

  const textScale = interpolate(textSpring, [0, 1], [3.0, 1.0]);
  const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);
  const textFloatY = Math.sin(frame * 0.08) * 12;

  // Badge Smash Spring
  const badgeSpring = spring({
    frame: frame - 32,
    fps,
    config: { mass: 0.6, damping: 10, stiffness: 160 },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#F2F7FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Microsoft YaHei', 'PingFang SC', sans-serif",
      }}
    >
      {/* Background Elements */}
      <RotatingSunburst speed={0.3} darkTheme={false} />
      <ReferenceFrameHUD />
      <ReferenceWaves color="#7CB1FF" />

      {/* Watermark Whale Icon */}
      <div
        style={{
          position: 'absolute',
          top: '180px',
          left: '100px',
          opacity: 0.12,
          transform: 'scale(2.2)',
          pointerEvents: 'none',
        }}
      >
        <WhaleIcon size={120} color="#1D6AFF" />
      </div>

      {/* Main Chinese Title Section */}
      <div
        style={{
          position: 'absolute',
          top: '110px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: textOpacity,
          transform: `scale(${textScale}) translateY(${textFloatY}px)`,
          zIndex: 2,
        }}
      >
        {/* Coral Red Pill Badge */}
        <div
          style={{
            transform: `scale(${badgeScale}) rotate(-2deg)`,
            backgroundColor: '#FF3B30',
            color: '#FFFFFF',
            padding: '8px 32px',
            fontSize: '22px',
            fontWeight: 900,
            letterSpacing: '4px',
            borderRadius: '30px',
            boxShadow: '0 8px 25px rgba(255, 59, 48, 0.4)',
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
            }}
          />
          重磅首播亮相
        </div>

        {/* Main Title: DEEPSEEK 鲸鱼娘 */}
        <div
          style={{
            fontSize: '115px',
            fontWeight: 900,
            letterSpacing: '4px',
            color: '#0B2B68',
            WebkitTextStroke: '4px #FFFFFF',
            textShadow: `
              0 10px 0 #1D6AFF,
              0 18px 25px rgba(11, 43, 104, 0.3)
            `,
            transform: 'skewX(-4deg)',
            whiteSpace: 'nowrap',
          }}
        >
          DEEPSEEK <span style={{ color: '#1D6AFF' }}>鲸鱼娘</span>
        </div>

        <div
          style={{
            fontSize: '22px',
            fontWeight: 800,
            letterSpacing: '10px',
            color: '#2575FF',
            marginTop: '8px',
          }}
        >
          OFFICIAL VTUBER DEBUT 2026
        </div>
      </div>

      {/* Character Image */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          transform: `translateY(${characterY + floatY}px) scale(${characterScale}) rotate(${floatRotate}deg)`,
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 20px 40px rgba(37, 117, 255, 0.35))',
          zIndex: 3,
        }}
      >
        <Img
          src={staticFile('vtuber/vtuber_full.png')}
          style={{
            maxHeight: '930px',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Flashbang Overlay */}
      {flashbangOpacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            opacity: flashbangOpacity,
            zIndex: 100,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
