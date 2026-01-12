import { Text, View } from "react-native";
import { Link } from "expo-router";

import Form from "../../../Components/Form/Form";
import AlternateSignins from "./AlternateSignins";
import { LoginSchema } from "../Validations/LoginSchema";
import { LoginFormStyles } from "../Styles/LoginForm.css";

export default function LoginForm() {
  async function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <View>
      <Text style={LoginFormStyles.title}>Entrar</Text>
      <Form
        formFields={[
          { nomeCampo: "Email", validation: LoginSchema.Email },
          { nomeCampo: "Senha", validation: LoginSchema.Senha },
        ]}
        onSubmit={handleSubmit}
        buttonText="Entrar"
        forgotPasswordText="Esqueceu a senha?"
        forgotPasswordHREF="/EsqueceuSenha"
      />
      <NaoTemContaText />

      <AlternateSignins text="Logar com" bottom={-340} />
    </View>
  );
}
function NaoTemContaText() {
  return (
    <View style={LoginFormStyles.naoTemConta}>
      <Text style={{ color: "#fff" }}>Não tem uma conta? </Text>
      <Link
        href="/Cadastro"
        style={{ color: "#fff", textDecorationLine: "underline" }}
      >
        Inscrever-se
      </Link>
    </View>
  );
}
