import { useEffect } from "react";
import { router, Stack, usePathname } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { fontSizes, isPreviewBuild, colors } = AppConfig;

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useSplashAnimation } from "@Screens/Splash/Contexts/useSplashAnimation";

import { PreviewUserType } from "Features/Auth/Types/UserType";
import { useStatus } from "Contexts/StatusContext";

export default function ScreenContainer() {
  const pathName = usePathname();
  const { layoutAnimation, animationDuration } = useSplashAnimation();
  const { hasUserInfo, user, hasVerifiedUserInfo } = useAuth();
  const { showStatus } = useStatus();

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
        animation: hasUserInfo ? "fade" : layoutAnimation,
      }}
    >
      {hideHeaderPages.map((page) => (
        <Stack.Screen name={page} options={{ headerShown: false }} />
      ))}
    </Stack>
  );
}
