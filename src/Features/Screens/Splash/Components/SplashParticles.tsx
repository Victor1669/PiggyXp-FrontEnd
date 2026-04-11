import { useEffect } from "react";
import { Animated } from "react-native";

import { screenValues } from "Config/screenValues";

import { useSplashAnimatedValues } from "../Contexts/useSplashAnimatedValues";
import { useSplashAnimation } from "../Contexts/useSplashAnimation";
import { useAuth } from "Features/Auth/Contexts/useAuth";

export default function SplashParticles() {
  const { deviceHeight } = screenValues();

  const { hasVerifiedUserInfo } = useAuth();
  const { animatedValues, CAN_RUN_ANIMATION } = useSplashAnimatedValues();
  const { animationIndex } = useSplashAnimation();
  const particles = Array.from({ length: 10 });

  const isWaterAnimation = animationIndex === 4;

  useEffect(() => {
    if (CAN_RUN_ANIMATION && isWaterAnimation)
      animatedValues.forEach((anim, i) => {
        Animated.loop(
          Animated.timing(anim, {
            toValue: -deviceHeight,
            duration: 1800 + i * 500,
            useNativeDriver: true,
          }),
        ).start();
      });
  }, [hasVerifiedUserInfo]);

  if (CAN_RUN_ANIMATION && isWaterAnimation)
    return particles.map((_, i) => (
      <Animated.View
        key={i}
        style={{
          position: "absolute",
          bottom: -50,
          left: Math.random() * 300,
          width: 30,
          height: 30,
          borderRadius: 30,
          backgroundColor: "#fff",
          opacity: 0.3,
          transform: [{ translateY: animatedValues[i] }],
        }}
      />
    ));
}
