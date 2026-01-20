import { useEffect } from "react";
import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "../../Contexts/useAuth";

import { UserLogin } from "./LoginService";
import { GetUserInfo } from "../../Services/UserServices";
import { toastMessage } from "../../../../Services/toast";

import Form from "../../../../Components/Form/Form";
import { LoginSchema } from "./LoginSchema";
import { LoginFormStyles } from "./LoginForm.css";

interface LoginFormProps {
  googleUser: object;
  facebookUser: object;
}

export default function LoginForm({
  googleUser,
  facebookUser,
}: LoginFormProps) {
  const router = useRouter();
  const { login, decodeUserDataToken } = useAuth();

  async function handleSubmit(data: any) {
    const { Email: email, Senha: password } = data;
    const { data: loginData, status: loginStatus } = await UserLogin({
      email,
      password,
    });

    if (loginStatus < 300) {
      toastMessage({ type: "success", text: loginData.message });
      const { message, refreshToken, token } = loginData;

      const { userId } = decodeUserDataToken(token);

      const { data: userData, status: userDataStatus } =
        await GetUserInfo(userId);

      if (userDataStatus < 300) {
        login(userData);

        router.replace("/Content");
      } else toastMessage({ type: "error", text: userData.message });
    } else {
      toastMessage({ type: "error", text: loginData?.error ?? loginData });
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
