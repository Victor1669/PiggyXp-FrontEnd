import { useEffect, useRef } from "react";
import { Animated } from "react-native";

const SCALE_SEQUENCES = [
  [1.2, 1, 1],
  [1, 1.2, 1],
  [1, 1, 1.2],
];

export function usePodiumScaleAnimation(position: 1 | 2 | 3) {
  const scaleAnim = useRef(
    new Animated.Value(SCALE_SEQUENCES[0][position - 1]),
  ).current;
  const stepRef = useRef(0);

  useEffect(() => {
    const animate = () => {
      stepRef.current = (stepRef.current + 1) % SCALE_SEQUENCES.length;
      const targetScale = SCALE_SEQUENCES[stepRef.current][position - 1];

      Animated.spring(scaleAnim, {
        toValue: targetScale,
        speed: 3,
        bounciness: 8,
        useNativeDriver: true,
      }).start();
    };

    const interval = setInterval(animate, 3000);
    return () => clearInterval(interval);
  }, [scaleAnim, position]);

  return scaleAnim;
}
