import { screenValues } from "Config/screenValues";
import { StyleSheet } from "react-native";

const { deviceHeight } = screenValues();

export const PodiumContainerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    height: deviceHeight * 0.35,
    marginTop: 20,
  },
});
