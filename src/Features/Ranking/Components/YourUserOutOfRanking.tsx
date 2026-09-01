import { Image, StyleSheet, View } from "react-native";

import { screenValues } from "Config/screenValues";
const { deviceWidth, TABBAR_HEIGHT } = screenValues();

import { useAuth } from "Features/Auth/Contexts/useAuth";

import Paragraph from "Components/Paragraph";

import { GlobalColors } from "Assets/Colors";

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
        <Image style={userImage as any} source={{ uri: user_img }} />
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

export const {
  container,
  imageContainer,
  numberXp,
  numberXpContainer,
  positionNumber,
  textContainer,
  userImage,
  userName,
  xpText,
} = StyleSheet.create({
  container: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: GlobalColors.formButtonBackColor,
    borderRadius: 15,
    position: "absolute",
    bottom: TABBAR_HEIGHT + 10,
  },
  imageContainer: {
    flexDirection: "row",
    width: deviceWidth * 0.3,
  },
  positionNumber: { width: 30, margin: 20 },
  userImage: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    margin: "auto",
    borderRadius: 30,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
  },
  userName: { width: deviceWidth * 0.3 },
  numberXpContainer: { flex: 1, justifyContent: "center" },
  numberXp: {
    backgroundColor: "#fff",
    width: "70%",
    margin: "auto",
    borderRadius: 5,
  },
  xpText: { marginRight: 20 },
});
