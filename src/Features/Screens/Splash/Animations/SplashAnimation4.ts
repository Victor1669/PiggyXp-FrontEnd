import { Easing } from "react-native";

import { screenValues } from "Config/screenValues";
const { deviceHeight } = screenValues();

import {
  AnimationUtil,
  AnimateXYUtil,
  AnimateLoopUtil,
} from "@Utils/animationUtils";

import { AnimationFunction } from "../Types/SplashAnimationsType";

const SplashAnimation4: AnimationFunction = async function ({
  logoScale,
  titleOpacity,
  logoRotateX,
  logoCoords,
}) {
  if (logoRotateX === undefined || logoCoords === undefined) return;

  /* EFEITO GIRATÓRIO */
  const stopLoop = AnimateLoopUtil({
    animatedValue: logoRotateX,
    duration: 1000,
    toValue: 360,
    easing: Easing.linear,
  });

  /* SOBE PRO TOPO*/
  await Promise.all([
    AnimateXYUtil({
      animatedValue: logoCoords,
      duration: 1500,
      toValue: { x: 0, y: -deviceHeight / 3 },
    }),
    AnimationUtil({ animatedValue: logoScale, duration: 500, toValue: 2 }),
  ]);

  /* CAI NO MEIO */
  await Promise.all([
    AnimateXYUtil({
      animatedValue: logoCoords,
      duration: 500,
      toValue: { x: 0, y: 0 },
    }),
    AnimationUtil({ animatedValue: logoScale, duration: 500, toValue: 1 }),
  ]);

  stopLoop();

  await AnimationUtil({
    animatedValue: titleOpacity,
    duration: 200,
    toValue: 1,
    delay: 200,
  });
};

SplashAnimation4.initialValues = {
  initialLogoScale: 3,
  animationType: "slide_from_bottom",
  initialLogoRotateX: 0,
  initialLogoCoords: { x: 0, y: deviceHeight },
  animationDuration: 3000,
};

export { SplashAnimation4 };
