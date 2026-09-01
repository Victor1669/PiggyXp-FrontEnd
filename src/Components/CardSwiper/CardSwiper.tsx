import RN, { Dimensions, FlatList, StyleSheet, View } from "react-native";

import Card from "./Card";

import { CardType } from "./CardType";

interface CardSwiperProps {
  cardsArray: CardType[];
  actualIndex: number;
  imgFolder: string;
  onScroll?: (index: number) => void;
  ref?: React.RefObject<FlatList | null>;
  onTouchStart?: () => void;
  cardImageHeight?: number;
  cardImageWidth?: number;
  fontColor?: string;
  testId?: string;
  dotsContainerStyle?: RN.StyleProp<RN.ViewStyle>;
}

const { width } = Dimensions.get("window");

export function CardSwiper({
  cardsArray,
  actualIndex,
  onScroll,
  imgFolder,
  ref,
  cardImageHeight,
  cardImageWidth,
  fontColor = "#000",
  testId,
  onTouchStart,
  dotsContainerStyle,
}: CardSwiperProps) {
  function onCardScroll(e: RN.NativeSyntheticEvent<RN.NativeScrollEvent>) {
    const cardIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    onScroll?.(cardIndex);
  }

  return (
    <>
      <FlatList
        ref={ref}
        testID={testId}
        data={cardsArray}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onCardScroll}
        onTouchStart={onTouchStart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            cardInfo={item}
            cardImageHeight={cardImageHeight}
            cardImageWidth={cardImageWidth}
            imgFolder={imgFolder}
            fontColor={fontColor}
          />
        )}
      />
      <DotsContainer
        style={dotsContainerStyle}
        array={cardsArray}
        actualIndex={actualIndex}
      />
    </>
  );
}

function DotsContainer({
  array,
  actualIndex,
  style,
}: {
  array: CardType[];
  actualIndex: number;
  style: RN.StyleProp<RN.ViewStyle>;
}) {
  return (
    <View style={[dotsContainer, { width }, style]}>
      {array.map((_, i) => (
        <View
          key={i}
          testID={`dot-${i}`}
          style={[
            dot,
            { backgroundColor: i === actualIndex ? "#fff" : "#000" },
          ]}
        />
      ))}
    </View>
  );
}

const { dot, dotsContainer } = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
