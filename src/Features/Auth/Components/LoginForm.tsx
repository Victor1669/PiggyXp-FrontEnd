import { useEffect } from "react";
import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useGoogleAuth } from "../Hooks/useGoogleAuth";
import { useFacebookAuth } from "../Hooks/useFacebookAuth";
import { useAuth } from "../Contexts/useAuth";

import Form from "../../../Components/Form/Form";
import AlternateSignins from "./AlternateSignins";
import { LoginSchema } from "../Validations/LoginSchema";
import { LoginFormStyles } from "../Styles/LoginForm.css";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { signIn: googleSignIn, user: googleUser } = useGoogleAuth();
  const { signIn: facebookSignIn, user: facebookUser } = useFacebookAuth();

  async function handleSubmit(data: any) {
    console.log(data);
  }

  async function handleGoogleLogin() {
    await googleSignIn();
  }
  async function handleFacebookLogin() {
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

      <AlternateSignins
        text="Logar com"
        onFacebookClick={handleFacebookLogin}
        onGoogleClick={handleGoogleLogin}
        bottom={-340}
      />
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
