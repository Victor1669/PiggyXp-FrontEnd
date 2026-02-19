import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Stack } from "expo-router";
import * as Updates from "expo-updates";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { ShowLoadingScreenProvider } from "Contexts/useShowLoadingScreen";

import { ToastContainer, toastMessage } from "Utils/toast";

import LoadingSpinner from "@Components/LoadingSpinner/LoadingSpinner";
import NavigationButton from "@Components/NavigationButton";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

import { env } from "Config/env";
import { screenValues } from "Config/screenValues";
import { InternetConnectionProvider } from "Contexts/useInternetConnection";
const {
  fontSizes: { TITLE_FONT_SIZE },
} = screenValues();

export default function RootLayout() {
  async function checkUpdate() {
    if (env.buildProfile === "development") return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert({
          type: "info",
          text: "Nova atualização disponível, feche e abra o app!",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const timeOut1 = setTimeout(() => {
      checkUpdate();
      if (env.buildProfile === "preview" || env.buildProfile === "production")
        return;
    }, 100);

    const timeOut2 = setTimeout(() => {
      if (env.buildProfile === "development")
        toastMessage({
          type: "info",
          text: "O Backend está em: " + env.backEndUrl,
        });
    }, 1000);

    return () => {
      clearTimeout(timeOut1);
      clearTimeout(timeOut2);
    };
  }, []);

  const hideHeaderPages = [
    "index",
    "Swiper",
    "Welcome",
    "Content",
    "ProfileConfig",
    "SendRecoveryEmail",
    "DefinePhoto",
    "DifficultySelector",
  ];
  const showHeaderPages = ["Login", "Cadastro"];

  return (
    <InternetConnectionProvider>
      <AuthProvider>
        <ShowLoadingScreenProvider>
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
            }}
            key={Date.now().toString()}
          >
            {showHeaderPages.map((page) => (
              <Stack.Screen
                name={page}
                options={{ headerTitleAlign: "center" }}
              />
            ))}
            {hideHeaderPages.map((page) => (
              <Stack.Screen name={page} options={{ headerShown: false }} />
            ))}
          </Stack>
          <ToastContainer />
          <LoadingSpinner />
          <NavigationButton />
        </ShowLoadingScreenProvider>
      </AuthProvider>
    </InternetConnectionProvider>
  );
}
