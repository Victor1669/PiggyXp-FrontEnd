import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { Animate } from "Utils/animate";

import { GlobalImages } from "@Assets/GlobalImages";

import { SplashStyles } from "./SplashScreen.css";
const { container, title } = SplashStyles;

export default function Splash() {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SplashAnimation();
  }, []);

  async function SplashAnimation() {
    await Animate({
      animatedValue: logoScale,
      toValue: 1.1,
      duration: 1200,
      delay: 100,
    });
    await Animate({
      animatedValue: logoScale,
      toValue: 1,
      duration: 200,
    });
    await Animate({
      animatedValue: titleOpacity,
      toValue: 1,
      duration: 200,
      delay: 100,
    });
  }

  return (
    <View style={container}>
      <Animated.Image
        style={{ transform: [{ scale: logoScale }] }}
        source={GlobalImages.mainLogo}
      />
      <Animated.Text style={[title, { opacity: titleOpacity }]}>
        PiggyXp
      </Animated.Text>
    </View>
  );
}
