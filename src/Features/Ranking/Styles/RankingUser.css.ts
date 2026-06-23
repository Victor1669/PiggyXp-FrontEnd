import { StyleSheet } from "react-native";
import { screenValues } from "Config/screenValues";

const { deviceWidth } = screenValues();

export const RankingUserStyles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 6,
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageSection: {
    flexDirection: "row",
    alignItems: "center",
    width: deviceWidth * 0.25,
    gap: 20,
  },
  position: {
    width: 32,
    textAlign: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
  },
  usernameContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  chevron: {
    width: 12,
    height: 12,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#fff",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    right: 8,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 8,
    width: "100%",
  },
  xpContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});
