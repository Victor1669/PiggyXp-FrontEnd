import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import CadastroForm from "Components/Forms/CadastroForm";
import AlternateSignins from "Components/Buttons/alternateSignins";

import { GlobalFontColors } from "@Assets/Colors";

export default function Cadastro() {
  return (
    <>
      <View style={formContainer}>
        <CadastroForm />
        <JaTemContaText />
      </View>
      {/*<AlternateSignins text="Criar conta com" />*/}
    </>
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

const { formContainer, jaTemConta } = StyleSheet.create({
  formContainer: {
    marginTop: 40,
    gap: 20,
  },
  jaTemConta: {
    margin: 25,
    marginTop: 5,
    flexDirection: "row",
  },
});
