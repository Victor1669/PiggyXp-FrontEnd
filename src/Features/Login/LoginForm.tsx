import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";

import { UserLogin } from "@Auth/Services/LoginService";

import Form from "@Auth/Components/Form/Form";
import { Fields } from "@Auth/Schemas/SchemaFields";
import { GetUserInfo } from "@Auth/Services/UserInfoService";

export default function LoginForm() {
  const { refreshToken, userToken } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(data: any) {
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
      router.replace(user.first_login ? "/DifficultySelector" : "/Content");
    } else router.replace("/Login");
  }

  return (
    <Form
      formFields={[Fields.Email, Fields.Senha]}
      onSubmit={handleSubmit}
      buttonText="Entrar"
      forgotPasswordText="Esqueceu a senha?"
      forgotPasswordHREF="/SendRecoveryEmail"
    />
  );
}
