import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { STORAGE_KEYS, setStorageItem } from "Utils/securestore";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useAutoSlider } from "Hooks/useAutoSlider";

import { changeDifficultyApi } from "@Services/changeDifficultyApi";

import { requestNotificationPermission } from "Utils/notifications";

import { CardSwiper } from "@Components/CardSwiper/CardSwiper";
import Button from "@Components/Buttons/Button";

import { GlobalFontColors } from "@Assets/Colors";

const Images = {
  easy: "easy.png",
  medium: "medium.png",
  hard: "hard.png",
};

const cards = [
  {
    id: 1,
    image: Images.easy,
    text: "Uma jornada tranquila para quem está começando. Menos pressão, foco total e aprendizado",
    title: "Fácil",
  },
  {
    id: 2,
    image: Images.medium,
    text: " O desafio equilibrado. Aqui as questões exigem mais atenção para manter suas vidas e progredir nas unidades",
    title: "Médio",
  },
  {
    id: 3,
    image: Images.hard,
    text: "Questões complexas e ritmo acelerado para quem quer conquistar as recompensas mais altas do ranking",
    title: "Difícil",
  },
];

export default function DifficultySelector() {
  const { height } = useWindowDimensions();

  const { setUser } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();

  const {
    currentIndex: difficulty,
    handleUserInteractionStart,
    handleScrollEnd,
    flatListRef,
  } = useAutoSlider({
    totalItems: cards.length,
    delay: 3000,
    peek: true,
    bounce: false,
  });

  useEffect(() => {
    requestNotificationPermission().then(() =>
      setStorageItem(STORAGE_KEYS.userUnit, "1"),
    );
  }, []);

  async function handleSubmit() {
    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const { status } = await changeDifficultyApi({ difficulty });

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
          ref={flatListRef}
          testId="CardSwiper"
          cardsArray={cards}
          actualIndex={difficulty}
          onScroll={handleScrollEnd}
          onTouchStart={handleUserInteractionStart}
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
