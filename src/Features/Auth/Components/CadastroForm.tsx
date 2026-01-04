import { useEffect } from "react";
import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useGoogleAuth } from "../Hooks/useGoogleAuth";
import { useFacebookAuth } from "../Hooks/useFacebookAuth";
import { useAuth } from "../Contexts/useAuth";

import Form from "../../../Components/Form/Form";
import AlternateSignins from "./AlternateSignins";
import { CadastroSchema } from "../Validations/CadastroSchema";
import { CadastroFormStyles } from "../Styles/CadastroForm.css";

export default function CadastroForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { signIn: googleSignIn, user: googleUser } = useGoogleAuth();
  const { signIn: facebookSignIn, user: facebookUser } = useFacebookAuth();

  async function handleSubmit(data: any) {
    console.log(data);
  }

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
    if (Object.keys(googleUser).length) login(googleUser);
  }, [googleUser, facebookUser]);

  return (
    <View>
      <Text style={CadastroFormStyles.title}>Criar Conta</Text>
      <Form
        formFields={[
          { nomeCampo: "Nome", validation: CadastroSchema.Nome },
          { nomeCampo: "Email", validation: CadastroSchema.Email },
          { nomeCampo: "Senha", validation: CadastroSchema.Senha },
        ]}
        onSubmit={handleSubmit}
        buttonText="Entrar"
        forgotPasswordText="Esqueceu a senha?"
        forgotPasswordHREF="/EsqueceuSenha"
      />
      <JaTemContaText />
      <AlternateSignins
        onGoogleClick={handleGoogleSignIn}
        onFacebookClick={handleFabebookSignIn}
        bottom={-235}
      />
    </View>
  );
}
function JaTemContaText() {
  return (
    <View style={CadastroFormStyles.jaTemConta}>
      <Text style={{ color: "#fff" }}>Já tem uma conta? </Text>
      <Link
        href="/Login"
        style={{ color: "#fff", textDecorationLine: "underline" }}
      >
        Logar-se
      </Link>
    </View>
  );
}
