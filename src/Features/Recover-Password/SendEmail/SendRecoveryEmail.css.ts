import { StyleSheet } from "react-native";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";
import { screenValues } from "Config/screenValues";
const {
  fontSizes: { TITLE_FONT_SIZE, SMALL_FONT_SIZE },
} = screenValues();

export const SendRecoveryEmailStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    alignItems: "center",
  },
  title: {
    width: "60%",
    fontSize: TITLE_FONT_SIZE,
    color: GlobalFontColors.Dark,
    textAlign: "center",
    marginVertical: 40,
  },
  subTitle: {
    marginBottom: 40,
    width: "85%",
    fontSize: SMALL_FONT_SIZE,
    color: GlobalFontColors.Dark,
    textAlign: "center",
  },
});
