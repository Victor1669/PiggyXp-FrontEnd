import { useEffect } from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { env } from "Config/env";
import { useAuth } from "@Auth/Contexts/useAuth";
import { useQuiz } from "Features/Level/Contexts/useQuiz";

import { GetPhaseService } from "@Auth/Services/GetPhaseService";

import { toastMessage } from "Utils/toast";

import { PreviewLevel } from "Features/Preview/PreviewLevel";

export default function LoadingLevelContainer() {
  const { user } = useAuth();
  const { actualQuestion } = useLocalSearchParams();
  const { dispatch } = useQuiz();

  useEffect(() => {
    if (env.buildProfile === "preview") {
      dispatch({ type: "DADOS_CARREGADOS", payload: PreviewLevel });
      router.replace("/Content/Level/LevelTips");
      return;
    }
    (async () => {
      const { data, status } = await GetPhaseService(
        user.difficulty,
        Number(actualQuestion),
      );
      if (status < 300) {
        dispatch({ type: "DADOS_CARREGADOS", payload: data });
        router.replace("/Content/Level/LevelTips");
      } else {
        toastMessage({ type: "error", text: data });
        router.replace("/Content");
      }
    })();
  }, []);

  return (
    <View>
      <Text>LoadingPhaseContainer</Text>
    </View>
  );
}
