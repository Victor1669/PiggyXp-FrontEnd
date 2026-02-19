import { View, Text } from "react-native";
import { Link } from "expo-router";

import AlternateSignins from "@Auth/Components/Buttons/AlternateSignins";
import LoginForm from "./LoginForm";

import { LoginStyles } from "Features/Login/Login.css";
const { container, formContainer, naoTemConta } = LoginStyles;

import { GlobalFontColors } from "@Assets/Colors";

export default function LoginContainer() {
  return (
    <View style={container}>
      <View style={formContainer}>
        <LoginForm />
      </View>
      <NaoTemContaText />
      <AlternateSignins text="Logar com" />
    </View>
  );
}

function NaoTemContaText() {
  return (
    <View style={naoTemConta}>
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
