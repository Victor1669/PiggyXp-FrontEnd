import { useEffect } from "react";
import { router, Stack, usePathname } from "expo-router";

import { screenValues } from "Config/screenValues";

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useSplashAnimation } from "@Screens/Splash/Contexts/useSplashAnimation";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

import { PreviewUserType } from "Features/Auth/Types/UserType";
import { useStatus } from "Contexts/StatusContext";

export default function ScreenContainer() {
  const pathName = usePathname();
  const { layoutAnimation, animationDuration } = useSplashAnimation();
  const { hasUserInfo, user, hasVerifiedUserInfo } = useAuth();
  const { showStatus } = useStatus();

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
    if (
      (hasUserInfo && (user as PreviewUserType).isPreview) ||
      pathName !== "/"
    ) {
      return;
    }

    const timer = setTimeout(() => {
      if (hasVerifiedUserInfo) {
        router.replace("/Swiper");
      } else {
        showStatus("loading");
      }
    }, animationDuration);

    if (isPreviewBuild) return () => clearTimeout(timer);

    return () => {
      clearTimeout(timer);
    };
  }, [animationDuration, hasUserInfo, pathName, hasVerifiedUserInfo]);

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
