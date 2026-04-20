import { StyleSheet } from "react-native";

export const RankingPodiumUserStyles = StyleSheet.create({
  container: { width: `100%` },
  imageBackground: {
    width: 110,
    height: 110,
    margin: "auto",
  },
  userImage: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    margin: "auto",
    borderRadius: 50,
  },
  userXpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
});
