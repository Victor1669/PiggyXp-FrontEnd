import RN, {
  Dimensions,
  FlatList,
  useWindowDimensions,
  View,
} from "react-native";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

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
  imgFolder: string;
  cardImageHeight?: number;
  cardImageWidth?: number;
  fontColor?: string;
  testId?: string;
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
  imgFolder,
  testId,
}: CardSwiperProps) {
  function onCardScroll(e: RN.NativeSyntheticEvent<RN.NativeScrollEvent>) {
    const cardIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    onScroll(cardIndex);
  }

  return (
    <>
      <FlatList
        testID={testId}
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
            imgFolder={imgFolder}
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
  imgFolder,
}: {
  cardInfo: CardType;
  cardImageHeight?: number;
  cardImageWidth?: number;
  fontColor?: string;
  imgFolder: string;
}) {
  const DOTS_SECTION_HEIGHT = 50;
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={[
        CardSwiperStyles.card,
        { height: height - DOTS_SECTION_HEIGHT, width },
      ]}
    >
      <Picture
        folder={imgFolder}
        style={[
          CardSwiperStyles.image,
          {
            height: cardImageHeight ? cardImageHeight : 240,
            width: cardImageWidth ? cardImageWidth : 320,
          },
        ]}
        source={cardInfo.image}
      />
      <Paragraph
        color={fontColor}
        fontWeight="bold"
        fontSize="big"
        style={{ width: width * 0.8, height: 80 }}
      >
        {cardInfo.title}
      </Paragraph>
      <Paragraph
        color={fontColor}
        fontSize="small"
        style={CardSwiperStyles.text}
      >
        {cardInfo.text}
      </Paragraph>
    </View>
  );
}

function DotsContainer({ array, actualIndex }: DotsContainerProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={[CardSwiperStyles.dotsContainer, { width }]}>
      {array.map((_, i) => (
        <View
          key={i}
          testID={`dot-${i}`}
          style={[
            CardSwiperStyles.dot,
            { backgroundColor: i === actualIndex ? "#fff" : "#000" },
          ]}
        />
      ))}
    </View>
  );
}
