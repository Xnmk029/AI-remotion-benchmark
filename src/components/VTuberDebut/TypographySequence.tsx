import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { ReferenceFrameHUD, ReferenceWaves, RotatingSunburst, WhaleIcon } from './Backgrounds';

const KEYWORDS = [
  { text: 'AI 测试', subtext: 'HARDCORE AI TESTING', color: '#1D6AFF', bg: '#0B2B68', pill: '● 高精算法' },
  { text: '硬核实力', subtext: 'HIGH-TECH PERFORMANCE', color: '#FF3B30', bg: '#4A0010', pill: '● 满血高帧' },
  { text: '超级可爱', subtext: 'KAWAII WHALE GIRL', color: '#2575FF', bg: '#103B82', pill: '● 萌度暴击' },
];

export const TypographySequence: React.FC = () => {
  const frame = useCurrentFrame(); // local frame (0..300)
  const { fps } = useVideoConfig();

  // Character transition to Left 1/3
  const charTransitionSpring = spring({
    frame,
    fps,
    config: { mass: 0.9, damping: 10, stiffness: 140 },
  });

  const charX = interpolate(charTransitionSpring, [0, 1], [0, -420]);
  const charScale = interpolate(charTransitionSpring, [0, 1], [1.0, 0.95]);

  // Kinetic Typography Logic: Switch every 20 frames
  const wordCycleIndex = Math.floor(frame / 20);
  const currentItem = KEYWORDS[wordCycleIndex % KEYWORDS.length];
  const slotFrame = frame % 20;

  const wordSpring = spring({
    frame: slotFrame,
    fps,
    config: { mass: 0.3, damping: 5, stiffness: 280 },
  });

  const wordScale = interpolate(wordSpring, [0, 1], [2.2, 1.0]);
  const wordOpacity = interpolate(slotFrame, [0, 2], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rotations = [-6, 10, -5, 12, -8, 6];
  const offsetsX = [20, -25, 30, -20, 25, -10];
  const offsetsY = [-15, 20, -15, 15, -25, 10];

  const currentRotation = rotations[wordCycleIndex % rotations.length];
  const currentOffsetX = offsetsX[wordCycleIndex % offsetsX.length];
  const currentOffsetY = offsetsY[wordCycleIndex % offsetsY.length];

  const isGlitching = slotFrame <= 3;
  const glitchX = isGlitching ? Math.sin(slotFrame * 88) * 12 : 0;
  const glitchY = isGlitching ? Math.cos(slotFrame * 66) * 8 : 0;

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
      <RotatingSunburst speed={0.35} darkTheme={false} />
      <ReferenceFrameHUD />
      <ReferenceWaves color="#7CB1FF" />

      {/* Character Image Left 1/3 */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: `translateX(${charX}px) scale(${charScale})`,
          transformOrigin: 'bottom center',
          filter: 'drop-shadow(0 0 30px rgba(37, 117, 255, 0.35))',
          zIndex: 2,
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

      {/* Kinetic Typography Right Side (2/3) */}
      <div
        style={{
          position: 'absolute',
          right: '60px',
          width: '1020px',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: wordOpacity,
            transform: `
              scale(${wordScale}) 
              rotate(${currentRotation}deg) 
              translate(${currentOffsetX + glitchX}px, ${currentOffsetY + glitchY}px)
            `,
          }}
        >
          {/* Coral Red / Dark Navy Top Pill */}
          <div
            style={{
              backgroundColor: currentItem.bg,
              color: '#FFFFFF',
              padding: '8px 28px',
              fontSize: '22px',
              fontWeight: 900,
              letterSpacing: '4px',
              borderRadius: '25px',
              boxShadow: `0 6px 20px ${currentItem.color}66`,
              marginBottom: '16px',
              transform: 'skewX(-10deg)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>{currentItem.pill}</span>
          </div>

          {/* Huge Main Chinese Keyword */}
          <div
            style={{
              fontSize: '140px',
              fontWeight: 900,
              letterSpacing: '6px',
              color: currentItem.color,
              WebkitTextStroke: '5px #FFFFFF',
              textShadow: isGlitching
                ? `8px 0 #FF3B30, -8px 0 #1D6AFF, 0 0 30px ${currentItem.color}`
                : `
                  0 12px 0 #0B2B68,
                  0 20px 30px rgba(11, 43, 104, 0.3)
                `,
              transform: 'skewX(-5deg)',
              whiteSpace: 'nowrap',
              lineHeight: 1,
            }}
          >
            {currentItem.text}
          </div>

          {/* Subtext English */}
          <div
            style={{
              marginTop: '16px',
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '8px',
              color: '#0B2B68',
              fontFamily: 'monospace',
            }}
          >
            {currentItem.subtext}
          </div>

          {/* Decorative Dot Lines */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: `${30 + i * 15}px`,
                  height: '8px',
                  backgroundColor: i % 2 === 0 ? currentItem.color : '#FF3B30',
                  borderRadius: '4px',
                  transform: 'skewX(-20deg)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
