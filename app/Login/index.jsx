import { View, StyleSheet } from "react-native";

import { useGoogleAuth } from "../../src/Features/Auth/Hooks/useGoogleAuth";
import { useFacebookAuth } from "../../src/Features/Auth/Hooks/useFacebookAuth";

import LoginForm from "../../src/Features/Auth/Components/LoginForm";
import AlternateSignins from "../../src/Features/Auth/Components/AlternateSignins";

import { GlobalColors } from "../../assets/Colors";

export default function LoginContainer() {
  const { signIn: googleSignIn, user: googleUser } = useGoogleAuth();
  const { signIn: facebookSignIn, user: facebookUser } = useFacebookAuth();

  async function handleGoogleLogin() {
    await googleSignIn();
  }
  async function handleFacebookLogin() {
    await facebookSignIn();
  }
  return (
    <View style={LoginStyles.container}>
      <LoginForm facebookUser={facebookUser} googleUser={googleUser} />
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
