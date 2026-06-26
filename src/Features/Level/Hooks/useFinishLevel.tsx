import { useState } from "react";
import { router } from "expo-router";

import { screenValues } from "Config/screenValues";

import { FinishPhaseService, LivesService } from "../Services/LevelServices";
import { UpdateMissionsService } from "Features/Missions/Services/MissionServices";

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useQuiz } from "../Contexts/useQuiz";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

export function useFinishLevel() {
  const [isLoading, setIsLoading] = useState(false);

  const { getIsConnected } = useInternetConnection();
  const { userToken } = useStorageItemsContext();
  const {
    user: { id },
  } = useAuth();
  const {
    rightAnswers,
    questions,
    difficulty,
    order,
    unit,
    seconds,
    isRepeatingLevel,
  } = useQuiz();

  const errors = questions.length - rightAnswers;

  function generateFinishPhrase() {
    const correactAnsersRatio = rightAnswers / questions.length;

    if (seconds < 60) {
      return "Na velocidade do som!";
    } else if (seconds < 120) {
      return "Que velocidade!";
    }

    if (correactAnsersRatio >= 0.9) {
      return "Impressionante, você é fora da curva!";
    } else if (correactAnsersRatio >= 0.7) {
      return "Aprendendo cada vez mais!";
    } else return "O importante é não desistir!";
  }

  async function finishLevel() {
    const { isPreviewBuild } = screenValues();

    if (!getIsConnected()) return;

    setIsLoading(true);

    if (!isPreviewBuild) {
      const storedToken = await userToken.get();

      if (errors > 0) {
        await LivesService(storedToken, { erro: errors });
      }

      if (!isRepeatingLevel) {
        await FinishPhaseService(difficulty, order, unit, id, storedToken);
        await UpdateMissionsService(
          {
            acerts: rightAnswers,
            completePhase: true,
            completeUnit: order === 10,
            erro: errors,
            login: 1,
            streak: 0,
          },
          storedToken,
        );
      }
    }

    setIsLoading(false);
    router.replace("/Content");
  }

  return { finishLevel, isLoading, generateFinishPhrase, errors };
}
