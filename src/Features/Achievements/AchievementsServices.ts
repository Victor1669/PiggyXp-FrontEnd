import { useFetch } from "@Auth/Hooks/useFetch";

export async function verifyAchievements(userId: number) {
  const res = await useFetch({
    rota: `achievements/verify/${userId}`,
    method: "post",
  });

  return res;
}

export async function getAchievementsRewards(
  userId: number,
  body: { achievementId: number },
) {
  const res = await useFetch({
    rota: `achievements/rewards/${userId}`,
    method: "post",
    body,
  });

  return res;
}
