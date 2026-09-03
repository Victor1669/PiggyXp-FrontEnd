import { Pressable, StyleSheet, View } from "react-native";

import { AppConfig } from "Config/appConfig";

import { useQuiz } from "../Contexts/useQuiz";
import { useStatus } from "Contexts/StatusContext";

import Picture from "Components/Picture";
import ProgressBar from "Components/ProgressBar";
import Paragraph from "Components/Paragraph";

export default function LevelHeader() {
  const { showStatus } = useStatus();
  const { questions, lives, currentQuestionIndex } = useQuiz();

  function handleExitPress() {
    showStatus("confirmExit");
  }

  return (
    <View style={container}>
      <Pressable style={exitButton} onPress={handleExitPress}>
        <Paragraph fontSize="title" color="grey">
          X
        </Paragraph>
      </Pressable>
      <ProgressBar
        maxValue={questions.length}
        actualValue={currentQuestionIndex}
        style={progressBar}
      />
      <View style={livesContainer}>
        <Paragraph color="red">{lives}</Paragraph>
        <Picture style={livesImage} folder="home" source="lives.png" />
      </View>
    </View>
  );
}

const { container, exitButton, livesContainer, livesImage, progressBar } =
  StyleSheet.create({
    container: {
      width: "90%",
      marginInline: "auto",
      flexDirection: "row",
      justifyContent: "space-around",
      zIndex: 10,
    },
    exitButton: {
      top: 55,
    },
    progressBar: {
      width: AppConfig.deviceWidth * 0.5,
      top: 55,
      alignSelf: "center",
    },
    livesContainer: {
      flexDirection: "row",
      top: 55,
      alignItems: "center",
      gap: 10,
    },
    livesImage: {
      width: 45,
      height: 36,
    },
  });
