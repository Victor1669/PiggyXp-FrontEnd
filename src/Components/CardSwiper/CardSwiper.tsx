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
  fontColor?: string;
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
  fontColor = "#000",
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
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onCardScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Card
            cardInfo={item}
            cardImageHeight={cardImageHeight}
            cardImageWidth={cardImageWidth}
            fontColor={fontColor}
          />
        )}
      />
      <DotsContainer array={cardsArray} actualIndex={actualIndex} />
    </>
  );
}

function Card({
  cardInfo,
  cardImageHeight,
  cardImageWidth,
  fontColor = "#000",
}: {
  cardInfo: CardType;
  cardImageHeight?: number;
  cardImageWidth?: number;
  fontColor?: string;
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
      <Text style={[CardSwiperStyles.title, { color: fontColor }]}>
        {cardInfo.title}
      </Text>
      <Text style={[CardSwiperStyles.text, { color: fontColor }]}>
        {cardInfo.text}
      </Text>
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
