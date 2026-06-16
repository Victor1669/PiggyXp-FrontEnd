//#region Importações
import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { setDifficultyApi } from "Features/Select-Difficulty/setDifficultyApi";

import { requestNotificationPermission } from "Utils/notifications";
import { generateCards } from "./generateCards";

import { CardSwiper } from "@Components/CardSwiper/CardSwiper";
import Button from "@Components/Button";

import { GlobalFontColors } from "@Assets/Colors";
//#endregion

const cardsArray = generateCards();

export default function DifficultySelectorContainer() {
  const [difficulty, setDifficulty] = useState<number>(0);
  const { height } = useWindowDimensions();

  const { setUser } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();
  const { userUnit, userToken } = useStorageItemsContext();

  useEffect(() => {
    (async () => {
      await requestNotificationPermission();
      await userUnit.set("1");
    })();
  }, []);

  function onScroll(cardIndex: number) {
    setDifficulty(cardIndex);
  }

  async function handleSubmit() {
    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const token = await userToken.get();
    const body = { difficulty };
    const { status } = await setDifficultyApi(body, token);

    if (status < 300) {
      setUser((prev) => ({ ...prev, difficulty }));
      router.replace("/Content");
    }

    hideStatus();
  }

  return (
    <>
      <View style={{ height: height * 0.8, marginBottom: 50 }}>
        <CardSwiper
          testId="CardSwiper"
          cardsArray={cardsArray}
          onScroll={onScroll}
          actualIndex={difficulty}
          cardImageWidth={300}
          cardImageHeight={340}
          imgFolder="difficulty"
          fontColor={GlobalFontColors.Dark}
        />
      </View>
      <Button onPress={handleSubmit}>Continuar</Button>
    </>
  );
}
