import { Stack } from "expo-router";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

import { GlobalImages } from "@Assets/GlobalImages";
const { close } = GlobalImages;

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
        headerTintColor: GlobalFontColors.Dark,
        headerBackIcon: close,
        headerBackVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Personalizar Perfil",
          headerTitleStyle: {
            color: GlobalFontColors.Dark,
            fontSize: TITLE_FONT_SIZE,
          },
          contentStyle: {
            backgroundColor: GlobalColors.contentBackColor.Dark,
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
