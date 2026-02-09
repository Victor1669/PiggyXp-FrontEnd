import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";
const { isDeviceHeigthSmall, deviceHeight } = screenValues();

export const ProfileContainerStyles = StyleSheet.create({
  content: {
    height: isDeviceHeigthSmall ? deviceHeight - 120 : deviceHeight + 20,
    marginTop: isDeviceHeigthSmall ? 30 : 0,
    alignItems: "center",
    justifyContent: "center",
    gap: isDeviceHeigthSmall ? 20 : 5,
  },
});
