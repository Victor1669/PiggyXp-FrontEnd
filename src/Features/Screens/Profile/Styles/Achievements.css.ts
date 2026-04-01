import { StyleSheet } from "react-native";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export const AchievementsStyles = StyleSheet.create({
  achievementsContainer: {
    width: "90%",
    justifyContent: "center",
    marginTop: 10,
  },
  achievementList: {
    width: "100%",
    backgroundColor: GlobalColors.sectionBackColor,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: GlobalFontColors.Dark,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  achievement: {
    width: 80,
    height: 80,

    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  seeMore: {
    flex: 1,
    fontStyle: "italic",
    color: GlobalFontColors.Dark,
    textAlignVertical: "center",
    textAlign: "center",
  },
});
