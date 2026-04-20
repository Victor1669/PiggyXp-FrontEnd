import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  View,
} from "react-native";

import { getByPosition } from "../Helpers/getByPosition";

import Paragraph from "Components/Paragraph";

import { RankingPodiumUserStyles } from "../Styles/RankingPodiumUser.css";

import { RankingAssets } from "../Assets/RankingAssets";
const {
  positions: { ouro, prata, bronze },
} = RankingAssets;

export default function RankingPodiumUser({
  userImg,
  name,
  xp,
  position,
}: {
  userImg: ImageSourcePropType | undefined;
  name: string;
  xp: number;
  position: 1 | 2 | 3;
}) {
  const imageContainerSource = getByPosition(ouro, prata, bronze, position);

  return (
    <View style={RankingPodiumUserStyles.container}>
      <ImageBackground
        style={RankingPodiumUserStyles.imageBackground}
        source={imageContainerSource}
      >
        <Image style={RankingPodiumUserStyles.userImage} source={userImg} />
      </ImageBackground>

      <View>
        <Paragraph numberOfLines={1}>{name}</Paragraph>
        <Paragraph fontSize="verySmall">{xp} xp</Paragraph>
      </View>
    </View>
  );
}
