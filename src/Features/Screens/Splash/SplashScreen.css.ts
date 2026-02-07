import { StyleSheet } from "react-native";
import { GlobalColors } from "@Colors";

export const SplashStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.splashBackColor,
  },
  title: {
    fontSize: 40,
  },
});
