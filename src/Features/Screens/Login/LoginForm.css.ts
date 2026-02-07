import { StyleSheet } from "react-native";
<<<<<<<< HEAD:src/Features/Auth/use-cases/Login/LoginForm.css.ts
import { GlobalFontColors } from "../../../../../assets/Colors";
========
import { GlobalFontColors } from "@Colors";
>>>>>>>> feature:src/Features/Screens/Login/LoginForm.css.ts

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
