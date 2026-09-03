import { Stack } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { fontSizes, colors } = AppConfig;

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        title: "Login",
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.contentBackColor.Dark,
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: fontSizes.TITLE_FONT_SIZE,
        },
        headerBackVisible: false,
        contentStyle: {
          backgroundColor: colors.contentBackColor.Dark,
        },
      }}
      key={Date.now().toString()}
    >
      <Stack.Screen
        name="DifficultySelector"
        options={{
          headerShown: false,
          contentStyle: {
            alignItems: "center",
            backgroundColor: colors.contentBackColor.Dark,
          },
        }}
      />
    </Stack>
  );
}
