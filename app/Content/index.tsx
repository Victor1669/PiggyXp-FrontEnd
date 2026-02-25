import { useEffect } from "react";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { GetUserInfo } from "@Auth/Services/UserInfoService";

import HomeContainer from "@Screens/Home/HomeContainer";

export default function Home() {
  const { login, userToken, refreshToken } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  useEffect(() => {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    (async function getUserInfo() {
      const rfToken = await refreshToken.get();

      const { userId } = (await userToken.decode()) as {
        userId: string;
      };

      const { data, status } = await GetUserInfo(userId);

      if (status < 300) {
        await login({ ...data, id: userId });
      }
      setShowLoadingScreen(false);
    })();
  }, []);

  return <HomeContainer />;
}
