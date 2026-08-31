import { useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import { screenValues } from "Config/screenValues";

import { refreshTokenApi } from "Services/refreshTokenApi";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";

import { toastMessage } from "Utils/toast";
import {
  getStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from "Utils/securestore";
import { themeChanger } from "Helpers/themeChanger";

import SplashContainer from "@Screens/Splash/SplashContainer";

export default function SplashScreen() {
  const { user, setHasVerifiedUserInfo } = useAuth();
  const { isPreviewBuild } = screenValues();
  const { hideStatus } = useStatus();

  // CONFIGURAÇÃO DE FONTES
  useFonts({
    "MadimiOne-Regular": require("../assets/fonts/MadimiOne-Regular.ttf"),
    "Mohave-Regular": require("../assets/fonts/Mohave-Regular.ttf"),
  });

  useEffect(
    function initialCode() {
      themeChanger("splash");

      (async () => {
        const storedRefreshToken = await getStorageItem(
          STORAGE_KEYS.refreshToken,
        );

        if (storedRefreshToken === null || isPreviewBuild) {
          setHasVerifiedUserInfo(true);
          return;
        }

        const { data, status } = await refreshTokenApi(storedRefreshToken);

        if (status < 300) {
          await setStorageItem(STORAGE_KEYS.userToken, data.accessToken);
          hideStatus();
          router.replace("/Content");
        } else {
          toastMessage({
            type: "error",
            text: "Erro ao manter sessão, refaça o login!",
          });
          router.replace("/Login");
        }

        setHasVerifiedUserInfo(true);
        await themeChanger("dark");
      })();
    },
    [user],
  );

  return <SplashContainer />;
}
