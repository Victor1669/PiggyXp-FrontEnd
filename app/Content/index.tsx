import { useEffect } from "react";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { GetUserInfo } from "@Auth/Services/UserInfoService";

import { GetUserProgress } from "@Auth/Services/UserProgressService";
import { ShowSheetProvider } from "@Screens/Home/Contexts/useShowSheet";
import { LevelsProvider } from "@Screens/Home/Contexts/useLevels";

import HomeContainer from "@Screens/Home/HomeContainer";

export default function Home() {
  const { login, userToken } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  useEffect(() => {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    (async function getUserInfo() {
      // PEGA O TOKEN DO USUÁRIO QUE ESTÁ GUARDADO
      const { userId } = (await userToken.decode()) as {
        userId: string;
      };

      // PEGA AS INFORMAÇÕES DO USUÁRIO A PARTIR DO ID
      const { data: userInfoData, status: userInfoStatus } =
        await GetUserInfo(userId);

      const { data: userProgressData, status: userProgressStatus } =
        await GetUserProgress(Number(userId));
      const { nivel, xp, coins, first_login } = userProgressData;

      // SE DER CERTO, ENTRA NO SISTEMA COM AS INFORMAÇÕES DELE
      if (userInfoStatus < 300 && userProgressStatus < 300) {
        await login({
          ...userInfoData,
          id: userId,
          nivel,
          xp,
          coins,
          first_login,
        });
      }

      setShowLoadingScreen(false);
    })();
  }, []);

  return (
    <ShowSheetProvider>
      <LevelsProvider>
        <HomeContainer />
      </LevelsProvider>
    </ShowSheetProvider>
  );
}
