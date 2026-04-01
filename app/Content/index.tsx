import { useEffect } from "react";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { useVerifyAchievements } from "Features/Achievements/Hooks/useVerifyAchievements";

import { ShowSheetProvider } from "@Screens/Home/Contexts/useShowSheet";
import { LevelsProvider } from "@Screens/Home/Contexts/useLevels";

import HomeContainer from "@Screens/Home/HomeContainer";

export default function Home() {
  const { userToken } = useAuth();
  const { getIsConnected } = useInternetConnection();
  const { checkAchievementsStatus } = useVerifyAchievements();

  useEffect(() => {
    if (env.buildProfile === "preview") return;
    if (!getIsConnected()) return;

    (async () => {
      const { userId } = (await userToken.decode()) as { userId: string };
      await checkAchievementsStatus(userId);
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
