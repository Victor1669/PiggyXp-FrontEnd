import { screenValues } from "Config/screenValues";

import { useQuiz } from "../Contexts/useQuiz";
import {
  getStorageItem,
  setStorageItem,
  STORAGE_KEYS,
} from "Utils/securestore";

export function useAnswerValidation(index: number) {
  const { getQuestion, dispatch, rewards } = useQuiz();

  const actualQuestion = getQuestion(index);

  const { isPreviewBuild } = screenValues();

  return async function answerValidation(answerIndex: number) {
    if (actualQuestion.rightAnswerIndex === answerIndex) {
      dispatch({
        type: "ACERTOU_QUESTAO",
        payload: { multiplier: rewards.coins / 10 },
      });
    } else {
      dispatch({ type: "ERROU_QUESTAO" });
      if (!isPreviewBuild) {
        const currentErrorCount = Number(
          await getStorageItem(STORAGE_KEYS.temporaryErrorCount),
        );

        await setStorageItem(
          STORAGE_KEYS.temporaryErrorCount,
          String(currentErrorCount + 1),
        );
      }
    }
  };
}
