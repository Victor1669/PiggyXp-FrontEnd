import { Image, View } from "react-native";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import Paragraph from "Components/Paragraph";

import { YourUserOutOfRankingStyles } from "../Styles/YourUserOutOfRanking.css";
const {
  container,
  imageContainer,
  numberXp,
  numberXpContainer,
  positionNumber,
  textContainer,
  userImage,
  userName,
  xpText,
} = YourUserOutOfRankingStyles;

export default function YourUserOutOfRanking() {
  const { user } = useAuth();

  const { name, xp, user_img } = user;

  return (
    <View style={container}>
      <View style={imageContainer}>
        <Paragraph
          fontSize="bigger"
          fontWeight={"bold"}
          color="#000"
          style={positionNumber}
        >
          ?
        </Paragraph>
        <Image style={userImage} source={{ uri: user_img }} />
      </View>
      <View style={textContainer}>
        <Paragraph
          style={userName}
          fontWeight={"bold"}
          color="#000"
          numberOfLines={1}
        >
          {name}
        </Paragraph>
        <View style={numberXpContainer}>
          <Paragraph color="lightModeFont" style={numberXp}>
            {xp}
          </Paragraph>
        </View>
        <Paragraph style={xpText} fontWeight={"bold"} color="#000">
          XP
        </Paragraph>
      </View>
    </View>
  );
}
