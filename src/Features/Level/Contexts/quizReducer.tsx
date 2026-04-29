import { Animated, Dimensions } from "react-native";

import { screenValues } from "Config/screenValues";

import { LevelTypes, CoinType } from "../Types/LevelTypes";
import { PreviewLevel } from "Features/Preview/PreviewLevel";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COIN_SIZE = 36;
const FLOOR_Y = 700;

let globalCoinId = 0;

function generateCoinData(currentQuestionIndex: number): CoinType {
  const { deviceWidth } = screenValues();

  const id = globalCoinId++;
  const laneCount = 8;
  const index = id % laneCount;

  const margin = 30;
  const usableWidth = deviceWidth - margin * 2;
  const laneWidth = usableWidth / laneCount;

  const baseX = margin + laneWidth * index;
  const jitter = Math.random() * (laneWidth * 0.7);
  const x = baseX + jitter;

  return {
    id,
    translateY: new Animated.Value(-COIN_SIZE),
    translateX: new Animated.Value(x),
    floorY: FLOOR_Y + Math.random() * 20 - currentQuestionIndex * 10,
    delay: index * 80 + Math.random() * 120,
    x,
    swing: Math.random() > 0.5 ? 12 : -12,
  };
}

export function quizReducer(state: LevelTypes, action: any): LevelTypes {
  const { seconds, rightAnswers, lives, coinList, currentQuestionIndex } =
    state;
  const { type, payload } = action;

  switch (type) {
    case "DADOS_CARREGADOS": {
      const { isPreviewBuild } = screenValues();

      const dataToUse = isPreviewBuild ? PreviewLevel : payload;

      console.log(dataToUse);

      return {
        ...state,
        initialText: dataToUse.text || "",
        questions: dataToUse.questions || [],
        difficulty: isPreviewBuild
          ? dataToUse.dificulty
          : (dataToUse.difficulty ?? state.difficulty),
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
    case "QUIZ_ACABOU":
      return { ...state, timerActive: false };
    default:
      return state;
  }
}
