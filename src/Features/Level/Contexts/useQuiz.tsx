import { createContext, useContext, useEffect, useReducer } from "react";

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { quizReducer } from "./quizReducer";

import { LevelContextValues, QuestionTypes } from "../Types/LevelTypes";

interface QuizProviderValues extends LevelContextValues {
  dispatch: React.Dispatch<any>;
  getQuestion: (questionIndex: number) => QuestionTypes;
  getIsLevelCompleted: (questionIndex: number) => boolean;
}

const initialValues: LevelContextValues = {
  initialText: "",
  textFeedBack: "",
  questions: [],
  rightAnswers: 0,
  coinList: [],
  currentQuestionIndex: 0,
  isAnswered: false,
  isTimerActive: false,
  isRepeatingLevel: false,
  seconds: 0,
  lives: 0,
  difficulty: 0,
  order: 0,
  unit: 0,
  rewards: { coins: 0, xp: 0 },
  TIMER: "00 : 00",
  losed: false,
};

const QuizContext = createContext<QuizProviderValues | undefined>(undefined);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(quizReducer, {
    ...initialValues,
    lives: user?.lives ?? 0,
  });

  const { seconds, isTimerActive, questions } = state;

  const TIMER_MINUTES = String(Math.floor(seconds / 60)).padStart(2, "0");
  const TIMER_SECONDS = String(seconds % 60).padStart(2, "0");
  const TIMER_STRING = `${TIMER_MINUTES} : ${TIMER_SECONDS}`;

  function getQuestion(questionIndex: number) {
    return questions[+questionIndex];
  }

  function getIsLevelCompleted(questionIndex: number) {
    return questionIndex + 1 === questions.length;
  }

  useEffect(() => {
    if (user?.lives !== undefined) {
      dispatch({ type: "ATUALIZAR_VIDAS", payload: user.lives });
    }
  }, [user?.lives]);

  useEffect(() => {
    if (!isTimerActive) return;
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const value: QuizProviderValues = {
    ...state,
    getQuestion,
    getIsLevelCompleted,
    dispatch,
    TIMER: TIMER_STRING,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext usado fora do QuizProvider!");
  return context;
}

export { QuizProvider, useQuiz };
