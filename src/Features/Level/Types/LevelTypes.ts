import { Animated } from "react-native";

export interface QuestionTypes {
  question: string;
  answers: string[];
  rightAnswerIndex: number;
}

export interface CoinType {
  id: number;
  translateY: Animated.Value;
  translateX: Animated.Value;
  floorY: number;
  delay: number;
  x: number;
  swing: number;
}

export interface LevelTypes {
  initialText: string;
  textFeedBack: string;
  rightAnswers: number;
  questions: QuestionTypes[];
  coinList: CoinType[];
  currentQuestionIndex: number;
  isAnswered: boolean;
  timerActive: boolean;
  seconds: number;
  lives: number;
  difficulty: number;
  order: number;
  unit: number;
  rewards: {
    coins: number;
    xp: number;
  };
  TIMER: string;
  losed: boolean;
}
