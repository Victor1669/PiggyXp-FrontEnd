import { AnimationUtil, AnimateXYUtil } from "@Utils/animationUtils";

import { AnimationFunction } from "../Types/SplashAnimationsType";

const SplashAnimation3: AnimationFunction = async function ({
  logoScale,
  titleOpacity,
  logoRotateZ,
  logoCoords,
}) {
  if (logoRotateZ === undefined || logoCoords === undefined) {
    return;
  }

  // 1. ESCALA (Total: 1200ms)
  await AnimationUtil({
    animatedValue: logoScale,
    toValue: 1.1,
    duration: 1000,
    delay: 50,
  });
  await AnimationUtil({
    animatedValue: logoScale,
    toValue: 1,
    duration: 150,
  });

  // 2. TÍTULO
  await AnimationUtil({
    animatedValue: titleOpacity,
    toValue: 1,
    duration: 200,
    delay: 100,
  });

  await new Promise((resolve) => setTimeout(resolve, 540));

  // 3. INÍCIO DA SUBIDA
  await Promise.all([
    AnimationUtil({
      animatedValue: logoRotateZ,
      toValue: 40,
      duration: 300,
      delay: 200,
    }),
    AnimateXYUtil({
      animatedValue: logoCoords,
      toValue: { x: 40, y: 0 },
      duration: 300,
      delay: 200,
    }),
  ]);

  // 4. SUBIDA FINAL
  await AnimateXYUtil({
    animatedValue: logoCoords,
    toValue: { x: 40, y: -600 },
    duration: 300,
    delay: 100,
  });
};

SplashAnimation3.initialValues = {
  initialLogoScale: 0.5,
  animationType: "slide_from_bottom",
  initialLogoRotateZ: 0,
  initialLogoCoords: { x: 0, y: 0 },
  animationDuration: 3000,
};

export { SplashAnimation3 };
