import { useRef, useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuiz } from "../Contexts/useQuiz";
import BottomSheet from "Components/BottomSheet/BottomSheet";
import Paragraph from "Components/Paragraph";
import Button from "Components/Button";
import { LevelContainerStyles } from "../Styles/LevelContainerStyles.css";

const { bottomSheet } = LevelContainerStyles;

export default function LevelSheet() {
  const SHEET_HEIGHT = 300;
  const pan = useRef(new Animated.ValueXY()).current;
  const insets = useSafeAreaInsets();
  const { questionIndex } = useLocalSearchParams();
  const { textFeedBack, isAnswered, dispatch, getIsLevelCompleted } = useQuiz();
  const [disableButton, setDisableButton] = useState(false);

  const nextQuestionIndex = +questionIndex + 1;
  const isLevelCompleted = getIsLevelCompleted(+questionIndex);

  function handlePassQuestion() {
    console.log(isLevelCompleted);
    if (isLevelCompleted) {
      dispatch({ type: "QUIZ_ACABOU" });
      router.replace("/Level/LevelConclusion");
    } else {
      router.replace(`/Level/?questionIndex=${nextQuestionIndex}`);
    }
  }

  useEffect(() => {
    return () => {
      setDisableButton(false);
    };
  }, []);

  return (
    <BottomSheet
      style={bottomSheet}
      height={SHEET_HEIGHT}
      yPosition={pan}
      showSheet={isAnswered}
      showThumb={false}
      interactive={false}
      startSheetTop={SHEET_HEIGHT + 90}
      finalSheetTop={insets.bottom + 85}
    >
      <View
        style={{ flex: 1, justifyContent: "space-between", paddingBottom: 20 }}
      >
        <Paragraph>{textFeedBack}</Paragraph>
        <Button
          disabled={disableButton}
          style={{ margin: "auto" }}
          onPress={() => {
            if (disableButton) return;
            setDisableButton(true);
            handlePassQuestion();
          }}
        >
          {isLevelCompleted ? "Concluir Nível" : "Próxima questão"}
        </Button>
      </View>
    </BottomSheet>
  );
}
