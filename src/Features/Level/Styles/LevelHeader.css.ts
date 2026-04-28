import { StatusBar, StyleSheet } from "react-native";

export const LevelHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    zIndex: 10,
  },
  exitButton: {
    top: 55,
  },
  progressBar: {
    width: 250,
    top: (StatusBar.currentHeight ?? 40) + 5,
    alignSelf: "center",
  },
  livesContainer: {
    flexDirection: "row",
    top: 55,
    alignItems: "center",
    gap: 10,
  },
  livesImage: {
    width: 45,
    height: 36,
  },
});
