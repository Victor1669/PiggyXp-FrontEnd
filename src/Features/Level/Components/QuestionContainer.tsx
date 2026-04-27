import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { LivesService } from "../Services/LevelServices";

import { useQuiz } from "../Contexts/useQuiz";
import { useAuth } from "Features/Auth/Contexts/useAuth";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import AnswerButton from "./AnswerButton";
import Paragraph from "@Components/Paragraph";

import { QuestionContainerStyles } from "../Styles/QuestionContainer.css";
const { answersContainer, container, questionText } = QuestionContainerStyles;

export default function QuestionContainer() {
  const { questionIndex } = useLocalSearchParams();
  const { getQuestion, isAnswered, dispatch } = useQuiz();
  const { userToken } = useAuth();
  const updateUserInfo = useUpdateUserInfo();

  const actualQuestion = getQuestion(+questionIndex);

  async function handleAnswerValidation(answerIndex: number) {
    if (actualQuestion.rightAnswerIndex === answerIndex) {
      dispatch({ type: "ACERTOU_QUESTAO" });
    } else {
      dispatch({ type: "ERROU_QUESTAO" });
      const storedToken = await userToken.get();
      const { data } = await LivesService(storedToken, { erro: 1 });

      console.log(data);
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
