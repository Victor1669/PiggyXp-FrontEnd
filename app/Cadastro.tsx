import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "../src/Features/Auth/Contexts/useAuth";
import { useNativeGoogleAuth } from "../src/Features/Auth/Hooks/useNativeGoogleAuth";
import { useFacebookAuth } from "../src/Features/Auth/Hooks/useFacebookAuth";

import CadastroForm from "../src/Features/Auth/use-cases/Cadastro/CadastroForm";
import AlternateSignins from "../src/Features/Auth/Components/AlternateSignins";

import { GlobalColors } from "../assets/Colors";

export default function Cadastro() {
  const router = useRouter();
  const { login } = useAuth();
  const { signIn: googleSignIn, user: googleUser } = useNativeGoogleAuth();
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
    if (Object.keys(googleUser).length) {
      login(googleUser);
      router.replace("/Content");
    }
  }, [googleUser, facebookUser]);

  return (
    <View style={CadastroStyles.container}>
      <CadastroForm />
      <AlternateSignins
        text="Criar conta com"
        onGoogleClick={handleGoogleSignIn}
        onFacebookClick={handleFabebookSignIn}
      />
    </View>
  );
}
const CadastroStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    paddingVertical: 100,
  },
});
