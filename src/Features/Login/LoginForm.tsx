//#region Importações
import { router } from "expo-router";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";

import { GetUserInfo } from "@Auth/Services/UserInfoService";
import { UserLogin } from "@Auth/Services/LoginService";

import Form from "@Auth/Components/Form/Form";
import { Fields } from "@Auth/Schemas/SchemaFields";

import { PreviewUserInfo } from "Features/Preview/PreviewUser";
//#endregion

export default function LoginForm() {
  const { refreshToken, userToken, login } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(data: any) {
    if (env.buildProfile === "preview") {
      await login(PreviewUserInfo);
      router.push("/Content");
      return;
    }
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const { Email: email, Senha: password } = data;
    const { data: loginData, status: loginStatus } = await UserLogin({
      email,
      password,
    });

    if (loginStatus < 300) {
      await loginSuccess(loginData);
    }
    setShowLoadingScreen(false);
  }

  async function loginSuccess(loginData: {
    message: string;
    refreshToken: string;
    token: string;
  }) {
    const { refreshToken: rfValue, token } = loginData;

    await refreshToken.set(rfValue);
    await userToken.set(token);

    const { userId } = (await userToken.decode()) as { userId: string };

    const { data: user, status } = await GetUserInfo(userId);

    if (status < 300) {
      router.replace(
        user.first_login ? "/Login/DifficultySelector" : "/Content",
      );
    } else router.replace("/Login");
  }

  return (
    <Form
      formFields={[Fields.Email, Fields.Senha]}
      onSubmit={handleSubmit}
      buttonText="Entrar"
      forgotPasswordText="Esqueceu a senha?"
      forgotPasswordHREF="/SendRecoveryEmail"
      validationEnabled={env.buildProfile !== "preview"}
    />
  );
}
