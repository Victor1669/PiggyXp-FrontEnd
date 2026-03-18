//#region Importações
import { useEffect } from "react";
import { View, Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { env } from "Config/env";
import { useAuth } from "@Auth/Contexts/useAuth";
import { useQuiz } from "Features/Level/Contexts/useQuiz";

import { GetPhaseService } from "Features/Level/Services/GetPhaseService";

import { toastMessage } from "Utils/toast";

import Picture from "@Components/Picture";

import { PreviewLevel } from "Features/Preview/PreviewLevel";
import { LevelAssets } from "../Assets/LevelAssets";

import { screenValues } from "Config/screenValues";
import { LoadingLevelContainerStyles } from "../Styles/LoadingLevelContainer.css";
const {
  fontSizes: { DEFAULT_FONT_SIZE, SMALL_FONT_SIZE },
} = screenValues();
//#endregion

export default function LoadingLevelContainer() {
  const { user } = useAuth();
  const { actualQuestion } = useLocalSearchParams();
  const { dispatch } = useQuiz();

  useEffect(() => {
    if (env.buildProfile === "preview") {
      dispatch({ type: "DADOS_CARREGADOS", payload: PreviewLevel });
      router.replace("/Level/LevelTips");
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
      <Text
        style={[
          {
            fontSize: DEFAULT_FONT_SIZE,
          },
          LoadingLevelContainerStyles.text,
        ]}
      >
        Aguarde...
      </Text>
      <Text
        style={[
          { marginHorizontal: 50, fontSize: SMALL_FONT_SIZE },
          LoadingLevelContainerStyles.text,
        ]}
      >
        "Quando o dinheiro vai na frente, todos os caminhos se abrem."
      </Text>
    </View>
  );
}
