import { Link } from "expo-router";
import { View, Text, Image } from "react-native";

import { RootStyles } from "../src/Features/SplashScreen/Styles/root.css";

export default function SplashScreen() {
  return (
    <View style={RootStyles.container}>
      <Text>Splash Screen</Text>
      <Link href="/Swiper">Pular animação (não tem ainda)</Link>
      <Link href="/Content">Pular começo</Link>
    </View>
  );
}
