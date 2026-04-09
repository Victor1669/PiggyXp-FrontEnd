import { AnimateXYUtil, AnimationUtil } from "@Utils/animationUtils";

import { screenValues } from "Config/screenValues";
const { deviceHeight } = screenValues();

import { AnimationFunction } from "../Types/SplashAnimationsType";

const SplashAnimation5: AnimationFunction = async function ({
  logoScale,
  titleOpacity,
  logoCoords,
  splashBackColor,
}) {
  if (logoCoords === undefined || splashBackColor === undefined) return;

  AnimationUtil({
    animatedValue: splashBackColor,
    duration: 0,
    toValue: 1,
    useNativeDriver: false,
  });

  await AnimateXYUtil({
    animatedValue: logoCoords,
    duration: 2000,
    toValue: { x: 0, y: 0 },
  });

  await AnimationUtil({
    animatedValue: titleOpacity,
    duration: 200,
    toValue: 1,
    delay: 200,
  });
};

SplashAnimation5.initialValues = {
  initialLogoScale: 1,
  animationType: "slide_from_right",
  initialLogoCoords: { x: 0, y: deviceHeight / 2 + 300 },
  initialSplashBackColor: 1,
};

export { SplashAnimation5 };
