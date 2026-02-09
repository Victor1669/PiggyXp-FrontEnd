import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useNativeGoogleAuth } from "@Hooks/useNativeGoogleAuth";
import { useFacebookAuth } from "@Hooks/useFacebookAuth";

import ImageButton from "./ImageButton";

import { AuthImages } from "@Assets/AuthImages";
const {
  logos: { google, facebook },
} = AuthImages;

import { GlobalFontColors } from "@Assets/Colors";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { SMALL_FONT_SIZE },
} = screenValues();

interface AlternateSigninsProps {
  text: string;
}

export default function AlternateSignins({ text }: AlternateSigninsProps) {
  const router = useRouter();
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
      <Text
        style={{
          color: GlobalFontColors.Dark,
          fontSize: SMALL_FONT_SIZE,
          marginBottom: 20,
        }}
      >
        {text}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <ImageButton
          size={50}
          onPress={handleGoogleLogin}
          imageSource={google}
        />
        <ImageButton
          size={50}
          onPress={handleFacebookLogin}
          imageSource={facebook}
        />
      </View>
    </View>
  );
}
