import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { useNativeGoogleAuth } from "../../src/Features/Auth/Hooks/useNativeGoogleAuth";
import { useFacebookAuth } from "../../src/Features/Auth/Hooks/useFacebookAuth";
import { useAuth } from "../../src/Features/Auth/Contexts/useAuth";

import LoginForm from "../../src/Features/Auth/use-cases/Login/LoginForm";
import AlternateSignins from "../../src/Features/Auth/Components/AlternateSignins";

import { GlobalColors } from "../../assets/Colors";

export default function Login() {
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
    <View style={LoginStyles.container}>
      <LoginForm />
      <AlternateSignins
        text="Logar com"
        onFacebookClick={handleFacebookLogin}
        onGoogleClick={handleGoogleLogin}
      />
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    paddingVertical: 100,
  },
});
