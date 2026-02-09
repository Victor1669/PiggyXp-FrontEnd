import { StyleSheet } from "react-native";

import { GlobalColors } from "@Assets/Colors";

export const LoginStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    paddingVertical: 100,
  },
  formContainer: {
    marginTop: 40,
    gap: 20,
  },
  naoTemConta: {
    flexDirection: "row",
    margin: 30,
  },
});
