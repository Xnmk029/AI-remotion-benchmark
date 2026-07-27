import React from 'react';
import { useCurrentFrame } from 'remotion';

// Rotating Sunburst in Ref Palette (Light Blue & White)
export const RotatingSunburst: React.FC<{ speed?: number; darkTheme?: boolean }> = ({
  speed = 0.3,
  darkTheme = false,
}) => {
  const frame = useCurrentFrame();
  const rotation = frame * speed;
  const raysCount = 24;
  const rays = Array.from({ length: raysCount });

  const color1 = darkTheme ? '#081a38' : '#F0F6FF';
  const color2 = darkTheme ? '#0f2c5c' : '#E0ECFF';

  return (
    <div
      style={{
        position: 'absolute',
        inset: -500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${rotation}deg)`,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="3000"
        height="3000"
        viewBox="0 0 1000 1000"
        style={{ width: '100%', height: '100%' }}
      >
        <circle cx="500" cy="500" r="500" fill={color1} />
        {rays.map((_, i) => {
          const angle = (360 / raysCount) * i;
          const endAngle = angle + 360 / raysCount / 2;
          const rad1 = (angle * Math.PI) / 180;
          const rad2 = (endAngle * Math.PI) / 180;
          const x1 = 500 + 600 * Math.cos(rad1);
          const y1 = 500 + 600 * Math.sin(rad1);
          const x2 = 500 + 600 * Math.cos(rad2);
          const y2 = 500 + 600 * Math.sin(rad2);

          return (
            <path
              key={i}
              d={`M 500 500 L ${x1} ${y1} A 600 600 0 0 1 ${x2} ${y2} Z`}
              fill={color2}
              opacity={0.75}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Cute Marine Waves from Reference Image
export const ReferenceWaves: React.FC<{ color?: string }> = ({ color = '#7CB1FF' }) => {
  const frame = useCurrentFrame();
  const offsetX = Math.sin(frame * 0.05) * 20;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '40px',
        left: 0,
        right: 0,
        height: '80px',
        pointerEvents: 'none',
        opacity: 0.8,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 80"
        preserveAspectRatio="none"
        style={{ transform: `translateX(${offsetX}px)` }}
      >
        <path
          d="M 0 30 Q 240 10, 480 30 T 960 30 T 1440 30 T 1920 30"
          fill="none"
          stroke={color}
          strokeWidth="3"
        />
        <path
          d="M 0 50 Q 240 30, 480 50 T 960 50 T 1440 50 T 1920 50"
          fill="none"
          stroke={color}
          strokeWidth="2"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

// Cute Whale Vector Icon matching Reference Image
export const WhaleIcon: React.FC<{ size?: number; color?: string }> = ({
  size = 60,
  color = '#1D6AFF',
}) => {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 100 75" fill="none">
      <path
        d="M 80 45 C 80 25, 60 15, 40 15 C 20 15, 5 30, 5 45 C 5 60, 25 65, 45 65 C 65 65, 80 55, 80 45 Z"
        fill={color}
      />
      <path d="M 75 42 C 88 35, 95 25, 98 20 C 92 35, 90 48, 78 52 Z" fill={color} />
      {/* Water Spout */}
      <path d="M 40 12 C 40 2, 32 0, 30 0 C 32 6, 38 10, 40 12 Z" fill={color} />
      <path d="M 43 12 C 45 4, 53 2, 55 2 C 51 7, 46 10, 43 12 Z" fill={color} />
      {/* Eye */}
      <circle cx="25" cy="40" r="3.5" fill="#FFFFFF" />
    </svg>
  );
};

// Reference Frame & Tech HUD Decorators (Dot grids, corner crosses, chamfer border)
export const ReferenceFrameHUD: React.FC<{ darkTheme?: boolean }> = ({ darkTheme = false }) => {
  const primaryColor = darkTheme ? 'rgba(0, 240, 255, 0.4)' : '#2575FF';
  const subColor = darkTheme ? 'rgba(255, 255, 255, 0.3)' : '#93C5FD';

  return (
    <div
      style={{
        position: 'absolute',
        inset: '30px',
        border: `2px solid ${primaryColor}`,
        borderRadius: '24px',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      {/* Corner Crosshairs */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', color: primaryColor, fontSize: '18px', fontWeight: 900 }}>+</div>
      <div style={{ position: 'absolute', top: '12px', right: '12px', color: primaryColor, fontSize: '18px', fontWeight: 900 }}>+</div>
      <div style={{ position: 'absolute', bottom: '12px', left: '12px', color: primaryColor, fontSize: '18px', fontWeight: 900 }}>+</div>
      <div style={{ position: 'absolute', bottom: '12px', right: '12px', color: primaryColor, fontSize: '18px', fontWeight: 900 }}>+</div>

      {/* Micro Dot Grids */}
      <div style={{ position: 'absolute', top: '16px', left: '40px', color: subColor, letterSpacing: '4px', fontSize: '12px' }}>::::::</div>
      <div style={{ position: 'absolute', top: '16px', right: '40px', color: subColor, letterSpacing: '4px', fontSize: '12px' }}>::::::</div>
      <div style={{ position: 'absolute', bottom: '16px', left: '40px', color: subColor, letterSpacing: '4px', fontSize: '12px' }}>::::::</div>
      <div style={{ position: 'absolute', bottom: '16px', right: '40px', color: subColor, letterSpacing: '4px', fontSize: '12px' }}>::::::</div>
    </div>
  );
};
