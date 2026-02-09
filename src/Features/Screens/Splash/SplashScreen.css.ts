import { StyleSheet } from "react-native";

import { GlobalColors } from "@Assets/Colors";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { TITLE_FONT_SIZE },
} = screenValues();

export const SplashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.splashBackColor,
  },
  title: {
    fontSize: TITLE_FONT_SIZE,
  },
});
