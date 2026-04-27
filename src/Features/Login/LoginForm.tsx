import { router } from "expo-router";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useStatus } from "Contexts/StatusContext";

import { GetUserInfo } from "@Auth/Services/UserInfoService";
import { UserLogin } from "@Auth/Services/LoginService";

import Form from "@Auth/Components/Form/Form";
import { Fields } from "@Auth/Schemas/SchemaFields";

import { PreviewUserInfo } from "Features/Preview/PreviewUser";

export default function LoginForm() {
  const { refreshToken, userToken, login } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(data: any) {
    if (env.buildProfile === "preview") {
      await login(PreviewUserInfo);
      router.push("/Content");
      return;
    }

    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const { Email: email, Senha: password } = data;
    const { data: loginData, status: loginStatus } = await UserLogin({
      email,
      password,
    });

    if (loginStatus < 300) {
      await loginSuccess(loginData);
    }

    hideStatus();
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
