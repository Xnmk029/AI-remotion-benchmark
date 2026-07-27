import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { IntroSequence } from './IntroSequence';
import { SilhouetteSequence } from './SilhouetteSequence';
import { RevealSequence } from './RevealSequence';
import { TypographySequence } from './TypographySequence';
import { OutroSequence } from './OutroSequence';

export const VTuberDebutMain: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* Sequence 1 (0-300 frames): 悬念引入 */}
      <Sequence from={0} durationInFrames={300} name="Seq 1: Intro">
        <IntroSequence />
      </Sequence>

      {/* Sequence 2 (300-600 frames): 剪影特写 */}
      <Sequence from={300} durationInFrames={300} name="Seq 2: Silhouette">
        <SilhouetteSequence />
      </Sequence>

      {/* Sequence 3 (600-1200 frames): 爆点亮相 */}
      <Sequence from={600} durationInFrames={600} name="Seq 3: Reveal">
        <RevealSequence />
      </Sequence>

      {/* Sequence 4 (1200-1500 frames): 动态排版展示 */}
      <Sequence from={1200} durationInFrames={300} name="Seq 4: Typography">
        <TypographySequence />
      </Sequence>

      {/* Sequence 5 (1500-1800 frames): 结尾信息 */}
      <Sequence from={1500} durationInFrames={300} name="Seq 5: Outro">
        <OutroSequence />
      </Sequence>
    </AbsoluteFill>
  );
};

export default VTuberDebutMain;
