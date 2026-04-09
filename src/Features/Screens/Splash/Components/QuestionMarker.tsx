import { Animated } from "react-native";

import useSplashAnimatedValues from "../Contexts/useSplashAnimatedValues";

export default function QuestionMarker() {
  const { questionMarkerRotateZInterpolated, questionMarkerOpacity } =
    useSplashAnimatedValues();

  return (
    <Animated.Text
      style={{
        transform: [{ rotateZ: questionMarkerRotateZInterpolated }],
        opacity: questionMarkerOpacity,
        fontSize: 50,
      }}
    >
      ?
    </Animated.Text>
  );
}
