import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { BIG_FONT_STYLE },
} = screenValues();

import { HomeImages } from "../Assets/HomeImages";

const IMAGE_SIZE = 55;

const HomeHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 70,
  },
  userProfileImageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  userProfileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 50,
  },
  livesImageContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  livesImage: {
    width: 45,
    height: 35,
    marginVertical: "auto",
  },
});
const {
  container,
  userProfileImage,
  userProfileImageContainer,
  livesImage,
  livesImageContainer,
} = HomeHeaderStyles;

export default function HomeHeader() {
  const { user } = useAuth();
  return (
    <View style={container}>
      <Link style={userProfileImageContainer} href="/Content/Profile">
        <Image style={userProfileImage} source={{ uri: user.user_img }} />
      </Link>
      <View style={livesImageContainer}>
        <Text
          style={{
            color: "#F24822",
            fontSize: BIG_FONT_STYLE,
          }}
        >
          5
        </Text>
        <Image style={livesImage} source={HomeImages.lives} />
      </View>
    </View>
  );
}
