import { Animated } from "react-native";

export function Animate(
  animatedValue: Animated.Value,
  toValue: number,
  duration: number,
  delay = 0
) {
  return new Promise((res) => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(res);
  });
}
