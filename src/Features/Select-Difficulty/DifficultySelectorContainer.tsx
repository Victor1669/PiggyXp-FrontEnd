//#region Importações
import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { DifficultyService } from "@Auth/Services/DifficultyService";

import { requestNotificationPermission } from "Utils/notifications";

import { CardSwiper, CardType } from "@Components/CardSwiper/CardSwiper";
import Button from "@Components/Button";

import { SelectDifficultyImages } from "./Assets/SelectDifficultyImages";
const { easy, medium, hard } = SelectDifficultyImages;
import { GlobalFontColors } from "@Assets/Colors";
//#endregion

const cardsArray: CardType[] = [
  { id: 1, image: easy, text: "easy", title: "Fácil" },
  { id: 2, image: medium, text: "medium", title: "Médio" },
  { id: 3, image: hard, text: "hard", title: "Difícil" },
];

export default function DifficultySelectorContainer() {
  const [difficulty, setDifficulty] = useState<number>(0);
  const { height } = useWindowDimensions();

  const { setUser, userToken } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  useEffect(() => {
    (async () => {
      await requestNotificationPermission();
    })();
  }, []);

  function onScroll(cardIndex: number) {
    setDifficulty(cardIndex);
  }

  async function handleSubmit() {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);

    const token = await userToken.get();
    const body = { difficulty };
    const { data, status } = await DifficultyService(body, token);

    if (status < 300) {
      setUser((prev) => ({ ...prev, difficulty }));
      router.replace("/Content");
    }

    setShowLoadingScreen(false);
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
