import { useAuth, User } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";

import { GetUserInfo } from "@Auth/Services/UserInfoService";
import { verifyAchievements } from "../Features/Achievements/AchievementsServices";
import { GetUserProgress } from "@Auth/Services/UserProgressService";
import { RegenLivesService } from "Features/Auth/Services/RegenLivesService";

import { notifications } from "Utils/notifications";

export function useUpdateUserInfo() {
  const { login, user, userToken } = useAuth();

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
    ] = await Promise.all([
      verifyAchievements(+userId),
      GetUserInfo(userId),
      RegenLivesService(+userId, storedUserToken),
      GetUserProgress(+userId),
    ]);

    if (
      userInfoStatus < 300 &&
      userProgressStatus < 300 &&
      achievementsStatus < 300 &&
      userProgressData
    ) {
      const newUserInfo: User = {
        id: +userId,
        ...userInfoData,
        ...userProgressData,
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
