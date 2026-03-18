//#region Importações
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { DifficultySelector } from "@Auth/Services/DifficultySelector";

import { CardSwiper, CardType } from "@Components/CardSwiper/CardSwiper";
import Button from "@Components/Button";

import { DifficultySelectorStyles } from "./DifficultySelector.css";
const { container, cardsContainer } = DifficultySelectorStyles;
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

  function onScroll(cardIndex: number) {
    setDifficulty(cardIndex);
  }

  async function handleSubmit() {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const token = await userToken.get();
    const body = { difficulty };
    const { data, status } = await DifficultySelector(body, token);

    if (status < 300) {
      setUser((prev) => ({ ...prev, difficulty }));
      router.replace("/Content");
    }
    setShowLoadingScreen(false);
  }

  return (
    <View style={container}>
      <View style={[cardsContainer, { height: height * 0.8 }]}>
        <CardSwiper
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
    </View>
  );
}
