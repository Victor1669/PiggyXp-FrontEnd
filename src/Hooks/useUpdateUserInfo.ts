import { useAuth, User } from "@Auth/Contexts/useAuth";

import { env } from "Config/env";

import { GetUserInfo } from "@Auth/Services/UserInfoService";
import { verifyAchievements } from "../Features/Achievements/AchievementsServices";
import { GetUserProgress } from "@Auth/Services/UserProgressService";
import { RegenLivesService } from "Features/Auth/Services/RegenLivesService";

import { notifications } from "Utils/notifications";

export function useUpdateUserInfo() {
  const { login, user, userToken } = useAuth();

  async function updateUserInfo() {
    const [{ userId }, storedUserToken] = (await Promise.all([
      userToken.decode(),
      userToken.get(),
    ])) as [{ userId: string }, storedUserToken: string];

    const [
      { data: achievementsData, status: achievementsStatus },
      { data: userInfoData, status: userInfoStatus },
      { data: userProgressData, status: userProgressStatus },
      _,
    ] = await Promise.all([
      verifyAchievements(+userId),
      GetUserInfo(userId),
      GetUserProgress(+userId),
      RegenLivesService(+userId, storedUserToken),
    ]);

    if (
      userInfoStatus < 300 &&
      userProgressStatus < 300 &&
      achievementsStatus < 300 &&
      userProgressData
    ) {
      const newUserInfo: User = {
        ...(env.buildProfile === "preview" ? user : userInfoData),
        id: +userId,
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
