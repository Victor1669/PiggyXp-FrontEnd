import { screenValues } from "Config/screenValues";

import { useQuiz } from "../Contexts/useQuiz";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

export function useAnswerValidation(index: number) {
  const { getQuestion, dispatch, rewards } = useQuiz();
  const { temporaryErrorCount } = useStorageItemsContext();

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
        const errosAtuais = +(await temporaryErrorCount.get());
        temporaryErrorCount.set(String(errosAtuais + 1));
      }
    }
  };
}
