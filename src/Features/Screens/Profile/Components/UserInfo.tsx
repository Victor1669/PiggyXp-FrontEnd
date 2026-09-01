import { useEffect, useState } from "react";
import {
  Image,
  View,
  Pressable,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { usePathname, router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { ProfileImages } from "@Assets/ProfileImages";
const { userInfoDetail, config } = ProfileImages;

const USER_PROFILE_PICTURE_SIZE = Dimensions.get("screen").width / 4.5;

export default function UserInfo() {
  const pathName = usePathname();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { user } = useAuth();
  const { name, email, user_img } = user;

  const imageSrc = user_img
    ? {
        uri: user_img,
      }
    : undefined;

  useEffect(() => {
    if (pathName !== "/Content/Profile") {
      setBtnDisabled(false);
    }
  }, [pathName]);

  return (
    <View style={{ width: "90%" }}>
      <ImageBackground style={userInfoBackground} source={userInfoDetail}>
        <Image style={profilePicture as any} source={imageSrc} />
        <Pressable
          disabled={btnDisabled}
          style={profileConfig}
          onPress={() => {
            setBtnDisabled(true);
            router.push("/Content/Profile/Config");
          }}
        >
          <Picture
            style={{ width: 25, height: 25 }}
            folder="profile"
            source={config}
          />
        </Pressable>
        <Paragraph
          textAlign="left"
          color="lightModeFont"
          fontSize="title"
          style={{ marginTop: 40 }}
        >
          {name}
        </Paragraph>
        <Paragraph color="lightModeFont" textAlign="left" style={profileEmail}>
          {email}
        </Paragraph>
      </ImageBackground>
    </View>
  );
}

const { profileConfig, profileEmail, profilePicture, userInfoBackground } =
  StyleSheet.create({
    userInfoBackground: {
      padding: 15,
      paddingTop: 20,
      marginTop: 20,
    },
    profilePicture: {
      width: USER_PROFILE_PICTURE_SIZE,
      height: USER_PROFILE_PICTURE_SIZE,
      backgroundColor: "#e7e7e7",
      borderRadius: USER_PROFILE_PICTURE_SIZE / 2,
      borderWidth: 4,
      borderColor: "#8E8E8E",
      position: "absolute",
      left: 15,
      top: -(USER_PROFILE_PICTURE_SIZE / 2),
    },
    profileConfig: {
      margin: 15,
      position: "absolute",
      right: 0,
    },
    profileEmail: {
      fontSize: 16,
    },
  });
