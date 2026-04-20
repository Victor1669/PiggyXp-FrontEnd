import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";

import { GlobalColors } from "Assets/Colors";

const { TABBAR_HEIGHT, deviceWidth } = screenValues();

export const RankingContainerStyles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  scrollContainer: { width: "90%" },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 2 * TABBAR_HEIGHT - 20,
  },
  dividerContainer: {
    borderColor: "#fff",
    borderBottomWidth: 2,
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
  },
  divider: {
    width: deviceWidth * 0.55,
    marginHorizontal: "auto",
    transform: [{ translateY: 15 }],
    backgroundColor: GlobalColors.contentBackColor.Dark,
  },
  placeHolder: { position: "absolute", bottom: TABBAR_HEIGHT + 40 },
});
