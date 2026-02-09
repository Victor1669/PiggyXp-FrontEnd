import { StyleSheet } from "react-native";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export const OffensiveStyles = StyleSheet.create({
  offensiveContainer: {
    width: "90%",
    justifyContent: "center",
    marginTop: 10,
  },
  offensiveTitle: {
    color: GlobalFontColors.Dark,
    fontSize: 20,
    margin: 5,
  },
  offensiveListContainer: {
    backgroundColor: GlobalColors.sectionBackColor,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
  },
  offensiveImage: {
    width: 75,
    height: 75,
  },
  offensiveList: {
    width: "73%",
    height: "80%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#fff",
    position: "absolute",
    right: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    padding: 5,
  },
  dayText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 14,
    color: GlobalFontColors.Dark,
  },
});
