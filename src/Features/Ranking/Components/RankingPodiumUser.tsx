import { Image, ImageBackground, StyleSheet, View } from "react-native";

import { getByPosition } from "../../../Utils/getByPosition";

import Paragraph from "Components/Paragraph";

import { RankingAssets } from "../Assets/RankingAssets";
const {
  positions: { ouro, prata, bronze },
} = RankingAssets;

export default function RankingPodiumUser({
  userImg,
  name,
  xp,
  position,
  nivel,
}: {
  userImg: any;
  name: string;
  xp: number;
  position: 1 | 2 | 3;
  nivel: number;
}) {
  const imageContainerSource = getByPosition(ouro, prata, bronze, position);

  return (
    <View style={container}>
      <ImageBackground style={imageBackground} source={imageContainerSource}>
        <Image style={userImage as any} source={userImg} />
      </ImageBackground>

      <View>
        <Paragraph numberOfLines={1}>{name}</Paragraph>
        <Paragraph fontSize="verySmall">{xp} xp</Paragraph>
        <Paragraph fontSize="verySmall">Nível: {nivel}</Paragraph>
      </View>
    </View>
  );
}

const { container, imageBackground, userImage } = StyleSheet.create({
  container: { width: `100%` },
  imageBackground: {
    width: 110,
    height: 110,
    margin: "auto",
  },
  userImage: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    margin: "auto",
    borderRadius: 50,
  },
});
