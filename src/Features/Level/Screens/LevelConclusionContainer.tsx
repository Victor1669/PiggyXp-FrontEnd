import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { useQuiz } from "../Contexts/useQuiz";

import { useFinishLevel } from "../Hooks/useFinishLevel";

import Button from "Components/Buttons/Button";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { LevelAssets } from "../Assets/LevelAssets";

export default function LevelConclusionContainer() {
  const { TIMER, rightAnswers, questions, rewards, isRepeatingLevel } =
    useQuiz();

  const { finishLevel, isLoading, generateFinishPhrase } = useFinishLevel();

  const [disableButton, setDisableButton] = useState(false);

  const finishPhrase = generateFinishPhrase();

  function handleFinishLevel() {
    setDisableButton(true);

    finishLevel();
  }

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

      <Button
        disabled={disableButton}
        onPress={handleFinishLevel}
        style={conclusionButton}
      >
        {isLoading
          ? "Carregando..."
          : isRepeatingLevel
            ? "Finalizar"
            : "Receber xp"}
      </Button>
    </View>
  );
}

const {
  conclusionButton,
  conclusionMessage,
  container,
  image,
  rewardsTexts,
  textsContainer,
} = StyleSheet.create({
  container: {
    gap: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    aspectRatio: 16 / 9,
  },
  conclusionMessage: {
    marginHorizontal: 75,
  },
  rewardsTexts: {
    flexDirection: "row",
    gap: 70,
  },
  textsContainer: {
    gap: 20,
  },
  conclusionButton: {
    marginTop: 50,
  },
});
