import { useWindowDimensions, View } from "react-native";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { CardSwiperStyles } from "./CardSwiper.css";

import { CardType } from "./CardType";

export default function Card({
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
