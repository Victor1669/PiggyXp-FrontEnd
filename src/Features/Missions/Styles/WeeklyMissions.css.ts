import { StyleSheet } from "react-native";
import { GlobalColors } from "Assets/Colors";

export const WeeklyMissionsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    marginVertical: 30,
  },
  title: {
    marginBottom: 20,
  },
  cardContainer: {
    overflow: "visible",
    marginTop: 40,
    backgroundColor: GlobalColors.sectionBackColor,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  topPart: {
    backgroundColor: "#FFFFFF",
    height: 175,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: 10,
  },
  picture: {
    width: 200,
    height: 200,
    marginTop: -60,
  },
  bottomPart: {
    height: 130,
    padding: 25,
    justifyContent: "center",
    gap: 15,
  },
});
