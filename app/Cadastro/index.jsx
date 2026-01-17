import { View, StyleSheet } from "react-native";

import { useGoogleAuth } from "../../src/Features/Auth/Hooks/useGoogleAuth";
import { useFacebookAuth } from "../../src/Features/Auth/Hooks/useFacebookAuth";

import CadastroForm from "../../src/Features/Auth/Components/CadastroForm";
import AlternateSignins from "../../src/Features/Auth/Components/AlternateSignins";

import { GlobalColors } from "../../assets/Colors";

export default function Cadastro() {
  const { signIn: googleSignIn, user: googleUser } = useGoogleAuth();
  const { signIn: facebookSignIn, user: facebookUser } = useFacebookAuth();

  async function handleGoogleSignIn() {
    await googleSignIn();
  }

  async function handleFabebookSignIn() {
    await facebookSignIn();
  }
  return (
    <View style={CadastroStyles.container}>
      <CadastroForm facebookUser={facebookUser} googleUser={googleUser} />
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
