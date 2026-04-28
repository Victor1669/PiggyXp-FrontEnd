import { useAuth } from "Features/Auth/Contexts/useAuth";
import { createContext, useContext, useEffect, useReducer } from "react";
import { quizReducer } from "./quizReducer";
import { LevelTypes, QuestionTypes } from "../Types/LevelTypes";

interface QuizProviderValues extends LevelTypes {
  dispatch: React.Dispatch<any>;
  getQuestion: (questionIndex: number) => QuestionTypes;
  getIsLevelCompleted: (questionIndex: number) => boolean;
}

const initialValues: LevelTypes = {
  initialText: "",
  textFeedBack: "",
  questions: [],
  rightAnswers: 0,
  coinList: [],
  currentQuestionIndex: 0,
  isAnswered: false,
  timerActive: false,
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

  const { seconds, timerActive, questions } = state;

  useEffect(() => {
    if (user?.lives !== undefined) {
      dispatch({ type: "ATUALIZAR_VIDAS", payload: user.lives });
    }
  }, [user?.lives]);

  function getQuestion(questionIndex: number) {
    return questions[+questionIndex];
  }

  function getIsLevelCompleted(questionIndex: number) {
    return questionIndex + 1 === questions.length;
  }

  const TIMER_MINUTES = String(Math.floor(seconds / 60)).padStart(2, "0");
  const TIMER_SECONDS = String(seconds % 60).padStart(2, "0");
  const TIMER_STRING = `${TIMER_MINUTES} : ${TIMER_SECONDS}`;

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

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
