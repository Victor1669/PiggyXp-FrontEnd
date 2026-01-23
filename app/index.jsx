import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../src/Features/Auth/Contexts/useAuth";

import Splash from "../src/Features/Screens/Splash/SplashContainer";

export default function SplashScreen() {
  const router = useRouter();
  const { user } = useAuth();

  const hasUserInfo = Object.keys(user).length > 0;

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (hasUserInfo) {
        router.replace("/Content");
        return;
      }
    }, 0);
    const timer2 = setTimeout(() => {
      router.replace("/Swiper");
    }, 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [user]);

  return <Splash />;
}
