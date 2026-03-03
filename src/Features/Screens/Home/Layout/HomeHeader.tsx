//#region Importações
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { Link } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowSheet } from "../Contexts/useShowSheet";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { BIG_FONT_STYLE },
} = screenValues();

import { HomeHeaderStyles } from "../Styles/HomeHeader.css";
const {
  container,
  userProfileImage,
  userProfileImageContainer,
  livesImage,
  livesImageContainer,
} = HomeHeaderStyles;

import { HomeImages } from "../Assets/HomeImages";
//#endregion

export default function HomeHeader() {
  const { user } = useAuth();
  const { setShowSheet } = useShowSheet();
  return (
    <TouchableWithoutFeedback onPress={() => setShowSheet(false)}>
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
            {user.lives ?? 5}
          </Text>
          <Image style={livesImage} source={HomeImages.lives} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
