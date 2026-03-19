//#region Importações
import { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useNativeGoogleAuth } from "@Auth/Hooks/useNativeGoogleAuth";
import { useFacebookAuth } from "@Auth/Hooks/useFacebookAuth";

import ImageButton from "./ImageButton";
import Paragraph from "@Components/Paragraph";

import { AuthImages } from "@Assets/AuthImages";
const {
  logos: { google, facebook },
} = AuthImages;
//#endregion
interface AlternateSigninsProps {
  text: string;
}

export default function AlternateSignins({ text }: AlternateSigninsProps) {
  const { login } = useAuth();
  const { signIn: googleSignIn, user: googleUser } = useNativeGoogleAuth();
  const { signIn: facebookSignIn, user: facebookUser } = useFacebookAuth();

  async function handleGoogleLogin() {
    await googleSignIn();
  }

  async function handleFacebookLogin() {
    await facebookSignIn();
  }

  useEffect(() => {
    if (Object.keys(facebookUser).length) {
      login(facebookUser);
      router.replace("/Content");
    }
    if (Object.keys(googleUser).length) {
      login(googleUser);
      router.replace("/Content");
    }
  }, [googleUser, facebookUser]);

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 70,
        alignItems: "center",
      }}
    >
      <Paragraph
        fontSize="small"
        style={{
          marginBottom: 20,
        }}
      >
        {text}
      </Paragraph>

      <View style={{ flexDirection: "row" }}>
        <ImageButton
          size={50}
          onPress={handleGoogleLogin}
          imageSource={google}
        />
        {env.buildProfile !== "preview" && (
          <ImageButton
            size={50}
            onPress={handleFacebookLogin}
            imageSource={facebook}
          />
        )}
      </View>
    </View>
  );
}
