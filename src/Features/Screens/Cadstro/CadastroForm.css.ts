import { StyleSheet } from "react-native";
<<<<<<<< HEAD:src/Features/Auth/use-cases/Cadastro/CadastroForm.css.ts
import { GlobalFontColors } from "../../../../../assets/Colors";
========
import { GlobalFontColors } from "@Colors";
>>>>>>>> feature:src/Features/Screens/Cadstro/CadastroForm.css.ts

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
