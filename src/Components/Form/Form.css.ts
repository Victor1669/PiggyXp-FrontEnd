import { StyleSheet } from "react-native";

import { GlobalFontColors } from "@Assets/Colors";

export { FormGlobalStyles, FieldGlobalStyles };

import { screenValues } from "Config/screenValues";
const {
  isDeviceHeigthSmall,
  fontSizes: { DEFAULT_FONT_SIZE },
} = screenValues();

const FormGlobalStyles = StyleSheet.create({
  form: {
    width: "90%",
    margin: "auto",
    alignItems: "center",
    gap: isDeviceHeigthSmall ? 10 : 20,
  },
  forgotPassword: {
    color: GlobalFontColors.Dark,
    width: "100%",
    textAlign: "right",
    textDecorationLine: "underline",
  },
  button: {
    marginVertical: 10,
  },
});

const FieldGlobalStyles = StyleSheet.create({
  fieldsContainer: {
    gap: isDeviceHeigthSmall ? 20 : 40,
  },
  field: {
    marginTop: 10,
  },
  label: {
    color: GlobalFontColors.Dark,
    position: "absolute",
    left: 10,
    fontSize: DEFAULT_FONT_SIZE,
  },
  input: {
    borderRadius: 10,
    padding: isDeviceHeigthSmall ? 10 : 20,
    color: GlobalFontColors.Dark,
  },
  error: {
    color: "#f00",
  },
});
