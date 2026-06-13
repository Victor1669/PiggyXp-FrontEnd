//#region Importações
import { useEffect, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { DifficultyService } from "@Auth/Services/DifficultyService";

import { requestNotificationPermission } from "Utils/notifications";

import { CardSwiper } from "@Components/CardSwiper/CardSwiper";
import Button from "@Components/Button";
import { CardType } from "@Components/CardSwiper/CardType";

import { SelectDifficultyImages } from "./Assets/SelectDifficultyImages";
const { easy, medium, hard } = SelectDifficultyImages;
import { GlobalFontColors } from "@Assets/Colors";
//#endregion

const cardsArray: CardType[] = [
  {
    id: 1,
    image: easy,
    text: "Uma jornada tranquila para quem está começando. Menos pressão, foco total e aprendizado",
    title: "Fácil",
  },
  {
    id: 2,
    image: medium,
    text: " O desafio equilibrado. Aqui as questões exigem mais atenção para manter suas vidas e progredir nas unidades",
    title: "Médio",
  },
  {
    id: 3,
    image: hard,
    text: "Questões complexas e ritmo acelerado para quem quer conquistar as recompensas mais altas do ranking",
    title: "Difícil",
  },
];

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
    const { status } = await DifficultyService(body, token);

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
