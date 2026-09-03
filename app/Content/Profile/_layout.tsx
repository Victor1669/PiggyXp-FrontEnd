import { Stack } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { fontSizes, colors } = AppConfig;

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.contentBackColor.Dark,
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="ChangeUserInfo"
        options={{
          title: "Editar Perfil",
          headerTitleStyle: {
            color: "#fff",
            fontSize: fontSizes.TITLE_FONT_SIZE,
          },
          headerTitleAlign: "center",
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.contentBackColor.Dark,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
}
