import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

// 开启 GPU 硬件加速 (Windows ANGLE / Direct3D)
Config.setChromiumOpenGlRenderer('angle');


