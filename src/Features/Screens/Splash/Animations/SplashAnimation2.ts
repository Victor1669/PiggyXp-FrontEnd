import { AnimationUtil } from "@Utils/animationUtils";

import { AnimationFunction } from "../Types/SplashAnimationsType";

const SplashAnimation2: AnimationFunction = async function ({
  logoScale,
  titleOpacity,
}) {
  if (logoScale === undefined || titleOpacity === undefined) return;
  await AnimationUtil({
    animatedValue: logoScale,
    toValue: 1,
    duration: 1200,
    delay: 100,
  });
  await AnimationUtil({
    animatedValue: titleOpacity,
    toValue: 1,
    duration: 200,
    delay: 100,
  });
};

SplashAnimation2.initialValues = {
  initialLogoScale: 10,
  animationType: "fade",
};

export { SplashAnimation2 };
