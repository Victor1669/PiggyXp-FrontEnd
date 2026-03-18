import { Stack } from "expo-router";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";
import { screenValues } from "Config/screenValues";

export default function _layout() {
  const {
    fontSizes: { TITLE_FONT_SIZE },
  } = screenValues();

  return (
    <Stack
      screenOptions={{
        title: "Cadastro",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
        headerTitleStyle: {
          color: GlobalFontColors.Dark,
          fontSize: TITLE_FONT_SIZE,
        },
        headerBackVisible: false,
        contentStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
          flex: 1,
        },
      }}
      key={Date.now().toString()}
    >
      <Stack.Screen
        name="DefinePhoto"
        options={{
          title: "Personalizar Perfil",
          headerTitleStyle: {
            color: GlobalFontColors.Dark,
            fontSize: TITLE_FONT_SIZE,
          },
          contentStyle: {
            backgroundColor: GlobalColors.contentBackColor.Dark,
            alignItems: "center",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
