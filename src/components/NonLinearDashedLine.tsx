import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

interface NonLinearDashedLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  controlX?: number;
  controlY?: number;
  color?: string;
  strokeWidth?: number;
  dashArray?: string;
  delayFrames?: number;
}

export const NonLinearDashedLine: React.FC<NonLinearDashedLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  controlX,
  controlY,
  color = '#1a1a1a',
  strokeWidth = 1.5,
  dashArray = '6,4',
  delayFrames = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delayFrames);
  
  // Apple Easing Curve (0.16, 1, 0.3, 1) for fluid deceleration
  const progress = interpolate(adjustedFrame, [0, 40], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const cX = controlX ?? (startX + endX) / 2 + 60;
  const cY = controlY ?? (startY + endY) / 2 - 40;

  const pathD = `M ${startX} ${startY} Q ${cX} ${cY} ${endX} ${endY}`;
  const totalLength = 600; // Estimated path length

  const dashOffset = interpolate(progress, [0, 1], [totalLength, 0]);

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 20,
      }}
    >
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
      {/* Endpoint crosshair markers */}
      {progress > 0.05 && (
        <circle cx={startX} cy={startY} r={3} fill={color} />
      )}
      {progress >= 0.95 && (
        <g transform={`translate(${endX}, ${endY})`}>
          <circle cx={0} cy={0} r={4} fill="none" stroke={color} strokeWidth={1.5} />
          <line x1={-6} y1={0} x2={6} y2={0} stroke={color} strokeWidth={1} />
          <line x1={0} y1={-6} x2={0} y2={6} stroke={color} strokeWidth={1} />
        </g>
      )}
    </svg>
  );
};
