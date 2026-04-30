import { StyleSheet } from "react-native";
import { GlobalColors } from "Assets/Colors";

const CHEST_SIZE = 60;

export const MonthlyMissionsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    marginVertical: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 20,
  },
  sectionContainer: {
    backgroundColor: GlobalColors.sectionBackColor,
    borderRadius: 24,
    paddingVertical: 20,
    gap: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    overflow: "hidden",
  },
  missionItem: {
    gap: 10,
    paddingHorizontal: 20,
  },
  separator: {
    height: 2,
    backgroundColor: "#FFFFFF",
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
  },
  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    backgroundColor: GlobalColors.contentBackColor.Dark,
  },
  rewardIcon: {
    position: "absolute",
    right: 0,
    transform: [{ translateY: -5 }],
    width: CHEST_SIZE,
    height: CHEST_SIZE,
    borderRadius: 8,
  },
});
