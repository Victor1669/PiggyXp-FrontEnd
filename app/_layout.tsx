//#region Importações
import { useEffect } from "react";
import { Alert } from "react-native";
import * as Updates from "expo-updates";

import { env } from "Config/env";
import { screenValues } from "Config/screenValues";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { StatusProvider } from "Contexts/StatusContext";
import { InternetConnectionProvider } from "Contexts/useInternetConnection";
import { SplashAnimationProvider } from "@Screens/Splash/Contexts/useSplashAnimation";
import { SplashAnimatedValuesProvider } from "Features/Screens/Splash/Contexts/useSplashAnimatedValues";

import { ToastContainer, toastMessage } from "Utils/toast";
import { registerNotificationClickListener } from "Utils/notifications";

import LoadingSpinner from "@Components/LoadingSpinner/LoadingSpinner";
import ScreenContainer from "@Components/Config/ScreenContainer";
import DevToolsLink from "DevTools/Components/DevToolsLink";

//#endregion

export default function RootLayout() {
  const { showDevTools } = screenValues();

  useEffect(function warningTimer() {
    const timeOut1 = setTimeout(() => {
      if (!__DEV__) {
        checkUpdate();
      } else return;
    }, 100);

    const timeOut2 = setTimeout(() => {
      if (__DEV__ && showDevTools)
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

  async function checkUpdate() {
    if (__DEV__) return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert("Nova atualização disponível, feche e abra o app!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const subscription = registerNotificationClickListener();
    return () => subscription.remove();
  }, []);

  return (
    <InternetConnectionProvider>
      <AuthProvider>
        <StatusProvider>
          <SplashAnimationProvider>
            <SplashAnimatedValuesProvider>
              <ScreenContainer />
            </SplashAnimatedValuesProvider>
          </SplashAnimationProvider>
          <ToastContainer />
          <LoadingSpinner />
          <DevToolsLink />
        </StatusProvider>
      </AuthProvider>
    </InternetConnectionProvider>
  );
}
