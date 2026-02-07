import { StyleSheet } from "react-native";

import { GlobalColors } from "../../../../assets/Colors";

export const ProfileContainerStyles = StyleSheet.create({
  profileContainer: {
    width: "100%",
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 15,
  },
});
