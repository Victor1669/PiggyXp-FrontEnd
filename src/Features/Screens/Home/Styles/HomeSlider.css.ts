import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";

import { GlobalFontColors } from "@Assets/Colors";

const {
  fontSizes: { SMALL_FONT_SIZE },
} = screenValues();

export const HomeSliderStyles = StyleSheet.create({
  cardTitle: {
    color: GlobalFontColors.Dark,
    fontWeight: "bold",
    fontSize: SMALL_FONT_SIZE,
    textAlign: "left",
  },
  card1: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    gap: 35,
  },
  card2: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: "center",
  },
  card3: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
