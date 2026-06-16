import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";

import { GlobalColors, GlobalFontColors } from "Assets/Colors";

const { deviceWidth, deviceHeight } = screenValues();

export const HomeContentStyles = StyleSheet.create({
  sectionTitleContainer: {
    width: "92%",
    borderBottomWidth: 2,
    borderBottomColor: GlobalFontColors.Dark,
    marginBottom: 20,
  },
  sectionTitle: {
    width: "auto",
    margin: "auto",
    paddingHorizontal: 10,
    backgroundColor: GlobalColors.contentBackColor.Dark,
    transform: [{ translateY: 10 }],
  },
  scrollView: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.68,
  },
});
