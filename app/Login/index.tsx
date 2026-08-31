import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

import AlternateSignins from "@Auth/Components/Buttons/AlternateSignins";
import LoginForm from "Components/Forms/LoginForm";

import { GlobalFontColors } from "@Assets/Colors";

export default function Login() {
  return (
    <>
      <View style={Styles.formContainer}>
        <LoginForm />
      </View>
      <NaoTemContaText />
      {/*<AlternateSignins text="Logar com" />*/}
    </>
  );
}

function NaoTemContaText() {
  return (
    <View style={Styles.naoTemConta}>
      <Text style={{ color: GlobalFontColors.Dark }}>Não tem uma conta? </Text>
      <Link
        href="/Cadastro"
        style={{
          color: GlobalFontColors.Dark,
          textDecorationLine: "underline",
        }}
      >
        Inscrever-se
      </Link>
    </View>
  );
}

const Styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    gap: 20,
  },
  naoTemConta: {
    flexDirection: "row",
    margin: 30,
  },
});
