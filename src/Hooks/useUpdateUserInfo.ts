import { useAuth } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";

import { getUserInfoApi } from "@Auth/Services/UserInfoService";
import { verifyAchievements } from "../Features/Achievements/AchievementsServices";
import { GetUserProgress } from "@Auth/Services/UserProgressService";
import { RegenLivesService } from "Features/Auth/Services/RegenLivesService";
import { updateNivelApi } from "Features/Screens/Home/Services/HomeServices";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { notifications } from "Utils/notifications";

import { UserType } from "Features/Auth/Types/UserType";

export function useUpdateUserInfo() {
  const { login } = useAuth();
  const { userToken } = useStorageItemsContext();

  const { isPreviewBuild } = screenValues();

  async function updateUserInfo() {
    if (isPreviewBuild) return;

    const [{ userId }, storedUserToken] = (await Promise.all([
      userToken.decode(),
      userToken.get(),
    ])) as [{ userId: string }, storedUserToken: string];

    const [
      { data: achievementsData, status: achievementsStatus },
      { data: userInfoData, status: userInfoStatus },
      _,
      { data: userProgressData, status: userProgressStatus },
      { data: updateNivelData, status: updateNivelStatus },
    ] = await Promise.all([
      verifyAchievements(+userId),
      getUserInfoApi(userId),
      RegenLivesService(+userId, storedUserToken),
      GetUserProgress(+userId),
      updateNivelApi(storedUserToken),
    ]);

    if (
      userInfoStatus < 300 &&
      userProgressStatus < 300 &&
      achievementsStatus < 300 &&
      userProgressData &&
      updateNivelStatus < 300
    ) {
      const { nivel, xpNecessario } = updateNivelData;
      const { id, ...userProgress } = userProgressData;

      const newUserInfo: UserType = {
        id: +userId,
        ...userInfoData,
        ...userProgress,
        nivel,
        xpProximoNivel: xpNecessario,
      };

      await login(newUserInfo);
    }

    const newAchievements = achievementsData?.newAchievements;

    if (newAchievements && newAchievements !== "0000000010") {
      notifications(
        "Conquista nova!",
        "Verifique sua tela de conquistas para receber a recompensa",
        "/Achievements",
      );
    }
  }

  return updateUserInfo;
}
