import { useEffect } from "react";
import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "../Contexts/useAuth";
import { UserLogin } from "../Services/UserServices";

import Form from "../../../Components/Form/Form";
import { LoginSchema } from "../Validations/LoginSchema";
import { LoginFormStyles } from "../Styles/LoginForm.css";

interface LoginFormProps {
  googleUser: object;
  facebookUser: object;
}

export default function LoginForm({
  googleUser,
  facebookUser,
}: LoginFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(userData: any) {
    const { Email: email, Senha: password } = userData;
    const { data, status } = await UserLogin({ email, password });

    if (status < 300) {
      /**
       * TASK: Adicionar feedback do toastify
       */
      router.replace("/Content");
      console.log(data);
    }
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
        defaultValues={{
          Email: "victorfernandes1669@gmail.com",
          Senha: "@Ar09112001",
        }}
        onSubmit={handleSubmit}
        buttonText="Entrar"
        forgotPasswordText="Esqueceu a senha?"
        forgotPasswordHREF="/EsqueceuSenha"
      />
      <NaoTemContaText />
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
