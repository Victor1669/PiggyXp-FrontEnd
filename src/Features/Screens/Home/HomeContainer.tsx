import { View, StyleSheet } from "react-native";

import HomeHeader from "./Layout/HomeHeader";
import HomeSlider from "./Layout/HomeSlider";
import HomeContent from "./Layout/HomeContent";

import ContentSheet from "./Components/ContentSheet";

export default function HomeContainer() {
  const sections = [{ title: "Novos Horizontes" }];

  return (
    <View style={HomeStyles.container}>
      <HomeHeader />
      <HomeSlider />
      <HomeContent sections={sections} />
      <ContentSheet sections={sections} />
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
