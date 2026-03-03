import { createContext, useContext, useReducer } from "react";

//#region Interfaces e Types
export interface QuestionTypes {
  question: string;
  answers: string[];
  rightAnswerIndex: number;
}

interface LevelTypes {
  initialText: string;
  rightAnswers: number;
  questions: QuestionTypes[];
}
interface QuizProviderValues extends LevelTypes {
  dispatch: React.ActionDispatch<[action: any]>;
}
//#endregions

const initialValues: LevelTypes = {
  questions: [],
  rightAnswers: 0,
  initialText: "",
};

function reducer(state: any, action: any): LevelTypes {
  const { rightAnswers }: LevelTypes = state;

  const { type, payload } = action;

  switch (type) {
    case "DADOS_CARREGADOS": {
      const { text: initialText, difficulty, order, questions } = payload;

      return { ...state, initialText, difficulty, order, questions };
    }
    case "ACERTOU_QUESTAO": {
      return { ...state, rightAnswers: rightAnswers + 1 };
    }
    case "QUIZ_ACABADO": {
      return { ...state };
    }
    default:
      throw new Error("Ação desconhecida: " + type);
  }
}

const QuizContext = createContext<QuizProviderValues | undefined>(undefined);

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [{ initialText, questions, rightAnswers }, dispatch]: [
    state: LevelTypes,
    dispatch: React.ActionDispatch<[action: any]>,
  ] = useReducer(reducer, initialValues);

  const value: QuizProviderValues = {
    initialText,
    rightAnswers,
    questions,
    dispatch,
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
