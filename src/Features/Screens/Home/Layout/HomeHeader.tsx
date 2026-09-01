import {
  View,
  TouchableWithoutFeedback,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Link } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowSheet } from "../Contexts/useShowSheet";

import { useValidateLives } from "../Hooks/useValidateLives";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { HomeImages } from "../Assets/HomeImages";

export default function HomeHeader() {
  const { user } = useAuth();
  const { setShowSheet } = useShowSheet();

  const { isLoading } = useValidateLives();

  return (
    <TouchableWithoutFeedback onPress={() => setShowSheet(false)}>
      <View style={container}>
        <Link style={userProfileImageContainer} href="/Content/Profile">
          <Image
            style={userProfileImage as any}
            source={{ uri: user.user_img }}
          />
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

const IMAGE_SIZE = 55;

const {
  container,
  livesImage,
  livesImageContainer,
  userProfileImage,
  userProfileImageContainer,
} = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: (StatusBar.currentHeight ?? 50) + 10,
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
