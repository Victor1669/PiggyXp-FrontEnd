import { StyleSheet } from "react-native";

import { GlobalColors } from "Assets/Colors";

import { screenValues } from "Config/screenValues";
const { deviceWidth } = screenValues();

export const RechargeLivesStyles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    marginVertical: 20,
  },
  introWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 20,
  },
  introPicture: {
    width: 60,
    height: 60,
  },
  introTextWrapper: {
    flex: 1,
  },
  card: {
    backgroundColor: GlobalColors.sectionBackColor,
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    width: deviceWidth * 0.45 - 5,
  },
  cardPicture: {
    width: 90,
    height: 90,
  },
});
