import { View } from "react-native";

import { useQuiz } from "../Contexts/useQuiz";

import { useFinishLevel } from "../Hooks/useFinishLevel";

import Button from "@Components/Button";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { LevelConclusionStyles } from "../Styles/LevelConclusionStyles.css";
const {
  container,
  image,
  conclusionMessage,
  textsContainer,
  rewardsTexts,
  conclusionButton,
} = LevelConclusionStyles;

import { LevelAssets } from "../Assets/LevelAssets";

export default function LevelConclusionContainer() {
  const { TIMER, rightAnswers, questions, rewards, isRepeatingLevel } =
    useQuiz();

  const { finishLevel, isLoading, generateFinishPhrase } = useFinishLevel();

  const finishPhrase = generateFinishPhrase();

  return (
    <View style={container}>
      <Picture folder="" source={LevelAssets.homem} style={image} />

      <Paragraph style={conclusionMessage} fontSize="big">
        {finishPhrase}
      </Paragraph>

      <View style={textsContainer}>
        <Paragraph fontSize="big" fontWeight="bold" textAlign="center">
          {rightAnswers} / {questions.length}
        </Paragraph>

        <Paragraph color="#E2FF41" fontSize="big" fontWeight="bold">
          {TIMER}
        </Paragraph>

        <View style={rewardsTexts}>
          <Paragraph fontWeight="bold">
            +{isRepeatingLevel ? 0 : rewards.coins} coins
          </Paragraph>
          <Paragraph fontWeight="bold">
            +{isRepeatingLevel ? 0 : rewards.xp} xp
          </Paragraph>
        </View>
      </View>

      <Button onPress={finishLevel} style={conclusionButton}>
        {isLoading
          ? "Carregando..."
          : isRepeatingLevel
            ? "Finalizar"
            : "Receber xp"}
      </Button>
    </View>
  );
}
