import { StyleSheet } from "react-native";

import { GlobalColors } from "../../../../../assets/Colors";

const CONTENT_LEFT_SPACE = 10;
const CONTENT_TOP_SPACE = 15;

export const RandomMessageStyles = StyleSheet.create({
  randomMessageContainer: {
    width: "90%",
    backgroundColor: GlobalColors.sectionBackColor,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#fff",
  },
  characterImage: {
    top: CONTENT_TOP_SPACE - 5,
    marginLeft: CONTENT_LEFT_SPACE,
  },
  dialogContainer: {
    width: 215,
    height: 60,
    position: "absolute",
    top: CONTENT_TOP_SPACE,
    left: CONTENT_LEFT_SPACE + 80,
    alignItems: "center",
    justifyContent: "center",
  },
  dialogText: {
    width: "70%",
    fontSize: 14,
    left: CONTENT_LEFT_SPACE + 10,
    top: -10,
  },
});
