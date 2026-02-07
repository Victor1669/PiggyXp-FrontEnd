import { Image, ImageBackground, Text, View } from "react-native";

import { RandomMessageStyles } from "./RandomMessage.css";

import { ProfileImages } from "../Assets/ProfileImages";

const { randomMessageContainer, characterImage, dialogContainer, dialogText } =
  RandomMessageStyles;

export default function RandomMessage() {
  return (
    <View style={randomMessageContainer}>
      <Image style={characterImage} source={ProfileImages.working} />
      <ImageBackground style={dialogContainer} source={ProfileImages.dialog}>
        <Text style={dialogText}>Constancia é a chave pra o sucesso</Text>
      </ImageBackground>
    </View>
  );
}
