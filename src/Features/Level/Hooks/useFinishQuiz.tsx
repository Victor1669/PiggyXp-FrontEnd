import { router } from "expo-router";

import { useQuiz } from "../Contexts/useQuiz";

import { STORAGE_KEYS, deleteStorageItem } from "Utils/securestore";
import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

export function useFinishQuiz() {
  const updateUserInfo = useUpdateUserInfo();

  const { dispatch, getIsLevelCompleted, currentQuestionIndex } = useQuiz();

  const isLevelCompleted = getIsLevelCompleted(currentQuestionIndex);

  async function finishLevel() {
    dispatch({ type: "QUIZ_ACABOU" });

    await Promise.all([
      updateUserInfo(),
      deleteStorageItem(STORAGE_KEYS.temporaryErrorCount),
    ]);

    router.replace("/Level/LevelConclusion");
  }

  return { finishLevel, isLevelCompleted };
}
