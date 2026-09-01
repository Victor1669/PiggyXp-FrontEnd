import { StyleSheet, useWindowDimensions, View } from "react-native";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

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
    <View style={[card, { height: height - DOTS_SECTION_HEIGHT, width }]}>
      <Picture
        folder={imgFolder}
        style={[
          image,
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
      <Paragraph color={fontColor} fontSize="small" style={text}>
        {cardInfo.text}
      </Paragraph>
    </View>
  );
}

const { card, image, text } = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 20,
  },
  text: {
    width: "70%",
    height: 90,
    marginVertical: 40,
    paddingHorizontal: 20,
  },
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
