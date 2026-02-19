import { useEffect } from "react";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import SplashContainer from "@Screens/Splash/SplashContainer";

export default function SplashScreen() {
  const { user, firstTimeLogged } = useAuth();

  const hasUserInfo = user.id && user.email;

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (hasUserInfo) {
        router.replace("/Content");
        return;
      }
    }, 0);
    const timer2 = setTimeout(() => {
      (async function () {
        const isFirstTimeLogged = await firstTimeLogged.get();
        router.replace(isFirstTimeLogged === "true" ? "/Swiper" : "/Login");
      })();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [user]);

  return <SplashContainer />;
}
