import { StyleSheet, StatusBar } from "react-native";

export const MissionsHeaderStyles = StyleSheet.create({
  container: {
    backgroundColor: "#314A63",
    paddingHorizontal: "5%",
    paddingTop: (StatusBar.currentHeight ?? 55) + 20,
  },
  headerText: {
    marginBottom: 20,
  },
});
