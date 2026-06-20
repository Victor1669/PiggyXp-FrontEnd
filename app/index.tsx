import { useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import { screenValues } from "Config/screenValues";

import { RefreshTokenService } from "@Auth/Services/RefreshTokenService";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";
import { useStatus } from "Contexts/StatusContext";

import { toastMessage } from "Utils/toast";
import { themeChanger } from "Helpers/themeChanger";

import SplashContainer from "@Screens/Splash/SplashContainer";

export default function SplashScreen() {
  const { user, setHasVerifiedUserInfo } = useAuth();
  const { refreshToken, userToken } = useStorageItemsContext();
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
        const storedRefreshToken = await refreshToken.get();

        if (!storedRefreshToken.length || isPreviewBuild) {
          setHasVerifiedUserInfo(true);
          return;
        }

        const { data, status } = await RefreshTokenService(storedRefreshToken);

        if (status < 300) {
          await userToken.set(data.accessToken);
          hideStatus();
          router.replace("/Content");
        } else {
          toastMessage({
            type: "error",
            text: "Sessão expirou, refaça o login!",
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
