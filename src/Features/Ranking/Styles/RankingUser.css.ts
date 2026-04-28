import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";

const { deviceWidth } = screenValues();

export const RankingUserStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#02B1E2",
    borderRadius: 15,
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
    width: "80%",
    margin: "auto",
    borderRadius: 5,
  },
  xpText: { marginRight: 20 },
});
