import RN, {
  Dimensions,
  FlatList,
  Image,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import { CardSwiperStyles } from "./CardSwiper.css";

export interface CardType {
  id: number;
  title: string;
  text: string;
  image: any;
}

interface CardSwiperProps {
  onScroll: (index: number) => void;
  cardsArray: CardType[];
  actualIndex: number;
  cardImageHeight?: number;
  cardImageWidth?: number;
}

interface DotsContainerProps {
  array: CardType[];
  actualIndex: number;
}

const { width } = Dimensions.get("window");

export function CardSwiper({
  onScroll,
  cardsArray,
  actualIndex,
  cardImageHeight,
  cardImageWidth,
}: CardSwiperProps) {
  function onCardScroll(e: RN.NativeSyntheticEvent<RN.NativeScrollEvent>) {
    const cardIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    onScroll(cardIndex);
  }
  return (
    <>
      <FlatList
        data={cardsArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            cardInfo={item}
            cardImageHeight={cardImageHeight}
            cardImageWidth={cardImageWidth}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onCardScroll}
        scrollEventThrottle={16}
      />
      <DotsContainer array={cardsArray} actualIndex={actualIndex} />
    </>
  );
}

function Card({
  cardInfo,
  cardImageHeight,
  cardImageWidth,
}: {
  cardInfo: CardType;
  cardImageHeight?: number;
  cardImageWidth?: number;
}) {
  const DOTS_SECTION_HEIGHT = 50;
  const { height } = useWindowDimensions();
  return (
    <View
      style={[CardSwiperStyles.card, { height: height - DOTS_SECTION_HEIGHT }]}
    >
      <Image
        style={[
          CardSwiperStyles.image,
          {
            height: cardImageHeight ? cardImageHeight : 240,
            width: cardImageWidth ? cardImageWidth : 320,
          },
        ]}
        source={cardInfo.image}
      />
      <Text style={CardSwiperStyles.title}>{cardInfo.title}</Text>
      <Text style={CardSwiperStyles.text}>{cardInfo.text}</Text>
    </View>
  );
}

function DotsContainer({ array, actualIndex }: DotsContainerProps) {
  return (
    <View style={CardSwiperStyles.dotsContainer}>
      {array.map((_, i) => (
        <View
          key={i}
          style={[
            CardSwiperStyles.dot,
            { backgroundColor: i === actualIndex ? "#fff" : "#000" },
          ]}
        />
      ))}
    </View>
  );
}
