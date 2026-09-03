import { useAuth } from "@Auth/Contexts/useAuth";

import { homeApi } from "Services/homeServices";
import { regenLivesApi } from "Services/regenLivesApi";
import { toastMessage } from "Utils/toast";

export function useUpdateUserInfo() {
  const { login } = useAuth();

  async function updateUserInfo() {
    await regenLivesApi();
    const { data, status } = await homeApi();

    if (status < 300) {
      const { newAchievements, ...userInfo } = data;

      await login(userInfo);

      if (newAchievements && newAchievements !== "0000000010") {
        toastMessage({ text: "Conquista nova!", type: "success" });
      }
    }
  }

  return updateUserInfo;
}
