import { StyleSheet } from "react-native";

import { GlobalColors } from "Assets/Colors";

const GIFT_SIZE = 90;

export const MissionProgressStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    padding: 20,
    borderRadius: 12,
    marginVertical: 10,
    gap: 30,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressInfo: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  barWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBar: {
    flex: 1,
  },
  rewardIcon: {
    position: "absolute",
    right: -25,
    transform: [{ translateY: -5 }],
    width: GIFT_SIZE,
    height: GIFT_SIZE,
  },
});
