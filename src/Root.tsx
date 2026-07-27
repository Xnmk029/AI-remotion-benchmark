import { Composition } from 'remotion';
import { MainShowreel, TITLE_COVER_DURATION } from './Composition';
import { PROJECTS_DATA, TARGET_FPS } from './clipsData';
import { VTuberDebutMain } from './components/VTuberDebut/VTuberDebutMain';
import { EditorialCover } from './components/EditorialCover/EditorialCover';

export const RemotionRoot: React.FC = () => {
  // Compute total duration in frames dynamically at 30 FPS
  const totalFrames =
    TITLE_COVER_DURATION +
    PROJECTS_DATA.reduce((acc, proj) => acc + proj.introCardDuration + proj.durationInFrames, 0);

  return (
    <>
      <Composition
        id="EditorialCover"
        component={EditorialCover}
        durationInFrames={300}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          bgWatermarkText: 'US  VS  CH',
          mainTitle: '中美大模型 巅峰对决',
          subTitle: '2026 AI MODEL BENCHMARK REPORT // SPECIAL EDITION',
          usModels: ['GPT-4o', 'Claude 3.5 Sonnet'],
          chModels: ['DeepSeek-V3', 'Qwen 2.5 Max'],
          categoryText: 'BENCHMARK VOL. 01',
        }}
      />
      <Composition
        id="VTuberDebutTeaser"
        component={VTuberDebutMain}
        durationInFrames={1800}
        fps={60}
        width={1920}
        height={1080}
      />
      <Composition
        id="Showreel-ZH"
        component={MainShowreel}
        durationInFrames={totalFrames}
        fps={TARGET_FPS} // 30 FPS
        width={1920}
        height={1080}
        defaultProps={{
          lang: 'zh',
        }}
      />
      <Composition
        id="Showreel-EN"
        component={MainShowreel}
        durationInFrames={totalFrames}
        fps={TARGET_FPS} // 30 FPS
        width={1920}
        height={1080}
        defaultProps={{
          lang: 'en',
        }}
      />
    </>
  );
};


