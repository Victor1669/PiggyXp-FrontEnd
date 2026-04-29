//#region Importações
import { useEffect } from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { screenValues } from "Config/screenValues";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useQuiz } from "Features/Level/Contexts/useQuiz";

import { GetPhaseService } from "Features/Level/Services/LevelServices";

import { toastMessage } from "Utils/toast";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { PreviewLevel } from "Features/Preview/PreviewLevel";
import { LevelAssets } from "../Assets/LevelAssets";
//#endregion

export default function LoadingLevelContainer() {
  const { user } = useAuth();
  const { actualQuestion } = useLocalSearchParams();
  const { dispatch } = useQuiz();

  const { isPreviewBuild } = screenValues();

  useEffect(() => {
    if (isPreviewBuild) {
      dispatch({ type: "DADOS_CARREGADOS", payload: PreviewLevel });
      setTimeout(() => {
        router.replace("/Level/LevelTips");
      }, 1000);
      return;
    }
    (async () => {
      const { data, status } = await GetPhaseService(
        user.difficulty,
        Number(actualQuestion),
      );
      if (status < 300) {
        dispatch({ type: "DADOS_CARREGADOS", payload: data });
        router.replace("/Level/LevelTips");
      } else {
        toastMessage({ type: "error", text: data });
        router.replace("/Content");
      }
    })();
  }, []);

  return (
    <View style={{ gap: 15 }}>
      <Picture
        folder=""
        source={LevelAssets.gato}
        style={{ marginHorizontal: "auto", width: 200, height: 200 }}
      />
      <Paragraph fontWeight="bold">Aguarde...</Paragraph>
      <Paragraph
        fontSize="small"
        fontWeight="bold"
        style={{ marginHorizontal: 50 }}
      >
        "Quando o dinheiro vai na frente, todos os caminhos se abrem."
      </Paragraph>
    </View>
  );
}
