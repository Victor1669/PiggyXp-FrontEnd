import { router } from "expo-router";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";
import { useQuiz } from "../Contexts/useQuiz";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { LivesService } from "../Services/LevelServices";

export function useFinishQuiz() {
  const { userToken, temporaryErrorCount } = useStorageItemsContext();
  const updateUserInfo = useUpdateUserInfo();
  const { dispatch, getIsLevelCompleted, currentQuestionIndex } = useQuiz();

  const isLevelCompleted = getIsLevelCompleted(currentQuestionIndex);

  async function finishLevel() {
    const [storedToken, storedErrors] = await Promise.all([
      userToken.get(),
      +temporaryErrorCount.get(),
    ]);

    dispatch({ type: "QUIZ_ACABOU" });

    if (storedErrors > 0) {
      await LivesService(storedToken, { erro: storedErrors });
    }

    await Promise.all([updateUserInfo(), temporaryErrorCount.delete()]);

    router.replace("/Level/LevelConclusion");
  }

  return { finishLevel, isLevelCompleted };
}
