import { screenValues } from "Config/screenValues";
const { deviceWidth } = screenValues();

import {
  AnimationUtil,
  AnimateLoopUtil,
  AnimateXYUtil,
} from "@Utils/animationUtils";

import { AnimationFunction } from "../Types/SplashAnimationsType";

const SplashAnimation6: AnimationFunction = async function ({
  logoScale,
  titleOpacity,
  logoCoords,
  logoRotateY,
}) {
  if (logoCoords === undefined || logoRotateY === undefined) return;

  const stopLoop = AnimateLoopUtil({
    animatedValue: logoRotateY,
    duration: 1500,
    toValue: 360,
  });

  /* 1500 MS */
  await Promise.all([
    AnimateXYUtil({
      animatedValue: logoCoords,
      duration: 1500,
      toValue: { x: deviceWidth / 2 - 75, y: 0 },
    }),
    AnimationUtil({ animatedValue: logoScale, duration: 1500, toValue: 0.6 }),
  ]);

  /* 1500 MS */
  await Promise.all([
    AnimateXYUtil({
      animatedValue: logoCoords,
      duration: 1500,
      toValue: { x: 0, y: 0 },
    }),
    AnimationUtil({ animatedValue: logoScale, duration: 750, toValue: 1 }),
  ]);

  stopLoop();

  /* 400  MS */
  await AnimationUtil({
    animatedValue: titleOpacity,
    duration: 200,
    toValue: 1,
    delay: 200,
  });
};

SplashAnimation6.initialValues = {
  initialLogoScale: 0.35,
  animationType: "fade",
  animationDuration: 3800,
  initialLogoCoords: { x: -deviceWidth / 2 - 75, y: 0 },
};

export { SplashAnimation6 };
