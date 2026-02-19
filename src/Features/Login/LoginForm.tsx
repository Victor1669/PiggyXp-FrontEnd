import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";

import { UserLogin } from "@Auth/Services/LoginService";

import Form from "@Auth/Components/Form/Form";
import { Fields } from "@Auth/Schemas/SchemaFields";

export default function LoginForm() {
  const { userToken, firstTimeLogged, refreshToken } = useAuth();
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

    await userToken.set(token);
    await refreshToken.set(rfValue);

    const isFirstTimeLogged = await firstTimeLogged.get();
    router.replace(
      isFirstTimeLogged === "true" ? "/DifficultySelector" : "/Content",
    );
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
