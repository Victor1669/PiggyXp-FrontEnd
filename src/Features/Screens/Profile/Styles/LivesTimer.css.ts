import { StyleSheet } from "react-native";

import { GlobalColors } from "Assets/Colors";

export const LivesTimerStyles = StyleSheet.create({
  livesTimerContainer: { width: "90%", marginTop: 10 },

  livesTimerContent: {
    height: 80,
    marginTop: 10,
    backgroundColor: GlobalColors.sectionBackColor,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
  },
});
