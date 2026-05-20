import { StyleSheet } from "react-native";
import { GlobalColors } from "Assets/Colors";

const GIFT_SIZE = 90;

export const DailyMissions = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    gap: 20,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
  progressBar: {
    flex: 1,
    height: 40,
  },
  rewardIcon: {
    position: "absolute",
    right: -25,
    transform: [{ translateY: -5 }],
    width: GIFT_SIZE,
    height: GIFT_SIZE,
    zIndex: 2,
  },
});
