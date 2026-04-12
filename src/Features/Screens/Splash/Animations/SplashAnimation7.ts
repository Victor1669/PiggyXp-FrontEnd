import { screenValues } from "Config/screenValues";
const { deviceHeight } = screenValues();

import { AnimationUtil, AnimateXYUtil } from "@Utils/animationUtils";

import { AnimationFunction } from "../Types/SplashAnimationsType";

const SplashAnimation7: AnimationFunction = async function ({
  logoScale,
  titleOpacity,
  titleCoords,
  logoRotateY,
  logoRotateX,
  questionMarkerOpacity,
  logoCoords,
}) {
  if (
    logoRotateY === undefined ||
    logoRotateX === undefined ||
    questionMarkerOpacity === undefined ||
    logoCoords === undefined ||
    titleCoords === undefined
  )
    return;
  const LOGO_INCLINATION = 60;

  /* APARIÇÃO NORMAL: 700ms */
  await AnimationUtil({
    animatedValue: logoScale,
    toValue: 1,
    duration: 700,
  });

  /* PRIMEIRA INCLINAÇÃO 800ms */
  await AnimationUtil({
    animatedValue: logoRotateY,
    toValue: LOGO_INCLINATION,
    duration: 200,
    delay: 600,
  });

  /* INCLINAÇÃO PRO OUTRO LADO 700ms */
  await AnimationUtil({
    animatedValue: logoRotateY,
    toValue: -LOGO_INCLINATION,
    duration: 200,
    delay: 500,
  });

  /* APARIÇÃO DA INTERROGAÇÃO 500ms */
  await Promise.all([
    AnimationUtil({
      animatedValue: logoRotateY,
      toValue: 0,
      duration: 200,
      delay: 300,
    }),
    AnimationUtil({
      animatedValue: questionMarkerOpacity,
      toValue: 1,
      duration: 200,
      delay: 300,
    }),
  ]);

  /* COLETA DO TÍTULO 1000ms */
  await AnimationUtil({
    animatedValue: questionMarkerOpacity,
    toValue: 0,
    duration: 50,
    delay: 200,
  });

  await Promise.all([
    AnimationUtil({
      animatedValue: logoRotateX,
      toValue: 60,
      duration: 250,
    }),
    AnimateXYUtil({
      animatedValue: logoCoords,
      duration: 250,
      toValue: { x: 0, y: -deviceHeight / 2 },
    }),
  ]);

  await Promise.all([
    AnimateXYUtil({
      animatedValue: logoCoords,
      duration: 500,
      toValue: { x: 0, y: 0 },
    }),
    AnimateXYUtil({
      animatedValue: titleCoords,
      duration: 500,
      toValue: { x: 0, y: 0 },
    }),
    AnimationUtil({
      animatedValue: logoRotateX,
      toValue: 0,
      duration: 500,
    }),
  ]);
};

SplashAnimation7.initialValues = {
  initialLogoScale: 0.5,
  animationType: "fade",
  initialLogoRotateY: 0,
  initialLogoRotateX: 0,
  initialQuestionMarkerOpacity: 0,
  initialTitleCoords: { x: 0, y: -deviceHeight },
  initialLogoCoords: { x: 0, y: 0 },
  initialTitleOpacity: 1,
  animationDuration: 4700,
};

export { SplashAnimation7 };
