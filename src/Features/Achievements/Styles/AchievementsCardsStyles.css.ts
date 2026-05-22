import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";

const { deviceWidth } = screenValues();

const CARD_IMAGE_SIZE = deviceWidth * 0.4;

export const AchievementsStyles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",

    width: 196,
    height: 196,
    marginTop: 20,
    marginBottom: 80,
    backgroundColor: "#1F3B66",
    borderRadius: "50%",
    boxShadow: "0 4px 4px black",
  },
  cardImage: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
    marginBottom: 20,
    top: -7,
  },
  progressBar: { margin: 5, width: "90%" },
});
