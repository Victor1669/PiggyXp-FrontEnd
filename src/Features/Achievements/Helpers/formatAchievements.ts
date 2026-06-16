import { AchievementsImages } from "../Assets/AchievementsImages";

import type {
  Achievement,
  AchievementProgress,
} from "../Types/AchievementTypes";
import type { UserType } from "Features/Auth/Types/UserType";

import { AchievementsDescriptions } from "../Content/AchievementsDescriptions";

export function formatAchievements(
  user: UserType,
  progressConfig: AchievementProgress[],
): Achievement[] {
  const statusArray = user.achievements?.split("");
  const collectedArray = user.collectedAchievements?.split("");

  return statusArray?.map((status, i) => {
    const config = progressConfig[i];
    const userFieldValue = user[config.userField];

    return {
      isCollected: +status,
      isCompleted: +collectedArray?.[i],
      img: AchievementsImages[i],
      name: config.name,
      progress: {
        actual: userFieldValue as number,
        total: config.total,
      },
      description: AchievementsDescriptions[i],
    };
  });
}
