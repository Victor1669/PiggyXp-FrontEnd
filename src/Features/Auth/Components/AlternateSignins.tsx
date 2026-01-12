import { useEffect } from "react";
import { Text, View } from "react-native";

import { useAuth } from "../Contexts/useAuth";
import { useGoogleAuth } from "../Hooks/useGoogleAuth";
import { useFacebookAuth } from "../Hooks/useFacebookAuth";

import { AuthImages } from "../Assets/AuthImages";

import ImageButton from "./ImageButton";
import { useRouter } from "expo-router";

const {
  logos: { google, facebook },
} = AuthImages;

interface AlternateSigninsTypes {
  text: string;
  bottom: number;
}

export default function AlternateSignins({
  text,
  bottom,
}: AlternateSigninsTypes) {
  const router = useRouter();
  const { login } = useAuth();
  const { signIn: googleSignIn, user: googleUser } = useGoogleAuth();
  const { signIn: facebookSignIn, user: facebookUser } = useFacebookAuth();

  async function handleGoogleSignIn() {
    await googleSignIn();
  }

  async function handleFabebookSignIn() {
    await facebookSignIn();
  }

  useEffect(() => {
    if (Object.keys(facebookUser).length) {
      login(facebookUser);
      router.replace("/Content");
    }
    if (Object.keys(googleUser).length) login(googleUser);
  }, [googleUser, facebookUser]);

  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, marginBottom: 20 }}>
        {text}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <ImageButton
          size={50}
          onPress={handleGoogleSignIn}
          imageSource={google}
        />
        <ImageButton
          size={50}
          onPress={handleFabebookSignIn}
          imageSource={facebook}
        />
      </View>
    </View>
  );
}
