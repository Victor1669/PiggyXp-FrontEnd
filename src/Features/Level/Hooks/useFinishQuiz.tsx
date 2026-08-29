import { router } from "expo-router";

import { useQuiz } from "../Contexts/useQuiz";

import {
  STORAGE_KEYS,
  getStorageItem,
  deleteStorageItem,
} from "Utils/securestore";
import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { LivesService } from "../Services/LevelServices";

export function useFinishQuiz() {
  const updateUserInfo = useUpdateUserInfo();

  const { dispatch, getIsLevelCompleted, currentQuestionIndex } = useQuiz();

  const isLevelCompleted = getIsLevelCompleted(currentQuestionIndex);

  async function finishLevel() {
    const [storedToken, storedErrors] = await Promise.all([
      getStorageItem(STORAGE_KEYS.userToken),
      getStorageItem(STORAGE_KEYS.temporaryErrorCount),
    ]);

    const errorCount = Number(storedErrors);

    dispatch({ type: "QUIZ_ACABOU" });

    if (errorCount > 0) {
      await LivesService(storedToken ?? "", {
        erro: errorCount,
      });
    }

    await Promise.all([
      updateUserInfo(),
      deleteStorageItem(STORAGE_KEYS.temporaryErrorCount),
    ]);

    router.replace("/Level/LevelConclusion");
  }

  return { finishLevel, isLevelCompleted };
}
