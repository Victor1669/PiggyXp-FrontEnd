import { Stack } from "expo-router";

import { screenValues } from "Config/screenValues";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export default function _layout() {
  const { fontSizes } = screenValues();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="Config"
        options={{
          title: "Editar Perfil",
          headerTitleStyle: {
            color: GlobalFontColors.Dark,
            fontSize: fontSizes.TITLE_FONT_SIZE,
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: {
            backgroundColor: GlobalColors.contentBackColor.Dark,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
