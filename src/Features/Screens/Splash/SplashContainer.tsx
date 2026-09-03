import { useEffect } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { env } from "Config/env";
import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import { useSplashAnimation } from "./Contexts/useSplashAnimation";
import { useSplashAnimatedValues } from "./Contexts/useSplashAnimatedValues";
import { useAuth } from "Features/Auth/Contexts/useAuth";

import SplashLogo from "./Components/SplashLogo";
import SplashParticles from "./Components/SplashParticles";
import SplashTitle from "./Components/SplashTitle";
import QuestionMarker from "./Components/QuestionMarker";
import Paragraph from "Components/Paragraph";

export default function Splash() {
  const { hasUserInfo, hasVerifiedUserInfo } = useAuth();
  const { animationIndex } = useSplashAnimation();
  const { splashBackColorInterpolated, runAnimation, CAN_RUN_ANIMATION } =
    useSplashAnimatedValues();

  const isQuestionAnimation = animationIndex === 6;

  const SPLASH_CONTAINER_STYLES = [
    {
      backgroundColor: CAN_RUN_ANIMATION
        ? splashBackColorInterpolated
        : colors.splashBackColor,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  ];

  useEffect(() => {
    if (!hasUserInfo && hasVerifiedUserInfo) {
      runAnimation();
    }
  }, [hasUserInfo, hasVerifiedUserInfo]);

  return (
    <Animated.View style={SPLASH_CONTAINER_STYLES as any}>
      {isQuestionAnimation && <QuestionMarker />}
      <SplashLogo />
      <SplashParticles />
      <SplashTitle />
      <AppVersion />
    </Animated.View>
  );
}

function AppVersion() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ position: "absolute", bottom: insets.bottom, left: 15 }}>
      <Paragraph color="#000">v{env.version}</Paragraph>
    </View>
  );
}
