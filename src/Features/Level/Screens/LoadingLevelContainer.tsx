import { useEffect } from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useQuiz } from "Features/Level/Contexts/useQuiz";

import { GetPhaseService } from "@Auth/Services/GetPhaseService";

import { toastMessage } from "Utils/toast";

export default function LoadingLevelContainer() {
  const { user } = useAuth();
  const { actualQuestion } = useLocalSearchParams();
  const { dispatch } = useQuiz();

  console.log(user.difficulty, Number(actualQuestion));

  useEffect(() => {
    (async () => {
      const { data, status } = await GetPhaseService(
        user.difficulty,
        Number(actualQuestion),
      );
      console.log(data);
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
