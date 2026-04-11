import { Animated } from "react-native";

import useSplashAnimatedValues from "../Contexts/useSplashAnimatedValues";

export default function SplashLogo() {
  const { logoCoords, logoRotateInterpolated, logoScale, CAN_RUN_ANIMATION } =
    useSplashAnimatedValues();

  const LOGO_CONTAINER_STYLES = {
    transform: [
      { translateX: CAN_RUN_ANIMATION ? logoCoords.x : 0 },
      { translateY: CAN_RUN_ANIMATION ? logoCoords.y : 0 },
    ],
    zIndex: 10,
    width: 200,
    height: 200,
  };

  const LOGO_STYLES = {
    transform: [
      { rotateX: logoRotateInterpolated.x },
      { rotateY: logoRotateInterpolated.y },
      { rotateZ: logoRotateInterpolated.z },
      { scale: CAN_RUN_ANIMATION ? logoScale : 0 },
    ],
    width: 200,
    height: 200,
  };

  return (
    <Animated.View style={LOGO_CONTAINER_STYLES}>
      <Animated.Image
        style={LOGO_STYLES}
        source={require("../Assets/Logo_Splash.png")}
      />
    </Animated.View>
  );
}
