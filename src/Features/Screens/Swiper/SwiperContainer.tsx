import { useEffect, useRef, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";

import { CardSwiper } from "@Components/CardSwiper/CardSwiper";

import { SwiperStyles } from "./SwiperContainer.css";

import { cards } from "./Content/CardsContent";
import { SkipCardsButton } from "./Components/SkipCardsButton";

const CARDS_LIMIT = cards.length - 1;

const screenWidth = Dimensions.get("screen").width;

export default function SwiperContainer() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isTimerEnabled, setIsTimerEnabled] = useState(true);
  const [isSkipButtonEnabled, setIsSkipButtonEnabled] = useState(false);

  const cardSwiperRef = useRef<FlatList>(null);
  const cardIntervalRef = useRef<NodeJS.Timeout>(null);

  const isOnLastCard = cardIndex === CARDS_LIMIT;

  useEffect(function createCardInterval() {
    if (!isTimerEnabled) return;
    cardIntervalRef.current = setInterval(() => {
      setCardIndex((prev) => {
        const next = prev + 1 > CARDS_LIMIT ? 0 : prev + 1;

        return next;
      });
    }, 3000);

    return () => {
      clearInterval(cardIntervalRef.current ?? undefined);
    };
  }, []);

  useEffect(() => {
    const flatList = cardSwiperRef.current;
    if (!flatList || !isTimerEnabled) return;
    if (isOnLastCard) {
      setIsSkipButtonEnabled(true);
    }

    const animationSteps = [
      { offset: screenWidth * cardIndex, delay: 0 },
      { offset: screenWidth * cardIndex + 40, delay: 1000 },
      { offset: screenWidth * cardIndex, delay: 1400 },
    ];

    const timeouts = animationSteps.map(({ offset, delay }) =>
      setTimeout(() => {
        flatList.scrollToOffset({ offset, animated: true });
      }, delay),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [cardIndex, isTimerEnabled]);

  function handleTouchStart() {
    setIsTimerEnabled(false);
    clearInterval(cardIntervalRef.current ?? undefined);
  }

  function handleScroll(cardIndex: number) {
    if (isTimerEnabled) return;
    setCardIndex(cardIndex);
  }

  return (
    <View style={SwiperStyles.container}>
      <View style={SwiperStyles.content}>
        <CardSwiper
          ref={cardSwiperRef}
          testId="SwiperContainer"
          imgFolder="start"
          cardsArray={cards}
          actualIndex={cardIndex}
          onScroll={handleScroll}
          onTouchStart={handleTouchStart}
          dotsContainerStyle={{ marginBottom: isSkipButtonEnabled ? 0 : 100 }}
        />
        {isSkipButtonEnabled && <SkipCardsButton />}
      </View>
    </View>
  );
}
