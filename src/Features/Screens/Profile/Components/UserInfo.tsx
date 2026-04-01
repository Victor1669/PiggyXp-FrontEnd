//#region Importações
import { useEffect, useState } from "react";
import { Image, View, Pressable, ImageBackground } from "react-native";
import { usePathname, router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { UserInfoStyles } from "../Styles/UserInfo.css";
const { userInfoBackground, profilePicture, profileConfig, profileEmail } =
  UserInfoStyles;

import { GlobalImages } from "@Assets/GlobalImages";
import { ProfileImages } from "@Assets/ProfileImages";
const { userInfoDetail, config } = ProfileImages;
//#endregion

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
        <Image style={profilePicture} source={imageSrc} />
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
