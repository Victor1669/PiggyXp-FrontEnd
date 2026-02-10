import { useEffect } from "react";
import { Alert } from "react-native";
import { Stack } from "expo-router";
import * as Updates from "expo-updates";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { ShowModalProvider } from "Contexts/useShowModal";

import { ToastContainer, toastMessage } from "Utils/toast";

import { env } from "Config/env";

import LoadingSpinner from "@Components/LoadingSpinner/LoadingSpinner";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

import { screenValues } from "Config/screenValues";
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
    setTimeout(() => {
      checkUpdate();
      if (env.buildProfile === "preview") return;
      setTimeout(() => {
        toastMessage({
          type: "info",
          text: "O Backend está em: " + env.backEndUrl,
        });
      }, 1000);
    }, 100);
  }, []);

  const hideHeaderPages = [
    "index",
    "Swiper",
    "Welcome",
    "Content",
    "ProfileConfig",
    "SendRecoveryEmail",
    "DefinePhoto",
  ];
  const showHeaderPages = ["Login", "Cadastro"];

  return (
    <AuthProvider>
      <ShowModalProvider>
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
      </ShowModalProvider>
    </AuthProvider>
  );
}
