import { useEffect } from "react";

import { screenValues } from "Config/screenValues";

import { useInternetConnection } from "Contexts/useInternetConnection";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { ShowSheetProvider } from "@Screens/Home/Contexts/useShowSheet";
import { LevelsProvider } from "@Screens/Home/Contexts/useLevels";

import HomeContainer from "@Screens/Home/HomeContainer";

export default function Home() {
  const { getIsConnected } = useInternetConnection();
  const updateUserInfo = useUpdateUserInfo();

  const { isPreviewBuild } = screenValues();

  useEffect(() => {
    if (isPreviewBuild) return;
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
