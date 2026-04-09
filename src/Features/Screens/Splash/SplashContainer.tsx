import { useEffect } from "react";
import { Animated } from "react-native";

import { screenValues } from "Config/screenValues";

import { useSplashAnimation } from "./Contexts/useSplashAnimation";
import { useSplashAnimatedValues } from "./Contexts/useSplashAnimatedValues";

import SplashLogo from "./Components/SplashLogo";
import SplashParticles from "./Components/SplashParticles";
import SplashTitle from "./Components/SplashTitle";
import QuestionMarker from "./Components/QuestionMarker";

import { SplashStyles } from "./SplashScreen.css";
const { container } = SplashStyles;

export default function Splash() {
  const { animationIndex } = useSplashAnimation();
  const { splashBackColorInterpolated, animatedValues, runAnimation } =
    useSplashAnimatedValues();

  const { deviceHeight } = screenValues();

  const isWaterAnimation = animationIndex === 4;
  const isQuestionAnimation = animationIndex === 6;

  useEffect(() => {
    runAnimation();
  }, []);

  useEffect(() => {
    if (isWaterAnimation)
      animatedValues.forEach((anim, i) => {
        Animated.loop(
          Animated.timing(anim, {
            toValue: -deviceHeight,
            duration: 1800 + i * 500,
            useNativeDriver: true,
          }),
        ).start();
      });
  }, []);

  return (
    <Animated.View
      style={[container, { backgroundColor: splashBackColorInterpolated }]}
    >
      {isQuestionAnimation && <QuestionMarker />}
      <SplashLogo />
      {isWaterAnimation && <SplashParticles />}
      <SplashTitle />
    </Animated.View>
  );
}
