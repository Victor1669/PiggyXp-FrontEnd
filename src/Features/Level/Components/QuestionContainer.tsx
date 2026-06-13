import { View } from "react-native";

import { useQuiz } from "../Contexts/useQuiz";

import { useAnswerValidation } from "../Hooks/useAnswerValidation";

import AnswerButton from "./AnswerButton";
import Paragraph from "@Components/Paragraph";

import { QuestionContainerStyles } from "../Styles/QuestionContainer.css";

const { answersContainer, container, questionText } = QuestionContainerStyles;

export default function QuestionContainer({ index }: { index: number }) {
  const { getQuestion, isAnswered } = useQuiz();

  const actualQuestion = getQuestion(index);

  const answerValidation = useAnswerValidation(index);

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
            onPress={() => answerValidation(i)}
          >
            {answer}
          </AnswerButton>
        ))}
      </View>
    </View>
  );
}
