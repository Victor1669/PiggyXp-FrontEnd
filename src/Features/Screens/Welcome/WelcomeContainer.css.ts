import { StyleSheet } from "react-native";

import { GlobalColors } from "../../../../assets/Colors";

export const WelcomeContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.contentBackColor.Dark,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "60%",
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    marginVertical: 50,
  },
  buttons: {
    marginVertical: 10,
  },
});
