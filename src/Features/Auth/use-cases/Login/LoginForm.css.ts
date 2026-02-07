import { StyleSheet } from "react-native";
import { GlobalFontColors } from "../../../../../assets/Colors";

export const LoginFormStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: GlobalFontColors.Dark,
    textAlign: "center",
    marginBottom: 15,
  },
  naoTemConta: {
    flexDirection: "row",
    marginLeft: 30,
  },
});
