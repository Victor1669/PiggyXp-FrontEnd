//#region Importações
import { useEffect, useRef } from "react";
import { View, Text, StatusBar, Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useQuiz } from "../Contexts/useQuiz";

import BottomSheet from "@Components/BottomSheet/BottomSheet";
import ProgressBar from "@Components/ProgressBar";
import QuestionContainer from "../Components/QuestionContainer";

import { GlobalFontColors } from "@Assets/Colors";
//#endregion

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

  const actualQuestion = questions[Number(questionIndex)];
  const nextQuestionIndex = Number(questionIndex) + 1;
  const isLevelCompleted = nextQuestionIndex === questions.length;

  const SHEET_HEIGHT = 300;
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
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
        ? `/Content`
        : `/Content/Level/?questionIndex=${nextQuestionIndex}`,
    );
  }

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ProgressBar
          width={300}
          maxValue={questions.length}
          actualValue={Number(questionIndex)}
          style={{
            position: "absolute",
            top: (StatusBar.currentHeight ?? 40) + 5,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            color: "#fff",
            alignSelf: "center",
            position: "absolute",
            top: (StatusBar.currentHeight ?? 40) + 50,
          }}
        >
          {seconds}
        </Text>
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
        textElements={
          <Text style={{ color: GlobalFontColors.Dark }}>{textFeedBack}</Text>
        }
      />
    </>
  );
}
