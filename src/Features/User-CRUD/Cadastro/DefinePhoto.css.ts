import { StyleSheet } from "react-native";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";
const { contentBackColor } = GlobalColors;

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { SMALL_FONT_SIZE },
  isDeviceHeigthSmall,
} = screenValues();

export const DefinePhotoFormStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: contentBackColor.Dark,
    alignItems: "center",
  },
  subtitle: {
    color: GlobalFontColors.Dark,
    fontSize: SMALL_FONT_SIZE,
    textAlign: "center",
    marginVertical: 20,
  },
  uploadImageContainer: {
    backgroundColor: "#B4B4B4",
    borderRadius: "50%",
    marginVertical: isDeviceHeigthSmall ? 10 : 75,
  },
  uploadButton: {
    width: "90%",
    backgroundColor: "rgb(255,255,255,0.30)",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 0.5,
    padding: 10,
    marginTop: 20,
    marginBottom: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
