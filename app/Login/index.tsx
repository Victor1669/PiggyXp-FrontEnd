import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

import AlternateSignins from "Components/Buttons/alternateSignins";
import LoginForm from "Components/Forms/LoginForm";

export default function Login() {
  return (
    <>
      <View style={formContainer}>
        <LoginForm />
      </View>
      <NaoTemContaText />
      {/*<AlternateSignins text="Logar com" />*/}
    </>
  );
}

function NaoTemContaText() {
  return (
    <View style={naoTemConta}>
      <Text style={{ color: "#fff" }}>Não tem uma conta? </Text>
      <Link
        href="/Cadastro"
        style={{
          color: "#fff",
          textDecorationLine: "underline",
        }}
      >
        Inscrever-se
      </Link>
    </View>
  );
}

const { formContainer, naoTemConta } = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    gap: 20,
  },
  naoTemConta: {
    flexDirection: "row",
    margin: 30,
  },
});
