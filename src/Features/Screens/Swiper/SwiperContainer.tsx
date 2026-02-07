import { useState } from "react";
import RN, { View, Text, Dimensions, Image, FlatList } from "react-native";
import { Link } from "expo-router";

import { SplashScreenImages } from "@Assets/SwiperImages";
import { SwiperStyles } from "./SwiperContainer.css";

const { width } = Dimensions.get("window");

// cada variável dessa é uma imagem
const { caminhos, estudante, entendendoDinheiro } = SplashScreenImages;

interface SlideType {
  id: number;
  title: string;
  text: string;
  image: any;
}

export default function SwiperContainer() {
  const slides: SlideType[] = [
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

  const [index, setIndex] = useState(0);

  function onScroll(e: RN.NativeSyntheticEvent<RN.NativeScrollEvent>) {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(slide);
  }

  return (
    <View style={SwiperStyles.container}>
      <View style={SwiperStyles.content}>
        <FlatList
          data={slides}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={SwiperStyles.slide}>
              <Image style={SwiperStyles.image} source={item.image} />
              <Text style={SwiperStyles.title}>{item.title}</Text>
              <Text style={SwiperStyles.text}>{item.text}</Text>
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
        <DotsContainer array={slides} index={index} />
        <Link style={SwiperStyles.skipLink} href="/Welcome" replace>
          <Text>{"Pular > > >"}</Text>
        </Link>
      </View>
    </View>
  );
}

interface DotsContainerProps {
  array: SlideType[];
  index: number;
}

function DotsContainer({ array, index }: DotsContainerProps) {
  return (
    <View style={SwiperStyles.dotsContainer}>
      {array.map((_, i) => (
        <View
          key={i}
          style={[
            SwiperStyles.dot,
            { backgroundColor: i === index ? "#fff" : "#000" },
          ]}
        />
      ))}
    </View>
  );
}
