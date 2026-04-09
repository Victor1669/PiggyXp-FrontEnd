import { AnimationUtil } from "@Utils/animationUtils";

import { AnimationFunction } from "../Types/SplashAnimationsType";

const SplashAnimation1: AnimationFunction = async function ({
  logoScale,
  titleOpacity,
}) {
  await AnimationUtil({
    animatedValue: logoScale,
    toValue: 1.1,
    duration: 1200,
    delay: 100,
  });
  await AnimationUtil({
    animatedValue: logoScale,
    toValue: 1,
    duration: 200,
  });
  await AnimationUtil({
    animatedValue: titleOpacity,
    toValue: 1,
    duration: 200,
    delay: 100,
  });
};

SplashAnimation1.initialValues = {
  initialLogoScale: 0.5,
  animationType: "fade",
};

export { SplashAnimation1 };
