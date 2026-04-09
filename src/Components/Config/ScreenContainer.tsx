import { router, Stack } from "expo-router";

import { screenValues } from "Config/screenValues";

import useSplashAnimation from "@Screens/Splash/Contexts/useSplashAnimation";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";
import { useEffect } from "react";
import { env } from "Config/env";

export default function ScreenContainer() {
  const {
    fontSizes: { TITLE_FONT_SIZE },
  } = screenValues();

  const { layoutAnimation, animationDuration } = useSplashAnimation();

  const hideHeaderPages = [
    "index",
    "Swiper",
    "Welcome",
    "Content",
    "SendRecoveryEmail",
    "Level",
    "Cadastro",
    "Login",
    "Achievements",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Swiper");
    }, animationDuration);

    if (env.buildProfile === "preview") return () => clearTimeout(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [animationDuration]);

  return (
    <Stack
      screenOptions={{
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
        animation: layoutAnimation,
      }}
    >
      {hideHeaderPages.map((page) => (
        <Stack.Screen name={page} options={{ headerShown: false }} />
      ))}
    </Stack>
  );
}
