import { Image, View, Text, Pressable, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "@UseAuth";

import { UserInfoStyles } from "./UserInfo.css";
const {
  userInfoContainer,
  userInfoBackground,
  profilePicture,
  profileConfig,
  profileName,
  profileEmail,
} = UserInfoStyles;

import { GlobalImages } from "@Assets/GlobalImages";
import { ProfileImages } from "@Assets/ProfileImages";
const { userInfoDetail, config } = ProfileImages;

export default function UserInfo() {
  const router = useRouter();
  const { user } = useAuth();

  const { name, email, user_img } = user;

  const imageSrc = user_img
    ? {
        uri: user_img,
      }
    : GlobalImages.porco;

  return (
    <View style={userInfoContainer}>
      <ImageBackground style={userInfoBackground} source={userInfoDetail}>
        <Image style={profilePicture} source={imageSrc} />
        <Pressable
          style={profileConfig}
          onPress={() => router.push("/ProfileConfig")}
        >
          <Image source={config} />
        </Pressable>
        <Text style={profileName}>{name}</Text>
        <Text style={profileEmail}>{email}</Text>
      </ImageBackground>
    </View>
  );
}
