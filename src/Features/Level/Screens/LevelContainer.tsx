import { useEffect, useRef } from "react";
import { View, StatusBar, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";

import { useQuiz } from "../Contexts/useQuiz";

import BottomSheet from "@Components/BottomSheet/BottomSheet";
import ProgressBar from "@Components/ProgressBar";
import QuestionContainer from "../Components/QuestionContainer";

import Paragraph from "@Components/Paragraph";

export default function LevelContainer() {
  const { questionIndex } = useLocalSearchParams();
  const {
    questions,
    textFeedBack,
    showSheet,
    disableButton,
    seconds,
    dispatch,
  } = useQuiz();
  const insets = useSafeAreaInsets();

  const actualQuestion = questions[Number(questionIndex)];
  const nextQuestionIndex = Number(questionIndex) + 1;
  const isLevelCompleted = nextQuestionIndex === questions.length;

  const SHEET_HEIGHT = 300;
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (questionIndex === "0") {
      dispatch({ type: "QUIZ_COMECOU" });
    }
    return () => {
      dispatch({ type: "PROXIMA_QUESTAO" });
    };
  }, []);

  function handleAnswerValidation(answerIndex: number) {
    if (actualQuestion.rightAnswerIndex === answerIndex) {
      dispatch({ type: "ACERTOU_QUESTAO" });
    } else {
      dispatch({ type: "ERROU_QUESTAO" });
    }
  }

  function handlePassQuestion() {
    if (isLevelCompleted) {
      dispatch({ type: "QUIZ_ACABOU" });
    }

    router.replace(
      isLevelCompleted
        ? `/Level/LevelConclusion`
        : `/Level/?questionIndex=${nextQuestionIndex}`,
    );
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ProgressBar
          maxValue={questions.length}
          actualValue={Number(questionIndex)}
          style={{
            width: 300,
            position: "absolute",
            top: (StatusBar.currentHeight ?? 40) + 5,
            alignSelf: "center",
          }}
        />
        <Paragraph
          style={{
            alignSelf: "center",
            position: "absolute",
            top: (StatusBar.currentHeight ?? 40) + 50,
          }}
        >
          {seconds}
        </Paragraph>

        <QuestionContainer
          actualQuestion={actualQuestion}
          btnDisabled={disableButton}
          onAnswerPress={(index) => handleAnswerValidation(index)}
        />
      </View>
      <BottomSheet
        style={{
          bottom: 0,
          paddingHorizontal: 20,
        }}
        buttonText={isLevelCompleted ? "Concluir Nível" : "Próxima questão"}
        onButtonPress={handlePassQuestion}
        height={SHEET_HEIGHT}
        yPosition={pan}
        showSheet={showSheet}
        showThumb={false}
        interactive={false}
        startSheetTop={SHEET_HEIGHT + 90}
        finalSheetTop={100 + insets.bottom - 15}
        textElements={<Paragraph>{textFeedBack}</Paragraph>}
      />
    </>
  );
}
