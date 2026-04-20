import { Image, View } from "react-native";

import Paragraph from "Components/Paragraph";

import { RankingUserStyles } from "../Styles/RankingUser.css";
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
} = RankingUserStyles;

export default function RankingUser({
  user_img,
  name,
  xp,
  position,
}: {
  user_img: any;
  name: string;
  xp: number;
  position: number;
}) {
  return (
    <View style={container}>
      <View style={imageContainer}>
        <Paragraph fontWeight={"bold"} fontSize={"big"} style={positionNumber}>
          {position}
        </Paragraph>
        <Image style={userImage} source={user_img} />
      </View>
      <View style={textContainer}>
        <Paragraph style={userName} fontWeight={"bold"} numberOfLines={1}>
          {name}
        </Paragraph>
        <View style={numberXpContainer}>
          <Paragraph color="lightModeFont" style={numberXp}>
            {xp}
          </Paragraph>
        </View>
        <Paragraph style={xpText} fontWeight={"bold"}>
          XP
        </Paragraph>
      </View>
    </View>
  );
}
