import { View, StyleSheet } from "react-native";

import { useValidateLives } from "./Hooks/useValidateLives";

import HomeHeader from "./Layout/HomeHeader";
import HomeSlider from "./Layout/HomeSlider";
import HomeContent from "./Layout/HomeContent";

import ContentSheet from "./Components/HomeSheet";

export default function HomeContainer() {
  useValidateLives();

  return (
    <View style={HomeStyles.container}>
      <HomeHeader />
      <HomeSlider />
      <HomeContent />
      <ContentSheet />
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
