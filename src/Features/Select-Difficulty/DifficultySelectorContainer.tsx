import { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";
import { useAutoSlider } from "Hooks/useAutoSlider";

import { setDifficultyApi } from "Features/Select-Difficulty/setDifficultyApi";

import { requestNotificationPermission } from "Utils/notifications";
import { generateCards } from "./generateCards";

import { CardSwiper } from "@Components/CardSwiper/CardSwiper";
import Button from "@Components/Button";

import { GlobalFontColors } from "@Assets/Colors";

const cardsArray = generateCards();

export default function DifficultySelectorContainer() {
  const { height } = useWindowDimensions();

  const { setUser } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();
  const { userUnit, userToken } = useStorageItemsContext();

  const {
    currentIndex: difficulty,
    handleUserInteractionStart,
    handleScrollEnd,
    flatListRef,
  } = useAutoSlider({
    totalItems: cardsArray.length,
    delay: 3000,
    peek: true,
    bounce: false,
  });

  useEffect(() => {
    (async () => {
      await requestNotificationPermission();
      await userUnit.set("1");
    })();
  }, []);

  async function handleSubmit() {
    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const token = await userToken.get();
    const { status } = await setDifficultyApi({ difficulty }, token);

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
          cardsArray={cardsArray}
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
