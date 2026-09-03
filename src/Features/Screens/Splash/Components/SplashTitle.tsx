import { Animated } from "react-native";

import useSplashAnimation from "../Contexts/useSplashAnimation";
import useSplashAnimatedValues from "../Contexts/useSplashAnimatedValues";

import { AppConfig } from "Config/appConfig";

export default function SplashTitle() {
  const { animationIndex } = useSplashAnimation();
  const { titleOpacity, titleCoords, CAN_RUN_ANIMATION } =
    useSplashAnimatedValues();

  const isWaterAnimation = animationIndex === 4;

  const TITLE_STYLES = [
    {
      transform: [
        { translateX: CAN_RUN_ANIMATION ? titleCoords.x : 0 },
        { translateY: CAN_RUN_ANIMATION ? titleCoords.y : 0 },
      ],
      opacity: CAN_RUN_ANIMATION ? titleOpacity : 0,
      fontSize: AppConfig.fontSizes.TITLE_FONT_SIZE,
      color: isWaterAnimation && CAN_RUN_ANIMATION ? "#fff" : "#000",
    },
  ];

  return <Animated.Text style={TITLE_STYLES}>PiggyXp</Animated.Text>;
}
