import { StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";
const { isDeviceHeigthSmall } = screenValues();

export const DefinePhotoFormStyles = StyleSheet.create({
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
