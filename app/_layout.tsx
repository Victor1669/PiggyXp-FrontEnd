//#region Importações
import { useEffect } from "react";

import { env } from "Config/env";
import { screenValues } from "Config/screenValues";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { StatusProvider } from "Contexts/StatusContext";
import { InternetConnectionProvider } from "Contexts/useInternetConnection";
import { SplashAnimationProvider } from "@Screens/Splash/Contexts/useSplashAnimation";
import { SplashAnimatedValuesProvider } from "Features/Screens/Splash/Contexts/useSplashAnimatedValues";
import { StorageItemsContextProvider } from "Contexts/useStorageItemsContext";

import { ToastContainer, toastMessage } from "Utils/toast";
import { registerNotificationClickListener } from "Utils/notifications";

import LoadingSpinner from "@Components/LoadingSpinner/LoadingSpinner";
import ScreenContainer from "@Components/Config/ScreenContainer";
import DevToolsLink from "DevTools/Components/DevToolsLink";

//#endregion

export default function RootLayout() {
  const { showDevTools } = screenValues();

  useEffect(function warningTimer() {
    const timeOut2 = setTimeout(() => {
      if (__DEV__ && showDevTools)
        toastMessage({
          type: "info",
          text: "O Backend está em: " + env.backEndUrl,
        });
    }, 1000);

    return () => {
      clearTimeout(timeOut2);
    };
  }, []);

  useEffect(() => {
    const subscription = registerNotificationClickListener();
    return () => subscription.remove();
  }, []);

  return (
    <InternetConnectionProvider>
      <StorageItemsContextProvider>
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
      </StorageItemsContextProvider>
    </InternetConnectionProvider>
  );
}
