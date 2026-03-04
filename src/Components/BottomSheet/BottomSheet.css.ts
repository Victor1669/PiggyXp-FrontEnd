import { StyleSheet } from "react-native";

const SHEET_MARGIN_BOTTOM = 20;

export const BottomSheetStyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgb(85, 105, 78)",
    position: "absolute",
    zIndex: 999,
    borderRadius: 50,
    paddingBottom: SHEET_MARGIN_BOTTOM,
    marginBottom: 150,
  },
  interactiveView: {
    width: "100%",
    height: 30,
    padding: 10,
    margin: 0,
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  thumb: {
    backgroundColor: "#ADADAD",
    width: 150,
    height: 15,
    borderRadius: 10,
    margin: "auto",
  },
});
