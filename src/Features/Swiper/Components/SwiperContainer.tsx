import { useState } from "react";
import RN, { View, Text, Dimensions, Image, FlatList } from "react-native";
import { Link } from "expo-router";

import { SplashScreenImages } from "../Assets/Images";
import { SwiperStyles } from "../Styles/SwiperContainer.css";

const { width } = Dimensions.get("window");

// cada variável dessa é uma imagem
const { dinheiro, estudando, livros } = SplashScreenImages;

export default function SwiperContainer() {
  const slides = [
    { id: 1, text: "Slide 1", image: "Colocar variável de imagem aqui" },
    { id: 2, text: "Slide 2", image: "Colocar variável de imagem aqui" },
    { id: 3, text: "Slide 3", image: "Colocar variável de imagem aqui" },
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
              <Image source={item.image} />
              <Text style={SwiperStyles.text}>{item.text}</Text>
              {item.id === 3 && (
                <>
                  <Link href="/Login">Login</Link>
                  <Link href="/Cadastro">Cadastro</Link>
                  <Link href="/Content">Conteúdo</Link>
                </>
              )}
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        <View style={SwiperStyles.dotsContainer}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[SwiperStyles.dot, { opacity: i === index ? 1 : 0.3 }]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
