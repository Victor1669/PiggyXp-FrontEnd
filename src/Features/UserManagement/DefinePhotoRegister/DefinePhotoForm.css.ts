import { StyleSheet } from "react-native";

import { GlobalColors, GlobalFontColors } from "@Colors";

const { contentBackColor } = GlobalColors;

export const DefinePhotoFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: contentBackColor.Dark,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "85%",
    color: GlobalFontColors.Dark,
    fontSize: 26,
    textAlign: "left",
  },
  subtitle: {
    width: "85%",
    color: GlobalFontColors.Dark,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 20,
  },
  uploadImageContainer: {
    backgroundColor: "#B4B4B4",
    borderRadius: "50%",
    marginVertical: 75,
  },
  uploadButton: {
    backgroundColor: "rgb(255,255,255,0.30)",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 0.5,
    padding: 10,
    margin: 15,
    marginBottom: 100,
    width: 290,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
