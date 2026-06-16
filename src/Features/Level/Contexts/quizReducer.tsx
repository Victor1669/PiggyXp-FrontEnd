import { screenValues } from "Config/screenValues";

import { LevelContextValues } from "../Types/LevelTypes";
import { PreviewLevel } from "Features/Preview/PreviewLevel";
import { generateCoinData } from "../Utils/generateCoinData";

export function quizReducer(
  state: LevelContextValues,
  action: any,
): LevelContextValues {
  const { seconds, rightAnswers, lives, coinList, currentQuestionIndex } =
    state;
  const { type, payload } = action;

  switch (type) {
    case "DADOS_CARREGADOS": {
      const { isPreviewBuild } = screenValues();

      const dataToUse = isPreviewBuild ? PreviewLevel : payload;

      return {
        ...state,
        initialText: dataToUse.text || "",
        questions: dataToUse.questions || [],
        difficulty: isPreviewBuild
          ? dataToUse.dificulty
          : // O cara usa IA no código mas não consegue escrever um inglês certo pqp
            (dataToUse.dificulty ?? state.difficulty),
        order: dataToUse.order ?? state.order,
        unit: dataToUse.unit ?? state.unit,
        rewards: dataToUse.rewards ?? state.rewards,
        coinList: [],
        currentQuestionIndex: 0,
      };
    }
    case "ATUALIZAR_VIDAS":
      return { ...state, lives: payload };
    case "QUIZ_COMECOU":
      return { ...state, isTimerActive: true };
    case "TICK":
      return { ...state, seconds: seconds + 1 };
    case "ERROU_QUESTAO": {
      const newLives = lives > 0 ? lives - 1 : 0;
      return {
        ...state,
        textFeedBack: "Errou!",
        isAnswered: true,
        lives: newLives,
        losed: newLives === 0,
      };
    }
    case "ACERTOU_QUESTAO": {
      const multiplier = payload?.multiplier || 1;
      const newCoins = Array.from({ length: multiplier }, () =>
        generateCoinData(currentQuestionIndex),
      );

      return {
        ...state,
        rightAnswers: rightAnswers + 1,
        textFeedBack: "Acertou!",
        isAnswered: true,
        coinList: [...coinList, ...newCoins],
      };
    }
    case "PROXIMA_QUESTAO":
      return {
        ...state,
        isAnswered: false,
        currentQuestionIndex: currentQuestionIndex + 1,
      };
    case "QUIZ_ACABOU": {
      return { ...state, isTimerActive: false };
    }
    case "REPETIU_FASE": {
      return { ...state, isRepeatingLevel: true };
    }
    default:
      return state;
  }
}
