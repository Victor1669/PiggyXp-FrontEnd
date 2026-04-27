import { StatusBar, StyleSheet } from "react-native";

export const LevelContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  timer: {
    alignSelf: "center",
    position: "absolute",
    top: (StatusBar.currentHeight ?? 40) + 50,
  },
  bottomSheet: {
    paddingHorizontal: 20,
    bottom: 0,
  },
});
