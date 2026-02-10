import { StyleSheet } from "react-native";

import { GlobalFontColors } from "@Assets/Colors";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { BIGGER_FONT_SIZE },
} = screenValues();

export const LoadingSpinnerStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    opacity: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  spinner: {
    width: 100,
    height: 100,
  },
  text: {
    color: GlobalFontColors.Dark,
    fontSize: BIGGER_FONT_SIZE,
  },
});
