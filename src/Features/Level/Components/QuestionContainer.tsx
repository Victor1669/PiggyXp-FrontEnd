import { View } from "react-native";
import { useQuiz } from "../Contexts/useQuiz";
import AnswerButton from "./AnswerButton";
import Paragraph from "@Components/Paragraph";
import { QuestionContainerStyles } from "../Styles/QuestionContainer.css";
import { useAuth } from "Features/Auth/Contexts/useAuth";
import { LivesService } from "../Services/LevelServices";
import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

const { answersContainer, container, questionText } = QuestionContainerStyles;

export default function QuestionContainer({ index }: { index: number }) {
  const { userToken } = useAuth();
  const { getQuestion, isAnswered, dispatch, rewards } = useQuiz();
  const actualQuestion = getQuestion(index);
  const updateUserInfo = useUpdateUserInfo();

  async function handleAnswerValidation(answerIndex: number) {
    if (actualQuestion.rightAnswerIndex === answerIndex) {
      dispatch({
        type: "ACERTOU_QUESTAO",
        payload: { multiplier: rewards.coins / 10 },
      });
    } else {
      dispatch({ type: "ERROU_QUESTAO" });
      const storedToken = await userToken.get();
      await LivesService(storedToken, { erro: 1 });
      await updateUserInfo();
    }
  }

  return (
    <View style={container}>
      <Paragraph style={questionText}>{actualQuestion?.question}</Paragraph>
      <View style={answersContainer}>
        {actualQuestion?.answers.map((answer, i) => (
          <AnswerButton
            key={i}
            disabled={isAnswered}
            answerIndex={i}
            rightAnswer={actualQuestion.rightAnswerIndex}
            text={answer}
            onPress={() => handleAnswerValidation(i)}
          />
        ))}
      </View>
    </View>
  );
}
