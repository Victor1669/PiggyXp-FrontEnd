import { useEffect } from "react";

import { env } from "Config/env";
import { AppConfig } from "Config/appConfig";

import { AuthProvider } from "@Auth/Contexts/useAuth";
import { StatusProvider } from "Contexts/StatusContext";
import { SplashAnimationProvider } from "@Screens/Splash/Contexts/useSplashAnimation";
import { SplashAnimatedValuesProvider } from "Features/Screens/Splash/Contexts/useSplashAnimatedValues";

import { ToastContainer, toastMessage } from "Utils/toast";

import LoadingSpinner from "Components/LoadingSpinner";
import ScreenContainer from "@Components/Config/ScreenContainer";
import DevToolsLink from "DevTools/Components/DevToolsLink";

export default function RootLayout() {
  useEffect(function warningTimer() {
    const timeOut2 = setTimeout(() => {
      if (__DEV__ && AppConfig.showDevTools)
        toastMessage({
          type: "info",
          text: "O Backend está em: " + env.backEndUrl,
        });
    }, 1000);

    return () => {
      clearTimeout(timeOut2);
    };
  }, []);

  return (
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
  );
}
