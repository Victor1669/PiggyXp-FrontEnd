import { screenValues } from "Config/screenValues";
import { StyleSheet } from "react-native";

const { deviceWidth } = screenValues();

export const LevelHeaderStyles = StyleSheet.create({
  container: {
    width: "90%",
    marginInline: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
    zIndex: 10,
  },
  exitButton: {
    top: 55,
  },
  progressBar: {
    width: deviceWidth * 0.5,
    top: 55,
    alignSelf: "center",
  },
  livesContainer: {
    flexDirection: "row",
    top: 55,
    alignItems: "center",
    gap: 10,
  },
  livesImage: {
    width: 45,
    height: 36,
  },
});
