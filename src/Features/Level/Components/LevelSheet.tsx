import { useRef, useState, useEffect } from "react";
import { Animated, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useQuiz } from "../Contexts/useQuiz";

import BottomSheet from "Components/BottomSheet/BottomSheet";
import Paragraph from "Components/Paragraph";
import Button from "Components/Button";

import { LevelContainerStyles } from "../Styles/LevelContainerStyles.css";
import { useFinishQuiz } from "../Hooks/useFinishQuiz";

const { bottomSheet } = LevelContainerStyles;

export default function LevelSheet() {
  const { textFeedBack, isAnswered, dispatch } = useQuiz();
  const { finishLevel, isLevelCompleted } = useFinishQuiz();
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
        <View
          style={{
            backgroundColor:
              textFeedBack === "Acertou!" ? "rgb(0, 58, 0)" : "rgb(58, 0, 0)",
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Paragraph>{textFeedBack}</Paragraph>
        </View>
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
  const { isAnswered, textFeedBack } = useQuiz();

  const SHEET_HEIGHT = 300;
  const pan = useRef(new Animated.ValueXY()).current;
  const insets = useSafeAreaInsets();

  return (
    <BottomSheet
      style={[
        bottomSheet,
        {
          backgroundColor:
            textFeedBack === "Acertou!"
              ? "rgba(0, 102, 0, 0.8)"
              : "rgba(139, 0, 0, 0.8)",
        },
      ]}
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
