import { Pressable, View } from "react-native";

import { useQuiz } from "../Contexts/useQuiz";
import { useStatus } from "Contexts/StatusContext";

import Picture from "Components/Picture";
import ProgressBar from "Components/ProgressBar";
import Paragraph from "Components/Paragraph";

import { LevelHeaderStyles } from "../Styles/LevelHeader.css";
const { container, progressBar, livesContainer, livesImage, exitButton } =
  LevelHeaderStyles;

export default function LevelHeader() {
  const { showStatus } = useStatus();
  const { questions, lives, currentQuestionIndex } = useQuiz();

  function handleExitPress() {
    console.log("TEste");
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
