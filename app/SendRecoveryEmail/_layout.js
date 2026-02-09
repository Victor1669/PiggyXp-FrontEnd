import { Stack } from "expo-router";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { TITLE_FONT_SIZE },
} = screenValues();

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
        headerTitleStyle: {
          color: GlobalFontColors.Dark,
          fontSize: TITLE_FONT_SIZE,
        },
        title: "",
        headerTintColor: GlobalFontColors.Dark,
        contentStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
      }}
    />
  );
}
