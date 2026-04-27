import { Pressable, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { useQuiz } from "../Contexts/useQuiz";
import { useStatus } from "Contexts/StatusContext";

import Picture from "Components/Picture";
import ProgressBar from "Components/ProgressBar";
import Paragraph from "Components/Paragraph";

import { LevelHeaderStyles } from "../Styles/LevelHeader.css";
const { container, progressBar, livesContainer, livesImage, exitButton } =
  LevelHeaderStyles;

export default function LevelHeader() {
  const { questionIndex } = useLocalSearchParams();

  const { showStatus } = useStatus();
  const { questions, lives } = useQuiz();

  return (
    <View style={container}>
      <Pressable style={exitButton} onPress={() => showStatus("confirmExit")}>
        <Paragraph fontSize="title" color="grey">
          X
        </Paragraph>
      </Pressable>
      <ProgressBar
        maxValue={questions.length}
        actualValue={Number(questionIndex)}
        style={progressBar}
      />
      <View style={livesContainer}>
        <Paragraph color="red">{lives}</Paragraph>
        <Picture style={livesImage} folder="home" source="lives.png" />
      </View>
    </View>
  );
}
