import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { screenValues } from "Config/screenValues";

import { FinishPhaseService } from "../Services/LevelServices";
import { UpdateMissionsService } from "Features/Missions/Services/MissionServices";

import { useQuiz } from "../Contexts/useQuiz";
import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";
import { useInternetConnection } from "Contexts/useInternetConnection";

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
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { userToken } = useStorageItemsContext();
  const { TIMER, rightAnswers, questions, rewards, difficulty, order, unit } =
    useQuiz();
  const { getIsConnected } = useInternetConnection();

  const { id } = user;

  async function handleFinishLevel() {
    const { isPreviewBuild } = screenValues();

    if (!getIsConnected()) return;

    setIsLoading(true);

    if (!isPreviewBuild) {
      const storedToken = await userToken.get();

      await FinishPhaseService(difficulty, order, unit, id, storedToken);
      await UpdateMissionsService(
        {
          acerts: rightAnswers,
          completePhase: true,
          completeUnit: order === 10,
          erro: questions.length - rightAnswers,
          login: 1,
          streak: 0,
        },
        storedToken,
      );
    }

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
