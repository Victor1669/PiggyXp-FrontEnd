import { Stack } from "expo-router";

import { AchievementsProvider } from "Features/Achievements/Contexts/useAchievements";

import { screenValues } from "Config/screenValues";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export default function _layout() {
  const { fontSizes } = screenValues();
  return (
    <AchievementsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Conquistas",
            headerShown: true,
            headerTitleStyle: {
              color: GlobalFontColors.Dark,
              fontSize: fontSizes.TITLE_FONT_SIZE,
            },
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: GlobalColors.contentBackColor.Dark,
            },
            headerTintColor: "#fff",
            contentStyle: {
              backgroundColor: GlobalColors.contentBackColor.Dark,
            },
          }}
        />
      </Stack>
    </AchievementsProvider>
  );
}
