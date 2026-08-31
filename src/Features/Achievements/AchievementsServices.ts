import { fetchApi } from "Utils/fetchApi";

export async function verifyAchievements(userId: number) {
  const res = await fetchApi({
    route: `achievements/verify/${userId}`,
    method: "post",
  });

  return res;
}

export async function getAchievementsRewards(
  userId: number,
  body: { achievementId: number },
) {
  const res = await fetchApi({
    route: `achievements/rewards/${userId}`,
    method: "post",
    body,
  });

  return res;
}
