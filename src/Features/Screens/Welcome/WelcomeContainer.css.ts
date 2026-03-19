import { StyleSheet } from "react-native";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export const WelcomeContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.contentBackColor.Dark,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "60%",
    marginVertical: 50,
  },
  buttons: {
    marginVertical: 10,
  },
});
