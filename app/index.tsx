import { useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import { useAuth } from "@Auth/Contexts/useAuth";

import { RefreshTokenService } from "@Auth/Services/RefreshTokenService";
import { toastMessage } from "Utils/toast";

import SplashContainer from "@Screens/Splash/SplashContainer";
import { themeChanger } from "Helpers/themeChanger";

export default function SplashScreen() {
  const { user, refreshToken, userToken, setHasVerifiedUserInfo } = useAuth();

  // CONFIGURAÇÃO DE FONTES
  const [loaded, error] = useFonts({
    "MadimiOne-Regular": require("../assets/fonts/MadimiOne-Regular.ttf"),
  });

  useEffect(
    function initialCode() {
      themeChanger("splash");

      (async () => {
        const rfToken = await refreshToken.get();
        if (!rfToken.length) {
          setHasVerifiedUserInfo(true);
          return;
        }

        const { data, status } = await RefreshTokenService(rfToken);

        if (status < 300) {
          await userToken.set(data.accessToken);
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
