import { StyleSheet } from "react-native";

export const LoadingSpinnerStyles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    opacity: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  spinner: {
    width: 100,
    height: 100,
  },
});
