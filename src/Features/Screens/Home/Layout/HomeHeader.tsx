//#region Importações
import { View, TouchableWithoutFeedback, Image } from "react-native";
import { Link } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowSheet } from "../Contexts/useShowSheet";

import { useValidateLives } from "../Hooks/useValidateLives";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

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

  const { isLoading } = useValidateLives();

  return (
    <TouchableWithoutFeedback onPress={() => setShowSheet(false)}>
      <View style={container}>
        <Link style={userProfileImageContainer} href="/Content/Profile">
          <Image style={userProfileImage} source={{ uri: user.user_img }} />
        </Link>
        <View style={livesImageContainer}>
          <Paragraph color="#F24822" fontSize="big">
            {isLoading ? "..." : (user.lives ?? 5)}
          </Paragraph>
          <Picture folder="home" style={livesImage} source={HomeImages.lives} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
