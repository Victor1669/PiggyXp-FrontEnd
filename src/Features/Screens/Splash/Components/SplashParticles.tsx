import { Animated } from "react-native";

import useSplashAnimatedValues from "../Contexts/useSplashAnimatedValues";

export default function SplashParticles() {
  const { animatedValues } = useSplashAnimatedValues();
  const particles = Array.from({ length: 10 });

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
