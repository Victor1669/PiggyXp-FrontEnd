import { Animated } from "react-native";

import { StackAnimationTypes } from "react-native-screens";

export interface AnimationFunction {
  (params: {
    logoScale: Animated.Value;
    titleOpacity: Animated.Value;
    titleScale?: Animated.Value;
    titleCoords?: Animated.ValueXY;
    logoRotateX?: Animated.Value;
    logoRotateY?: Animated.Value;
    logoRotateZ?: Animated.Value;
    logoCoords?: Animated.ValueXY;
    questionMarkerRotateZ?: Animated.Value;
    questionMarkerOpacity?: Animated.Value;
    splashBackColor?: Animated.Value;
  }): Promise<void>;
  initialValues: SplashAnimationInitialValues;
}

interface SplashAnimationInitialValues {
  animationType?: StackAnimationTypes;
  animationDuration?: number;
  initialLogoScale?: Animated.Value | (number & {});
  initialTitleOpacity?: Animated.Value | (number & {});
  initialTitleScale?: Animated.Value | (number & {});
  initialTitleCoords?: { x: number; y: number };
  initialLogoRotateX?: Animated.Value | (number & {});
  initialLogoRotateY?: Animated.Value | (number & {});
  initialLogoRotateZ?: Animated.Value | (number & {});
  initialLogoCoords?: { x: number; y: number };
  initialQuestionMarkerRotateZ?: Animated.Value | (number & {});
  initialQuestionMarkerOpacity?: Animated.Value | (number & {});
  initialSplashBackColor?: number;
}
