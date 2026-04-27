import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { FinishPhaseService } from "../Services/LevelServices";

import { useQuiz } from "../Contexts/useQuiz";
import { useAuth } from "Features/Auth/Contexts/useAuth";

import Button from "@Components/Button";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { LevelAssets } from "../Assets/LevelAssets";
import { LevelConclusionStyles } from "../Styles/LevelConclusionStyles.css";
const {
  container,
  image,
  conclusionMessage,
  textsContainer,
  rewardsTexts,
  conclusionButton,
} = LevelConclusionStyles;

export default function LevelConclusionContainer() {
  const [isLoading, setIsLoading] = useState(false);

  const { user, userToken } = useAuth();
  const { TIMER, rightAnswers, questions, rewards, difficulty, order, unit } =
    useQuiz();

  async function handleFinishLevel() {
    setIsLoading(true);

    const storedToken = await userToken.get();
    await FinishPhaseService(difficulty, order, unit, user.id, storedToken);

    setIsLoading(false);
    router.replace("/Content");
  }

  return (
    <View style={container}>
      <Picture folder="" source={LevelAssets.homem} style={image} />

      <Paragraph style={conclusionMessage} fontSize="big">
        Impressionante, você é fora da curva!
      </Paragraph>

      <View style={textsContainer}>
        <Paragraph fontSize="big" fontWeight="bold" textAlign="center">
          {rightAnswers} / {questions.length}
        </Paragraph>

        <Paragraph color="#E2FF41" fontSize="big" fontWeight="bold">
          {TIMER}
        </Paragraph>

        <View style={rewardsTexts}>
          <Paragraph fontWeight="bold">+{rewards.coins} coins</Paragraph>
          <Paragraph fontWeight="bold">+{rewards.xp} xp</Paragraph>
        </View>
      </View>

      <Button onPress={handleFinishLevel} style={conclusionButton}>
        {isLoading ? "Carregando..." : "Receber xp"}
      </Button>
    </View>
  );
}
