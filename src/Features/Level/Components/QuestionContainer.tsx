import { Text, View } from "react-native";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { TITLE_FONT_SIZE },
} = screenValues();

import { QuestionTypes } from "../Contexts/useQuiz";

import AnswerButton from "./AnswerButton";

import { GlobalFontColors } from "@Assets/Colors";

export default function QuestionContainer({
  actualQuestion,
  btnDisabled,
  onAnswerPress,
}: {
  actualQuestion: QuestionTypes;
  btnDisabled: boolean;
  onAnswerPress: (index: number) => void;
}) {
  return (
    <View style={{ gap: 35 }}>
      <Text
        style={{
          color: GlobalFontColors.Dark,
          textAlign: "center",
          marginBottom: 60,
          fontWeight: "bold",
          fontSize: TITLE_FONT_SIZE,
        }}
      >
        {actualQuestion?.question}
      </Text>
      <View style={{ gap: 15 }}>
        {actualQuestion?.answers.map((answer, i) => (
          <AnswerButton
            key={i}
            disabled={btnDisabled}
            answerIndex={i}
            rightAnswer={actualQuestion.rightAnswerIndex}
            text={answer}
            onPress={() => onAnswerPress(i)}
          />
        ))}
      </View>
    </View>
  );
}
