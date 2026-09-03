import { AchievementsImages } from "Features/Achievements/Assets/AchievementsImages";
import { AchievementsDescriptions } from "Features/Achievements/Content/AchievementsDescriptions";
import {
  Achievement,
  AchievementProgress,
} from "Features/Achievements/Types/AchievementTypes";

import type { UserType } from "Features/Auth/Types/UserType";

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

export function tipsFormatter(text: any) {
  const data = typeof text === "string" ? JSON.parse(text) : text;
  const fullText = data.card[0];

  const sentences = fullText.match(/[^.!?]+[.!?]+/g) || [];

  const mid = Math.ceil(sentences.length / 2);

  const string1 = sentences.slice(0, mid).join(" ");
  const string2 = sentences.slice(mid).join(" ");

  return [string1, string2];
}
