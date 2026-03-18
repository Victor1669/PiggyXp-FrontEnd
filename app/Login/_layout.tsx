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
        title: "Login",
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
            backgroundColor: GlobalColors.contentBackColor.Dark,
          },
        }}
      />
    </Stack>
  );
}
