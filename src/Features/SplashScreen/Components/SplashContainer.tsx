import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { useRouter } from "expo-router";

import { Animate } from "../Utils/Animate";

import { GlobalImages } from "../../../../assets/Images";
import { SplashStyles } from "../Styles/SplashScreen.css";

export default function Splash() {
  const router = useRouter();

  const logoScale = useRef(new Animated.Value(0.5)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SplashAnimation();
  }, []);

  async function SplashAnimation() {
    await Animate(logoScale, 1.1, 1200, 100);
    await Animate(logoScale, 1, 200);
    await Animate(titleOpacity, 1, 200, 100);

    setTimeout(() => {
      router.push("/Swiper");
    }, 1000);
  }
  return (
    <View style={SplashStyles.container}>
      <Animated.Image
        style={{ transform: [{ scale: logoScale }] }}
        source={GlobalImages.mainLogo}
      />
      <Animated.Text style={[SplashStyles.title, { opacity: titleOpacity }]}>
        PiggyXp
      </Animated.Text>
    </View>
  );
}
