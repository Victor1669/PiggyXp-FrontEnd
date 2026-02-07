import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import { UserLogin } from "@Auth/use-cases/Login/LoginService";
import { GetUserInfo } from "@Auth/Services/UserServices";
import { toastMessage } from "@Services/toast";

import Form from "@Components/Form/Form";
import { LoginValidation } from "@Auth/use-cases/Login/LoginSchema";
import { LoginFormStyles } from "./LoginForm.css";

import { GlobalFontColors } from "@Colors";

export default function LoginForm() {
  const router = useRouter();
  const { login, decodeUserDataToken } = useAuth();

  async function handleSubmit(data: any) {
    const { Email: email, Senha: password } = data;
    const { data: loginData, status: loginStatus } = await UserLogin({
      email,
      password,
    });

    if (loginStatus < 300) {
      loginSuccess(loginData);
    } else {
      toastMessage({ type: "error", text: loginData?.error ?? loginData });
    }
  }

  async function loginSuccess(loginData: any) {
    const { message, refreshToken, token } = loginData;

    const { userId } = decodeUserDataToken(token);

    console.log(message);

    const { data: userData, status: userDataStatus } =
      await GetUserInfo(userId);

    if (userDataStatus < 300) {
      getUserDataSuccess(loginData, { ...userData, userId });
    } else toastMessage({ type: "error", text: userData.message });
  }

  function getUserDataSuccess(loginData: any, userData: any) {
    console.log(userData);
    login(userData);
    router.replace("/Content");
    toastMessage({ type: "success", text: loginData.message });
  }

  return (
    <View>
      <Text style={LoginFormStyles.title}>Login</Text>
      <Form
        formFields={[
          {
            nomeCampo: "Email",
            validation: LoginValidation.Email,
            inputAutoComplete: "email",
          },
          {
            nomeCampo: "Senha",
            validation: LoginValidation.Senha,
            inputAutoComplete: "password",
          },
        ]}
        onSubmit={handleSubmit}
        buttonText="Entrar"
        forgotPasswordText="Esqueceu a senha?"
        forgotPasswordHREF="/EsqueceuSenha"
      />
      <NaoTemContaText />
      <Link
        style={{ color: GlobalFontColors.Dark, fontSize: 40, margin: 25 }}
        href="/Content"
      >
        Conteúdo
      </Link>
    </View>
  );
}
function NaoTemContaText() {
  return (
    <View style={LoginFormStyles.naoTemConta}>
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
