import R, { createContext, useContext, useRef } from "react";
import { Animated, Easing } from "react-native";

import useSplashAnimation from "./useSplashAnimation";
import { useAuth } from "Features/Auth/Contexts/useAuth";

interface SplashAnimatedValuesProviderValues {
  titleOpacity: Animated.Value;
  titleScale: Animated.Value;
  titleCoords: Animated.ValueXY;
  logoScale: Animated.Value;
  logoCoords: Animated.ValueXY;
  logoRotate: { x: Animated.Value; y: Animated.Value; z: Animated.Value };
  logoRotateInterpolated: {
    x: Animated.AnimatedInterpolation<string>;
    y: Animated.AnimatedInterpolation<string>;
    z: Animated.AnimatedInterpolation<string>;
  };
  questionMarkerOpacity: Animated.Value;
  splashBackColor: Animated.Value;
  splashBackColorInterpolated: Animated.AnimatedInterpolation<string>;
  animatedValues: Animated.Value[];
  runAnimation: () => void;
  CAN_RUN_ANIMATION: boolean;
}

const SplashAnimatedValuesContext = createContext<
  SplashAnimatedValuesProviderValues | undefined
>(undefined);

function SplashAnimatedValuesProvider({ children }: { children: R.ReactNode }) {
  const { hasVerifiedUserInfo, hasUserInfo } = useAuth();
  const { pickedAnimation } = useSplashAnimation();

  const CAN_RUN_ANIMATION = hasVerifiedUserInfo && !hasUserInfo;

  const {
    initialTitleOpacity = 0,
    initialTitleScale = 1,
    initialTitleCoords = { x: 0, y: 0 },
    initialLogoScale = 1,
    initialLogoRotateX = 0,
    initialLogoRotateY = 0,
    initialLogoRotateZ = 0,
    initialLogoCoords = { x: 0, y: 0 },
    initialQuestionMarkerRotateZ = 0,
    initialQuestionMarkerOpacity = 0,
    initialSplashBackColor = 0,
  } = pickedAnimation.initialValues;

  const titleOpacity = useRef(
    new Animated.Value(initialTitleOpacity as number),
  ).current;
  const titleScale = useRef(
    new Animated.Value(initialTitleScale as number),
  ).current;
  const titleCoords = useRef(new Animated.ValueXY(initialTitleCoords)).current;

  const logoScale = useRef(
    new Animated.Value(initialLogoScale as number),
  ).current;
  const logoCoords = useRef(new Animated.ValueXY(initialLogoCoords)).current;

  const logoRotate = useRef({
    x: new Animated.Value(initialLogoRotateX as number),
    y: new Animated.Value(initialLogoRotateY as number),
    z: new Animated.Value(initialLogoRotateZ as number),
  }).current;

  const logoRotateInterpolated = {
    x: logoRotate.x.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
    }),
    y: logoRotate.y.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
    }),
    z: logoRotate.z.interpolate({
      inputRange: [0, 360],
      outputRange: ["0deg", "360deg"],
    }),
  };

  const questionMarkerRotateZ = useRef(
    new Animated.Value(initialQuestionMarkerRotateZ as number),
  ).current;

  const questionMarkerOpacity = useRef(
    new Animated.Value(initialQuestionMarkerOpacity as number),
  ).current;

  const splashBackColor = useRef(
    new Animated.Value(initialSplashBackColor as number),
  ).current;

  const splashBackColorInterpolated = splashBackColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#97D98E", "#006994"],
    easing: Easing.linear,
  });

  const animatedValues = useRef(
    Array.from({ length: 10 }).map(() => new Animated.Value(300)),
  ).current;

  function runAnimation() {
    pickedAnimation({
      logoScale,
      titleOpacity,
      titleScale,
      titleCoords,
      logoCoords,
      logoRotateX: logoRotate.x,
      logoRotateY: logoRotate.y,
      logoRotateZ: logoRotate.z,
      questionMarkerRotateZ,
      questionMarkerOpacity,
      splashBackColor,
    });
  }

  const value: SplashAnimatedValuesProviderValues = {
    titleOpacity,
    titleScale,
    titleCoords,
    logoScale,
    logoCoords,
    logoRotate,
    logoRotateInterpolated,
    questionMarkerOpacity,
    splashBackColor,
    splashBackColorInterpolated,
    animatedValues,
    runAnimation,
    CAN_RUN_ANIMATION,
  };

  return (
    <SplashAnimatedValuesContext.Provider value={value}>
      {children}
    </SplashAnimatedValuesContext.Provider>
  );
}

export default function useSplashAnimatedValues() {
  const context = useContext(SplashAnimatedValuesContext);

  if (context === undefined) {
    throw new Error(
      "SplashAnimatedValuesContext usado fora do SplashAnimatedValuesProvider!",
    );
  }

  return context;
}

export { useSplashAnimatedValues, SplashAnimatedValuesProvider };
