import { StyleSheet } from "react-native";

import { GlobalColors } from "@Assets/Colors";

const CONTENT_LEFT_SPACE = 10;
const CONTENT_TOP_SPACE = 15;

export const RandomMessageStyles = StyleSheet.create({
  randomMessageContainer: {
    width: "90%",
    backgroundColor: GlobalColors.sectionBackColor,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#fff",
    marginTop: 10,
  },
  characterImage: {
    height: "80%",
    margin: "auto",
    marginLeft: CONTENT_LEFT_SPACE,
  },
  dialogContainer: {
    height: 60,
    position: "absolute",
    top: CONTENT_TOP_SPACE,
    right: 10,
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
