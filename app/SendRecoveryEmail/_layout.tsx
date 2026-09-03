import { Stack } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { fontSizes, colors } = AppConfig;

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.contentBackColor.Dark,
        },
        headerTitleStyle: {
          color: "#fff",
          fontSize: fontSizes.TITLE_FONT_SIZE,
        },
        title: "",
        headerTintColor: "#fff",
        contentStyle: {
          backgroundColor: colors.contentBackColor.Dark,
          alignItems: "center",
        },
      }}
    >
      <Stack.Screen
        name="CodeVerifier"
        options={{
          title: "Insira os 4 dígitos enviados ao seu e-mail.",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />
    </Stack>
  );
}
