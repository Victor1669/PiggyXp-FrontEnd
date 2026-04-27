import { StatusBar, StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";
const { isDeviceHeigthSmall } = screenValues();

export const ProfileContainerStyles = StyleSheet.create({
  content: {
    paddingTop: StatusBar.currentHeight || 50,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: isDeviceHeigthSmall ? 20 : 5,
  },
  button: {
    width: "90%",
    marginVertical: 30,
  },
});
