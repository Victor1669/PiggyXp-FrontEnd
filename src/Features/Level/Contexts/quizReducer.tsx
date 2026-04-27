import { LevelTypes } from "../Types/LevelTypes";

export function quizReducer(state: LevelTypes, action: any): LevelTypes {
  const { seconds, rightAnswers, lives } = state;
  const { type, payload } = action;

  switch (type) {
    case "DADOS_CARREGADOS": {
      const { text: initialText, questions } = payload;

      const rewards = payload.rewards;

      return { ...state, initialText, questions, rewards };
    }
    case "ATUALIZAR_VIDAS":
      return { ...state, lives: payload };
    case "QUIZ_COMECOU":
      return { ...state, timerActive: true };
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
    case "ACERTOU_QUESTAO":
      return {
        ...state,
        rightAnswers: rightAnswers + 1,
        textFeedBack: "Acertou!",
        isAnswered: true,
      };
    case "PROXIMA_QUESTAO":
      return {
        ...state,
        isAnswered: false,
      };
    case "QUIZ_ACABOU":
      return { ...state, timerActive: false };
    default:
      return state;
  }
}
