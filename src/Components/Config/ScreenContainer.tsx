import { useEffect } from "react";
import { router, Stack, usePathname } from "expo-router";

import { screenValues } from "Config/screenValues";

import { PreviewUser, useAuth } from "Features/Auth/Contexts/useAuth";
import { useSplashAnimation } from "@Screens/Splash/Contexts/useSplashAnimation";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export default function ScreenContainer() {
  const pathName = usePathname();
  const { layoutAnimation, animationDuration } = useSplashAnimation();
  const { hasUserInfo, user } = useAuth();

  const {
    fontSizes: { TITLE_FONT_SIZE },
    isPreviewBuild,
  } = screenValues();

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
    "DevTools",
  ];

  useEffect(() => {
    if ((hasUserInfo && (user as PreviewUser).isPreview) || pathName !== "/") {
      return;
    }

    const timer = setTimeout(() => {
      router.replace("/Swiper");
    }, animationDuration);

    if (isPreviewBuild) return () => clearTimeout(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [animationDuration, hasUserInfo, pathName]);

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
        animation: hasUserInfo ? "fade" : layoutAnimation,
      }}
    >
      {hideHeaderPages.map((page) => (
        <Stack.Screen name={page} options={{ headerShown: false }} />
      ))}
    </Stack>
  );
}
