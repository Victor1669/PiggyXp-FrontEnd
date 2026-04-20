import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";
const { deviceWidth, TABBAR_HEIGHT } = screenValues();

import { GlobalColors } from "Assets/Colors";

export const YourUserOutOfRankingStyles = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: GlobalColors.formButtonBackColor,
    borderRadius: 15,
    position: "absolute",
    bottom: TABBAR_HEIGHT + 10,
  },
  imageContainer: {
    flexDirection: "row",
    width: deviceWidth * 0.3,
  },
  positionNumber: { width: 30, margin: 20 },
  userImage: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    margin: "auto",
    borderRadius: 30,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  userName: { width: deviceWidth * 0.3 },
  numberXpContainer: { flex: 1, justifyContent: "center" },
  numberXp: {
    backgroundColor: "#fff",
    width: "70%",
    margin: "auto",
    borderRadius: 5,
  },
  xpText: { marginRight: 20 },
});
