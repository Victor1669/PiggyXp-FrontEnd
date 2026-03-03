//#region Importações
import { useEffect, useRef, useState } from "react";
import { View, Text, StatusBar, Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useQuiz, QuestionTypes } from "../Contexts/useQuiz";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { DEFAULT_FONT_SIZE, TITLE_FONT_SIZE },
} = screenValues();

import Button from "@Components/Button";
import BottomSheet from "@Components/BottomSheet/BottomSheet";
import ProgressBar from "@Components/ProgressBar";

import { GlobalFontColors } from "@Assets/Colors";
//#endregion

export default function LevelContainer() {
  const { questionIndex } = useLocalSearchParams();
  const { questions, dispatch } = useQuiz();

  const [showSheet, setShowSheet] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [textFeedback, setTextFeedback] = useState("");

  const actualQuestion = questions[Number(questionIndex)];
  const nextQuestionIndex = Number(questionIndex) + 1;
  const isLevelCompleted = nextQuestionIndex === questions.length;

  const SHEET_HEIGHT = 290;
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    return () => {
      setShowSheet(false);
      Animated.spring(pan, {
        toValue: { y: 0, x: 0 },
        useNativeDriver: true,
      }).start();
    };
  }, []);

  if (!actualQuestion) return null;

  function handleAnswerValidation(answerIndex: number) {
    setBtnDisabled(true);
    if (actualQuestion.rightAnswerIndex === answerIndex) {
      setTextFeedback("Acertou!");
      dispatch({ type: "ACERTOU_QUESTAO" });
    } else {
      setTextFeedback("Errou");
    }
    setShowSheet(true);
  }

  function handlePassQuestion() {
    setShowSheet(false);

    if (isLevelCompleted) {
      dispatch({ type: "QUIZ_ACABADO" });
    }

    router.replace(
      isLevelCompleted
        ? `/Content`
        : `/Content/Level/?questionIndex=${nextQuestionIndex}`,
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ProgressBar
        width={300}
        maxValue={questions.length}
        actualValue={Number(questionIndex) + 1}
        style={{
          position: "absolute",
          top: (StatusBar.currentHeight ?? 10) + 5,
          alignSelf: "center",
        }}
      />
      <QuestionContainer
        actualQuestion={actualQuestion}
        btnDisabled={btnDisabled}
        onAnswerPress={(index) => handleAnswerValidation(index)}
      />
      <BottomSheet
        buttonText={isLevelCompleted ? "Concluir Nível" : "Próxima questão"}
        onButtonPress={handlePassQuestion}
        height={SHEET_HEIGHT}
        yPosition={pan}
        showSheet={showSheet}
        showThumb={false}
        style={{ marginTop: 640 }}
        textElements={
          <Text style={{ color: GlobalFontColors.Dark }}>{textFeedback}</Text>
        }
      />
    </View>
  );
}

function QuestionContainer({
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
          fontWeight: "bold",
          fontSize: TITLE_FONT_SIZE,
        }}
      >
        {actualQuestion.question}
      </Text>
      <View style={{ gap: 15 }}>
        {actualQuestion.answers.map((answer, i) => (
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

function AnswerButton({
  answerIndex,
  rightAnswer,
  text,
  onPress,
  disabled,
}: {
  answerIndex: number;
  rightAnswer: number;
  onPress: () => void;
  text: string;
  disabled: boolean;
}) {
  const [buttonColor, setButtonColor] = useState({
    backColor: "rgba(217,217,217, 0.28)",
    shadowColor: "rgba(101,101,101, 0.78)",
  });
  return (
    <Button
      disabled={disabled}
      fontColor={GlobalFontColors.Dark}
      fontSize={DEFAULT_FONT_SIZE}
      style={{
        backgroundColor: buttonColor.backColor,
        margin: "auto",
        justifyContent: "center",
        height: 72,
      }}
      shadowColor={buttonColor.shadowColor}
      onPress={() => {
        onPress();

        setButtonColor({ backColor: "green", shadowColor: "green" });

        if (answerIndex !== rightAnswer)
          setButtonColor({ backColor: "red", shadowColor: "red" });
      }}
    >
      {text}
    </Button>
  );
}
