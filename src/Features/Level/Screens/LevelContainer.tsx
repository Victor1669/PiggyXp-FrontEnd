import { useEffect } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useQuiz } from "../Contexts/useQuiz";

import QuestionContainer from "../Components/QuestionContainer";
import Paragraph from "@Components/Paragraph";
import LevelHeader from "../Components/LevelHeader";

import { LevelContainerStyles } from "../Styles/LevelContainerStyles.css";
import LevelSheet from "../Components/LevelSheet";
const { container, timer } = LevelContainerStyles;

export default function LevelContainer() {
  const { questionIndex } = useLocalSearchParams();
  const { TIMER, dispatch } = useQuiz();

  useEffect(() => {
    if (questionIndex === "0") {
      dispatch({ type: "QUIZ_COMECOU" });
    }
    return () => {
      dispatch({ type: "PROXIMA_QUESTAO" });
    };
  }, []);

  return (
    <>
      <View style={container}>
        <LevelHeader />

        <Paragraph style={timer}>{TIMER}</Paragraph>

        <QuestionContainer />
      </View>
      <LevelSheet />
    </>
  );
}
