import { useEffect } from "react";
import { Animated } from "react-native";

import { useSplashAnimation } from "./Contexts/useSplashAnimation";
import { useSplashAnimatedValues } from "./Contexts/useSplashAnimatedValues";
import { useAuth } from "Features/Auth/Contexts/useAuth";

import SplashLogo from "./Components/SplashLogo";
import SplashParticles from "./Components/SplashParticles";
import SplashTitle from "./Components/SplashTitle";
import QuestionMarker from "./Components/QuestionMarker";

import { SplashStyles } from "./SplashScreen.css";
const { container } = SplashStyles;

import { GlobalColors } from "Assets/Colors";

export default function Splash() {
  const { hasUserInfo, hasVerifiedUserInfo } = useAuth();
  const { animationIndex } = useSplashAnimation();
  const { splashBackColorInterpolated, runAnimation, CAN_RUN_ANIMATION } =
    useSplashAnimatedValues();

  const isQuestionAnimation = animationIndex === 6;

  const SPLASH_CONTAINER_STYLES = [
    container,
    {
      backgroundColor: CAN_RUN_ANIMATION
        ? splashBackColorInterpolated
        : GlobalColors.splashBackColor,
    },
  ];

  useEffect(() => {
    if (!hasUserInfo && hasVerifiedUserInfo) {
      runAnimation();
    }
  }, [hasUserInfo, hasVerifiedUserInfo]);

  return (
    <Animated.View style={SPLASH_CONTAINER_STYLES}>
      {isQuestionAnimation && <QuestionMarker />}
      <SplashLogo />
      <SplashParticles />
      <SplashTitle />
    </Animated.View>
  );
}
