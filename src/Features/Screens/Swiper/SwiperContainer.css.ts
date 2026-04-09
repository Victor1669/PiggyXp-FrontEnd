import { Dimensions, StyleSheet } from "react-native";

import { GlobalColors } from "@Assets/Colors";

const { height } = Dimensions.get("window");

export const SwiperStyles = StyleSheet.create({
  container: {
    height,
    backgroundColor: GlobalColors.splashBackColor,
    justifyContent: "center",
  },
  content: {
    height: height * 0.9,
  },
});
