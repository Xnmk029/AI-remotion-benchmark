import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
} from 'remotion';
import {
  PROJECTS_DATA,
} from './clipsData';
import { CollageIntroWindow } from './components/CollageIntroWindow';
import { FullVideoSegment } from './components/FullVideoSegment';
import { GlobalTitleCover } from './components/GlobalTitleCover';

interface MainShowreelProps {
  lang?: 'zh' | 'en';
}

export const TITLE_COVER_DURATION = 150; // 5.0 seconds at 30 FPS

export const MainShowreel: React.FC<MainShowreelProps> = ({ lang = 'zh' }) => {
  const { fps } = useVideoConfig();

  let currentFrameOffset = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#f7f7f7' }}>
      {/* STEP 1: GLOBAL TITLE HERO COVER PAGE (5.0s = 150 frames at 30fps) */}
      <Sequence from={currentFrameOffset} durationInFrames={TITLE_COVER_DURATION}>
        <GlobalTitleCover lang={lang} />
      </Sequence>

      {/* Update offset after Title Cover */}
      {(() => {
        currentFrameOffset += TITLE_COVER_DURATION;
        return null;
      })()}

      {/* STEP 2: RENDER ALL PROJECTS IN SEQUENCE */}
      {PROJECTS_DATA.map((project) => {
        // Phase A: Collage Freeze Frame Intro Window (90 frames = 3.0s at 30fps)
        const introStart = currentFrameOffset;
        const introDuration = project.introCardDuration;
        currentFrameOffset += introDuration;

        // Phase B: Full Untruncated Video Display
        const videoStart = currentFrameOffset;
        const videoDuration = project.durationInFrames;
        currentFrameOffset += videoDuration;

        return (
          <React.Fragment key={project.id}>
            {/* Phase A: Non-fullscreen Collage Intro */}
            <Sequence from={introStart} durationInFrames={introDuration}>
              <CollageIntroWindow project={project} lang={lang} />
            </Sequence>

            {/* Phase B: 100% Untruncated Full Duration Video */}
            <Sequence from={videoStart} durationInFrames={videoDuration}>
              <FullVideoSegment project={project} lang={lang} />
            </Sequence>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
