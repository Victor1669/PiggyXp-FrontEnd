import { StyleSheet } from "react-native";

export const LevelConclusionStyles = StyleSheet.create({
  container: {
    gap: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    aspectRatio: 16 / 9,
  },
  conclusionMessage: {
    marginHorizontal: 75,
  },
  rewardsTexts: {
    flexDirection: "row",
    gap: 70,
  },
  textsContainer: {
    gap: 20,
  },
  conclusionButton: {
    marginTop: 50,
  },
});
