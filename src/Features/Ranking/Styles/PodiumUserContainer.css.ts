import { StyleSheet } from "react-native";

export const PodiumUserContainerStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-end",
    gap: 20,
    width: `30%`,
  },
  podiumContainer: { justifyContent: "flex-end" },
  positionText: { flex: 1 },
});
