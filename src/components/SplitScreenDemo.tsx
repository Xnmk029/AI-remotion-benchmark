import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { ProjectItem } from '../clipsData';

export const SplitScreenDemo: React.FC<{
  project: ProjectItem;
}> = ({ project }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const codeSpring = spring({
    frame: frame - 15,
    fps,
    config: { mass: 0.8, damping: 12, stiffness: 90 },
  });

  const slideX = interpolate(codeSpring, [0, 1], [100, 0]);
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  const fadeOutOpacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090c15',
        color: '#ffffff',
        fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
        opacity: opacity * fadeOutOpacity,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      }}
    >
      {/* Left 62% - Live Video Execution Container */}
      <div
        style={{
          width: '62%',
          height: '100%',
          position: 'relative',
          borderRight: `2px solid ${project.primaryColor}`,
          boxShadow: `10px 0 30px rgba(0,0,0,0.7)`,
        }}
      >
        <OffthreadVideo
          src={staticFile(project.filename)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          volume={0}
        />
        {/* PIP Watermark */}
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 24,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${project.primaryColor}`,
            color: project.primaryColor,
            fontWeight: 800,
            fontSize: 12,
            letterSpacing: 2,
            padding: '4px 14px',
            borderRadius: 12,
          }}
        >
          LIVE EXECUTION // PREVIEW
        </div>
      </div>

      {/* Right 38% - Architecture & Code Diagram Card */}
      <div
        style={{
          width: '38%',
          height: '100%',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: `translateX(${slideX}px)`,
          zIndex: 10,
        }}
      >
        {/* Top Title & Specs */}
        <div>
          <div
            style={{
              backgroundColor: project.primaryColor,
              color: '#000000',
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: 2,
              padding: '3px 12px',
              borderRadius: 6,
              display: 'inline-block',
              marginBottom: 12,
            }}
          >
            ARCHITECTURE & SCHEMA
          </div>

          <h2
            style={{
              fontSize: 28,
              fontWeight: 900,
              margin: 0,
              color: '#ffffff',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h2>

          <p style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.7)', marginTop: 8, lineHeight: 1.4 }}>
            {project.subtitle}
          </p>
        </div>

        {/* Code Snippet / State Logic Box */}
        <div
          style={{
            backgroundColor: '#020617',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderLeft: `4px solid ${project.primaryColor}`,
            borderRadius: 12,
            padding: '20px',
            fontFamily: '"Fira Code", "Courier New", monospace',
            fontSize: 13,
            color: '#a5f3fc',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          {project.architectureCodeSnippet ||
            `// Architecture Pipeline\nconst pipeline = initRenderLoop({\n  fps: 60,\n  precision: "highp",\n  shaderVariant: "MD3Constructivism"\n});`}
        </div>

        {/* Real-time Diagnostics Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>FRAME RATE</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: project.primaryColor }}>60 FPS PERFECT</div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px 16px', borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>RATING</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>{project.rating} / 10.0</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
