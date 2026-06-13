import { router } from "expo-router";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";
import { useQuiz } from "../Contexts/useQuiz";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { LivesService } from "../Services/LevelServices";

export function useFinishLevel() {
  const { userToken } = useStorageItemsContext();
  const updateUserInfo = useUpdateUserInfo();
  const { dispatch, getIsLevelCompleted, currentQuestionIndex } = useQuiz();

  const isLevelCompleted = getIsLevelCompleted(currentQuestionIndex);

  async function finishLevel() {
    const storedToken = await userToken.get();

    dispatch({ type: "QUIZ_ACABOU" });

    await LivesService(storedToken, { erro: 1 });

    await updateUserInfo();

    router.replace("/Level/LevelConclusion");
  }

  return { finishLevel, isLevelCompleted };
}
