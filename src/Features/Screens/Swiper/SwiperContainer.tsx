import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { AppConfig } from "Config/appConfig";
const { deviceHeight, deviceWidth, colors } = AppConfig;

import useSplashAnimation from "@Screens/Splash/Contexts/useSplashAnimation";
import { useAutoSlider } from "@Hooks/useAutoSlider";

import { CardSwiper } from "@Components/CardSwiper/CardSwiper";
import { SkipCardsButton } from "./Components/SkipCardsButton";

import { cards } from "./Content/CardsContent";

export default function SwiperContainer() {
  const [isSkipButtonEnabled, setIsSkipButtonEnabled] = useState(false);

  const { setLayoutAnimation } = useSplashAnimation();

  const {
    flatListRef,
    currentIndex: cardIndex,
    isUserInteracting,
    handleUserInteractionStart,
    handleScrollEnd,
  } = useAutoSlider({
    totalItems: cards.length,
    delay: 3000,
    bounce: false,
    peek: true,
    itemWidth: deviceWidth,
  });

  const isOnLastCard = cardIndex === cards.length - 1;

  useEffect(() => {
    setTimeout(() => {
      setLayoutAnimation("fade");
    }, 0);
  }, []);

  useEffect(() => {
    if (isOnLastCard) {
      setIsSkipButtonEnabled(true);
    }
  }, [isOnLastCard]);

  function handleScroll(index: number) {
    if (!isUserInteracting) return;
    handleScrollEnd(index);
  }

  return (
    <View style={container}>
      <View style={content}>
        <CardSwiper
          ref={flatListRef}
          testId="SwiperContainer"
          imgFolder="start"
          cardsArray={cards}
          actualIndex={cardIndex}
          onScroll={handleScroll}
          onTouchStart={handleUserInteractionStart}
          dotsContainerStyle={{ marginBottom: isSkipButtonEnabled ? 0 : 100 }}
        />
        {isSkipButtonEnabled && <SkipCardsButton />}
      </View>
    </View>
  );
}

const { container, content } = StyleSheet.create({
  container: {
    height: deviceHeight,
    backgroundColor: colors.splashBackColor,
    justifyContent: "center",
  },
  content: {
    height: deviceHeight * 0.9,
  },
});
