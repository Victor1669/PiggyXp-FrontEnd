import { View, StyleSheet } from "react-native";

import HomeHeader from "./Layout/HomeHeader";
import HomeSlider from "./Layout/HomeSlider";
import HomeContent from "./Layout/HomeContent";

import ContentSheet from "./Components/ContentSheet";

export default function HomeContainer() {
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
