import { Animated } from "react-native";

interface AnimateTypes {
  animatedValue: Animated.Value;
  toValue: number;
  duration: number;
  delay?: number;
  useNativeDriver?: boolean;
}

export function Animate({
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
