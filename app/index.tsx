import { useEffect } from "react";
import { router } from "expo-router";
import { useFonts } from "expo-font";

import { useAuth } from "@Auth/Contexts/useAuth";

import { RefreshTokenService } from "@Auth/Services/RefreshTokenService";
import { toastMessage } from "Utils/toast";

import SplashContainer from "@Screens/Splash/SplashContainer";
import { themeChanger } from "Helpers/themeChanger";

export default function SplashScreen() {
  const { user, refreshToken, userToken } = useAuth();

  // CONFIGURAÇÃO DE FONTES
  const [loaded, error] = useFonts({
    "MadimiOne-Regular": require("../assets/fonts/MadimiOne-Regular.ttf"),
  });

  useEffect(() => {
    // SE TIVER INFORMAÇÃO DO USUÁRIO, VAI PRA CONTENT
    const timer1 = setTimeout(() => {
      (async () => {
        await themeChanger("splash");
        const rfToken = await refreshToken.get();
        if (!rfToken.length) return;
        const { data, status } = await RefreshTokenService(rfToken);

        if (status < 300) {
          console.log("Usuário está em sessão!");

          await userToken.set(data.accessToken);
          router.replace("/Content");
        } else {
          toastMessage({
            type: "error",
            text: "Sessão expirou, refaça o login!",
          });
          router.replace("/Login");
        }
        await themeChanger("dark");
        return;
      })();
    }, 0);

    // COMPORTAMENTO PADRÃO DO APP
    const timer2 = setTimeout(async () => {
      router.replace("/Swiper");
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [hasUserInfo]);

  return <SplashContainer />;
}
