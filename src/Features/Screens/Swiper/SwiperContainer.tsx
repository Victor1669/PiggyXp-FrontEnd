import { useEffect, useState } from "react";
import { View, Dimensions } from "react-native";

import useSplashAnimation from "@Screens/Splash/Contexts/useSplashAnimation";

import { CardSwiper } from "@Components/CardSwiper/CardSwiper";

import { SwiperStyles } from "./SwiperContainer.css";

import { cards } from "./Content/CardsContent";
import { SkipCardsButton } from "./Components/SkipCardsButton";
import { useAutoSlider } from "@Hooks/useAutoSlider";

const screenWidth = Dimensions.get("screen").width;

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
    itemWidth: screenWidth,
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
    <View style={SwiperStyles.container}>
      <View style={SwiperStyles.content}>
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
