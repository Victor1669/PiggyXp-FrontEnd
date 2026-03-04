import { createContext, useContext, useEffect, useReducer } from "react";
import { Animated } from "react-native";

//#region Interfaces e Types
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
  showSheet: boolean;
  disableButton: boolean;
  seconds: number;
}
interface QuizProviderValues extends LevelTypes {
  dispatch: React.ActionDispatch<[action: any]>;
}
//#endregions

const initialValues: LevelTypes = {
  initialText: "",
  textFeedBack: "",
  questions: [],
  rightAnswers: 0,
  showSheet: false,
  disableButton: false,
  seconds: 0,
};

function reducer(state: any, action: any): LevelTypes {
  const { rightAnswers, seconds }: LevelTypes = state;

  const { type, payload } = action;

  switch (type) {
    case "DADOS_CARREGADOS": {
      const { text: initialText, difficulty, order, questions } = payload;

      return { ...state, initialText, difficulty, order, questions };
    }
    case "TICK": {
      return { ...state, seconds: seconds + 1 };
    }
    case "ERROU_QUESTAO": {
      return {
        ...state,
        textFeedBack: "Errou!",
        disableButton: true,
        showSheet: true,
      };
    }
    case "ACERTOU_QUESTAO": {
      return {
        ...state,
        rightAnswers: rightAnswers + 1,
        textFeedBack: "Acertou!",
        disableButton: true,
        showSheet: true,
      };
    }
    case "PROXIMA_QUESTAO": {
      return { ...state, showSheet: false, disableButton: false };
    }
    case "QUIZ_ACABOU": {
      return { ...state };
    }
    default:
      throw new Error("Ação desconhecida: " + type);
  }
}

const QuizContext = createContext<QuizProviderValues | undefined>(undefined);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [
    {
      initialText,
      questions,
      rightAnswers,
      showSheet,
      disableButton,
      textFeedBack,
      seconds,
    },
    dispatch,
  ]: [state: LevelTypes, dispatch: React.ActionDispatch<[action: any]>] =
    useReducer(reducer, initialValues);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const value: QuizProviderValues = {
    initialText,
    rightAnswers,
    questions,
    dispatch,
    showSheet,
    disableButton,
    textFeedBack,
    seconds,
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
