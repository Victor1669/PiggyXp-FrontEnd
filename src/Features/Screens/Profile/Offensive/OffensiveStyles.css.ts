import { StyleSheet } from "react-native";
import { GlobalColors, GlobalFontColors } from "../../../../../assets/Colors";

export const OffensiveStyles = StyleSheet.create({
  offensiveContainer: {
    width: "90%",
  },
  offensiveTitle: {
    margin: 5,
    color: GlobalFontColors.Dark,
    fontSize: 20,
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
    marginHorizontal: 5,
  },
  offensiveList: {
    height: "80%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#fff",
    marginHorizontal: 5,
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  dayCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    padding: 5,
    margin: 3,
  },
  dayText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    color: GlobalFontColors.Dark,
  },
});
