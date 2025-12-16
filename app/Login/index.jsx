import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import LoginForm from "../../src/Features/Auth/Components/LoginForm";

export default function LoginContainer() {
  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Login</Text>
      <Link style={LoginStyles.links} href="/Cadastro">
        Cadastro
      </Link>
      <Link style={LoginStyles.links} href="/Content">
        Entrar
      </Link>
      <LoginForm />
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
  },
  links: {
    fontSize: 30,
  },
});
