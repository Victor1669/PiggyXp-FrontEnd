import { StyleSheet } from "react-native";

import { GlobalColors, GlobalFontColors } from "Assets/Colors";

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
});
