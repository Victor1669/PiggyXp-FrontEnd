import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";

import { screenValues } from "Config/screenValues";

import { STORAGE_KEYS, setStorageItem } from "Utils/securestore";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useStatus } from "Contexts/StatusContext";

import { loginApi, type LoginApiResponse } from "@Services/loginApi";
import { getUserInfoApi } from "@Services/userInfoServices";

import Form from "@Auth/Components/Form/Form";
import { Fields } from "@Auth/Schemas/SchemaFields";

import { PreviewUserInfo } from "Features/Preview/PreviewUser";

export default function LoginForm() {
  const { login } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();

  const { isPreviewBuild } = screenValues();

  async function handleSubmit(data: any) {
    if (isPreviewBuild) {
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
    const { data: loginData, status: loginStatus } = await loginApi({
      email,
      password,
    });

    if (loginStatus < 300) {
      await loginSuccess(loginData);
    }

    hideStatus();
  }

  async function loginSuccess(loginData: LoginApiResponse) {
    const { refreshToken: rfValue, token } = loginData;

    await Promise.all([
      setStorageItem(STORAGE_KEYS.refreshToken, rfValue),
      setStorageItem(STORAGE_KEYS.userToken, token),
    ]);

    const { userId } = jwtDecode<{ userId: string }>(token);

    const { data: user, status } = await getUserInfoApi(userId);

    if (status < 300) {
      router.replace(
        user.first_login ? "/Login/DifficultySelector" : "/Content",
      );
    } else {
      router.replace("/Login");
    }
  }

  return (
    <Form
      formFields={[Fields.Email, Fields.Senha]}
      onSubmit={handleSubmit}
      buttonText="Entrar"
      forgotPasswordText="Esqueceu a senha?"
      forgotPasswordHREF="/SendRecoveryEmail"
      validationEnabled={!isPreviewBuild}
    />
  );
}
