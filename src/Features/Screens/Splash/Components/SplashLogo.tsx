import { Animated } from "react-native";

import useSplashAnimatedValues from "../Contexts/useSplashAnimatedValues";

export default function SplashLogo() {
  const { logoCoords, logoRotateInterpolated, logoScale } =
    useSplashAnimatedValues();

  return (
    <Animated.View
      style={{
        transform: [{ translateX: logoCoords.x }, { translateY: logoCoords.y }],
        zIndex: 10,
        width: 200,
        height: 200,
      }}
    >
      <Animated.Image
        style={{
          transform: [
            { rotateX: logoRotateInterpolated.x },
            { rotateY: logoRotateInterpolated.y },
            { rotateZ: logoRotateInterpolated.z },
            { scale: logoScale },
          ],
          width: 200,
          height: 200,
        }}
        source={require("../Assets/Logo_Splash.png")}
      />
    </Animated.View>
  );
}
