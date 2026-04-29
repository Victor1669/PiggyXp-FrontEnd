import { Animated } from "react-native";

import useSplashAnimatedValues from "../Contexts/useSplashAnimatedValues";

export default function QuestionMarker() {
  const { questionMarkerOpacity } = useSplashAnimatedValues();

  return (
    <Animated.Text
      style={{
        opacity: questionMarkerOpacity,
        fontSize: 50,
      }}
    >
      ?
    </Animated.Text>
  );
}
