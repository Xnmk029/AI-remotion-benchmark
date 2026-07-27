import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { BGM_FILENAME, INTRO_SHOWCASE_DURATION, OUTRO_SHOWCASE_DURATION, PROJECTS_DATA } from './clipsData';
import { CyberIntro } from './components/CyberIntro';
import { OutroCard } from './components/OutroCard';
import { UnifiedCollageCard } from './components/UnifiedCollageCard';
import { UnifiedVideoSegment } from './components/UnifiedVideoSegment';

export const ShowreelMain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Compute sequences for all 13 projects with FULL UNTRUNCATED VIDEO DURATIONS
  let timelinePointer = INTRO_SHOWCASE_DURATION;

  const projectSequences = PROJECTS_DATA.map((project, idx) => {
    const cardStart = timelinePointer;
    const cardDuration = project.introCardDuration; // 180 frames (3.0s)

    const videoStart = cardStart + cardDuration;
    const videoDuration = project.durationInFrames; // EXACT FULL VIDEO DURATION (NO TRUNCATION!)

    timelinePointer = videoStart + videoDuration;

    return {
      project,
      index: idx,
      cardStart,
      cardDuration,
      videoStart,
      videoDuration,
    };
  });

  const outroStartFrame = timelinePointer;

  // Chillhop Background Music with volume ducking
  const bgmVolume = interpolate(
    frame,
    [0, 60, durationInFrames - 90, durationInFrames],
    [0, 0.75, 0.75, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0c0e14' }}>
      {/* Background Audio Track */}
      <Audio src={staticFile(BGM_FILENAME)} volume={bgmVolume} />

      {/* 1. Intro Sequence */}
      <Sequence durationInFrames={INTRO_SHOWCASE_DURATION}>
        <CyberIntro totalProjectsCount={PROJECTS_DATA.length} />
      </Sequence>

      {/* 2. Project Sequences: Unified Collage Title Card -> FULL UNTRUNCATED VIDEO */}
      {projectSequences.map((seq) => (
        <React.Fragment key={seq.project.id}>
          {/* Step A: Unified Aesthetic Title Card (Collage + Glitch + Constructivism + MD3) */}
          <Sequence from={seq.cardStart} durationInFrames={seq.cardDuration}>
            <UnifiedCollageCard
              project={seq.project}
              index={seq.index}
              total={PROJECTS_DATA.length}
            />
          </Sequence>

          {/* Step B: 100% Fullscreen FULL UNTRUNCATED Video Playback */}
          <Sequence from={seq.videoStart} durationInFrames={seq.videoDuration}>
            <UnifiedVideoSegment
              project={seq.project}
              index={seq.index}
              total={PROJECTS_DATA.length}
            />
          </Sequence>
        </React.Fragment>
      ))}

      {/* 3. Outro Sequence */}
      <Sequence from={outroStartFrame} durationInFrames={OUTRO_SHOWCASE_DURATION}>
        <OutroCard totalClipsCount={PROJECTS_DATA.length} />
      </Sequence>
    </AbsoluteFill>
  );
};
