import { Animated } from "react-native";

interface AnimateTypes {
  animatedValue: Animated.Value;
  toValue: number;
  duration: number;
  delay?: number;
  useNativeDriver?: boolean;
}

/**
 *
 * @param animatedValue Variável de animação Ex: useRef(new Animated.Value(0)).current
 * @param toValue Valor da variável no final da animação
 * @param duration Duração em milissegundos da animação
 * @param delay Daly da animação em milissegundos
 * @param useNativeDriver Usar drivers nativos para animação (nem sempre funciona)
 * @returns
 */
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
