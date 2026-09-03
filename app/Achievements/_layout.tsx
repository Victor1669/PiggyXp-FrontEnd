import { Stack } from "expo-router";

import { AchievementsProvider } from "Features/Achievements/Contexts/useAchievements";

import { AppConfig } from "Config/appConfig";
const { fontSizes, colors } = AppConfig;

export default function _layout() {
  return (
    <AchievementsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Conquistas",
            headerShown: true,
            headerTitleStyle: {
              color: "#fff",
              fontSize: fontSizes.TITLE_FONT_SIZE,
            },
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: colors.contentBackColor.Dark,
            },
            headerTintColor: "#fff",
            contentStyle: {
              backgroundColor: colors.contentBackColor.Dark,
            },
          }}
        />
      </Stack>
    </AchievementsProvider>
  );
}
