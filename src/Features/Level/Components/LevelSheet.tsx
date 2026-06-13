import { useRef, useState, useEffect } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useQuiz } from "../Contexts/useQuiz";

import BottomSheet from "Components/BottomSheet/BottomSheet";
import Paragraph from "Components/Paragraph";
import Button from "Components/Button";

import { LevelContainerStyles } from "../Styles/LevelContainerStyles.css";
import { useFinishLevel } from "../Hooks/useFinishLevel";

const { bottomSheet } = LevelContainerStyles;

export default function LevelSheet() {
  const { textFeedBack, isAnswered, dispatch } = useQuiz();
  const { finishLevel, isLevelCompleted } = useFinishLevel();
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (!isAnswered) {
      setDisableButton(false);
    }
  }, [isAnswered]);

  function handlePassQuestion() {
    if (isLevelCompleted) {
      finishLevel();
    } else {
      dispatch({ type: "PROXIMA_QUESTAO" });
    }
  }

  return (
    <SheetContainer>
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
    </SheetContainer>
  );
}

function SheetContainer({ children }: { children: React.ReactNode }) {
  const { isAnswered } = useQuiz();

  const SHEET_HEIGHT = 300;
  const pan = useRef(new Animated.ValueXY()).current;
  const insets = useSafeAreaInsets();

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
      {children}
    </BottomSheet>
  );
}
