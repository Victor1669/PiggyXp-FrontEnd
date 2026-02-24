import { View, StyleSheet, Text } from "react-native";

import HomeHeader from "./Layout/HomeHeader";
import HomeSlider from "./Layout/HomeSlider";
import HomeContent from "./Layout/HomeContent";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export default function HomeContainer() {
  return (
    <View style={HomeStyles.container}>
      <HomeHeader />
      <HomeSlider />
      <View
        style={{
          width: "92%",
          borderBottomWidth: 2,
          borderBottomColor: GlobalFontColors.Dark,
        }}
      >
        <Text
          style={{
            width: "auto",
            margin: "auto",
            paddingHorizontal: 10,
            backgroundColor: GlobalColors.contentBackColor.Dark,
            transform: [{ translateY: 10 }],
            color: GlobalFontColors.Dark,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Novos Horizontes
        </Text>
      </View>
      <HomeContent />
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
