import { Text, View } from "react-native";
import { Link } from "expo-router";

import CadastroForm from "../Forms/CadastroForm";
import AlternateSignins from "@Auth/Components/Buttons/AlternateSignins";

import { CadastroStyles } from "@Styles/Cadastro.css";
const { container, formContainer, jaTemConta } = CadastroStyles;

import { GlobalFontColors } from "@Assets/Colors";

export default function CadastroContainer() {
  return (
    <View style={container}>
      <View style={formContainer}>
        <CadastroForm />
        <JaTemContaText />
      </View>
      <AlternateSignins text="Criar conta com" />
    </View>
  );
}
function JaTemContaText() {
  return (
    <View style={jaTemConta}>
      <Text style={{ color: GlobalFontColors.Dark }}>Já tem uma conta? </Text>
      <Link
        href="/Login"
        style={{
          color: GlobalFontColors.Dark,
          textDecorationLine: "underline",
        }}
      >
        Logar-se
      </Link>
    </View>
  );
}
