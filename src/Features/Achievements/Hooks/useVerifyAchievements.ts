import { useAuth } from "@Auth/Contexts/useAuth";

import { env } from "Config/env";

import { GetUserInfo } from "@Auth/Services/UserInfoService";
import { verifyAchievements } from "../AchievementsServices";
import { GetUserProgress } from "@Auth/Services/UserProgressService";

import { notifications } from "Utils/notifications";

export function useVerifyAchievements() {
  const { login, user } = useAuth();

  async function checkAchievementsStatus(userId: string) {
    const [
      { data: achievementsData, status: achievementsStatus },
      { data: userInfoData, status: userInfoStatus },
      { data: userProgressData, status: userProgressStatus },
    ] = await Promise.all([
      verifyAchievements(+userId),
      GetUserInfo(userId),
      GetUserProgress(+userId),
    ]);

    if (
      userInfoStatus < 300 &&
      userProgressStatus < 300 &&
      achievementsStatus < 300
    ) {
      const { nivel, xp, coins } = userProgressData;

      await login({
        ...(env.buildProfile === "preview" ? user : userInfoData),
        id: +userId,
        nivel,
        xp,
        coins,
      });
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

  return { checkAchievementsStatus };
}
