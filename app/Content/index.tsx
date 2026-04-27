import { useEffect } from "react";

import { env } from "Config/env";

import { useInternetConnection } from "Contexts/useInternetConnection";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { ShowSheetProvider } from "@Screens/Home/Contexts/useShowSheet";
import { LevelsProvider } from "@Screens/Home/Contexts/useLevels";

import HomeContainer from "@Screens/Home/HomeContainer";

export default function Home() {
  const { getIsConnected } = useInternetConnection();
  const updateUserInfo = useUpdateUserInfo();

  useEffect(() => {
    if (env.buildProfile === "preview") return;
    if (!getIsConnected()) return;

    (async () => {
      await updateUserInfo();
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
