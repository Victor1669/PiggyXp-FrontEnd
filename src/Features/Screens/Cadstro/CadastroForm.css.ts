import { StyleSheet } from "react-native";
import { GlobalFontColors } from "@Colors";

export const CadastroFormStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: GlobalFontColors.Dark,
    textAlign: "center",
    marginBottom: 15,
  },
  jaTemConta: {
    flexDirection: "row",
    marginLeft: 30,
  },
});
