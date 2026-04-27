export interface QuestionTypes {
  question: string;
  answers: string[];
  rightAnswerIndex: number;
}

export interface LevelTypes {
  initialText: string;
  textFeedBack: string;
  rightAnswers: number;
  questions: QuestionTypes[];
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
