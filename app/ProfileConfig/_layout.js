import { Stack } from "expo-router";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

import { screenValues } from "Config/screenValues";
const { fontSizes } = screenValues();

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
        headerTintColor: GlobalFontColors.Dark,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Editar Perfil",
          headerTitleStyle: {
            color: GlobalFontColors.Dark,
            fontSize: fontSizes.TITLE_FONT_SIZE,
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
