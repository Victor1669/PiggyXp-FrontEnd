import { Stack } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { fontSizes, colors } = AppConfig;

export default function _layout() {
  const titleFontSize = fontSizes.TITLE_FONT_SIZE;

  return (
    <Stack
      screenOptions={{
        title: "Cadastro",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.contentBackColor.Dark,
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: titleFontSize,
        },
        headerBackVisible: false,
        contentStyle: {
          backgroundColor: colors.contentBackColor.Dark,
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
            color: "#fff",
            fontSize: titleFontSize,
          },
          contentStyle: {
            backgroundColor: colors.contentBackColor.Dark,
            alignItems: "center",
          },
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
