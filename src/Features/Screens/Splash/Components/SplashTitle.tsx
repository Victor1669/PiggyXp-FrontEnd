import { Animated } from "react-native";

import useSplashAnimation from "../Contexts/useSplashAnimation";
import useSplashAnimatedValues from "../Contexts/useSplashAnimatedValues";

import { SplashStyles } from "../SplashScreen.css";
const { title } = SplashStyles;

export default function SplashTitle() {
  const { animationIndex } = useSplashAnimation();
  const { titleOpacity, titleCoords } = useSplashAnimatedValues();

  const isWaterAnimation = animationIndex === 4;

  return (
    <Animated.Text
      style={[
        title,
        {
          transform: [
            { translateX: titleCoords.x },
            { translateY: titleCoords.y },
          ],
          opacity: titleOpacity,
          color: isWaterAnimation ? "#fff" : "#000",
        },
      ]}
    >
      PiggyXp
    </Animated.Text>
  );
}
