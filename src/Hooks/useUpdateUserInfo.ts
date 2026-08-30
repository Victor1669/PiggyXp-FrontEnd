import { useAuth } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";

import { homeApi } from "Features/Screens/Home/Services/HomeServices";
import { regenLivesApi } from "Features/Auth/Services/RegenLivesService";

import { STORAGE_KEYS, getStorageItem } from "Utils/securestore";

import { notifications } from "Utils/notifications";

export function useUpdateUserInfo() {
  const { login } = useAuth();

  const { isPreviewBuild } = screenValues();

  async function updateUserInfo() {
    if (isPreviewBuild) return;

    const storedUserToken = await getStorageItem(STORAGE_KEYS.userToken);

    if (!storedUserToken) {
      return;
    }

    await regenLivesApi(storedUserToken);
    const { data, status } = await homeApi(storedUserToken);

    if (status < 300) {
      const { newAchievements, ...userInfo } = data;

      await login(userInfo);

      if (newAchievements && newAchievements !== "0000000010") {
        notifications(
          "Conquista nova!",
          "Verifique sua tela de conquistas para receber a recompensa",
          "/Achievements",
        );
      }
    }
  }

  return updateUserInfo;
}
