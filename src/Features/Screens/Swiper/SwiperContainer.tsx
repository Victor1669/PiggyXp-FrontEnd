import { useState } from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

import { env } from "Config/env";

import { CardType, CardSwiper } from "@Components/CardSwiper/CardSwiper";

import { SwiperStyles } from "./SwiperContainer.css";

import { SplashScreenImages } from "@Assets/SwiperImages";

const { caminhos, estudante, entendendoDinheiro } = SplashScreenImages;

const cards: CardType[] = [
  {
    id: 1,
    title: "Aprender é transformar.",
    text: "Pequenos conhecimentos geram grandes mudanças nas suas escolhas e no seu futuro.",
    image: estudante,
  },
  {
    id: 2,
    title: "Conhecimento muda escolhas.",
    text: "Quando você aprende, suas escolhas ficam mais inteligentes.",
    image: caminhos,
  },
  {
    id: 3,
    title: "Entenda o dinheiro. Controle o futuro",
    text: "Saber lidar com dinheiro hoje evita problemas amanhã.",
    image: entendendoDinheiro,
  },
];

export default function SwiperContainer() {
  const [index, setIndex] = useState(0);

  function onScroll(slide: number) {
    setIndex(slide);
  }

  return (
    <View style={SwiperStyles.container}>
      <View style={SwiperStyles.content}>
        <CardSwiper
          testId="SwiperContainer"
          imgFolder="start"
          cardsArray={cards}
          onScroll={onScroll}
          actualIndex={index}
        />
        <Link
          style={SwiperStyles.skipLink}
          href="/Welcome"
          replace={env.buildProfile !== "preview"}
        >
          <Text testID="btn-pular">Pular</Text>
        </Link>
      </View>
    </View>
  );
}
