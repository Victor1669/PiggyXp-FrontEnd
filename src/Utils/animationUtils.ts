import { Animated, EasingFunction } from "react-native";

interface AnimateTypes {
  animatedValue: Animated.Value;
  toValue: number;
  duration: number;
  delay?: number;
  useNativeDriver?: boolean;
}

interface AnimateXYTypes {
  animatedValue: Animated.ValueXY;
  toValue: { x: number; y: number } | Animated.ValueXY;
  duration: number;
  delay?: number;
  useNativeDriver?: boolean;
}

interface AnimateLoopTypes {
  animatedValue: Animated.Value;
  toValue: number;
  duration: number;
  iterations?: number;
  delay?: number;
  useNativeDriver?: boolean;
  easing?: EasingFunction;
}

export function AnimationUtil({
  animatedValue,
  toValue,
  duration,
  delay = 0,
  useNativeDriver = true,
}: AnimateTypes) {
  return new Promise((res) => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver,
    }).start(res);
  });
}

export function AnimateXYUtil({
  animatedValue,
  toValue,
  duration,
  delay = 0,
  useNativeDriver = true,
}: AnimateXYTypes) {
  return new Promise((res) => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver,
    }).start(res);
  });
}

export function AnimateLoopUtil({
  animatedValue,
  toValue,
  duration,
  iterations = -1,
  delay = 0,
  useNativeDriver = true,
  easing = (value) => value,
}: AnimateLoopTypes) {
  const loop = Animated.loop(
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue,
        duration,
        delay,
        useNativeDriver,
        easing,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver,
      }),
    ]),
    { iterations },
  );

  loop.start();
  return () => loop.stop();
}
