import {
  Image,
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { RandomMessageStyles } from "../Styles/RandomMessage.css";

import { ProfileImages } from "@Assets/ProfileImages";

const { randomMessageContainer, characterImage, dialogContainer, dialogText } =
  RandomMessageStyles;

export default function RandomMessage() {
  const { width, height } = useWindowDimensions();
  return (
    <View style={[randomMessageContainer, { height: height * 0.164 }]}>
      <Image
        style={[characterImage, { width: width * 0.4 }]}
        source={ProfileImages.working}
      />
      <ImageBackground style={dialogContainer} source={ProfileImages.dialog}>
        <Text style={dialogText}>Constancia é a chave pra o sucesso</Text>
      </ImageBackground>
    </View>
  );
}
