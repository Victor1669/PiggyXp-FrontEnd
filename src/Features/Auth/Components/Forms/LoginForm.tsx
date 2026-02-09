import { useRouter } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import { UserLogin } from "@Auth/Services/LoginService";
import { GetUserInfo } from "@Auth/Services/UserInfoService";
import { toastMessage } from "Utils/toast";

import Form from "@Components/Form/Form";
import { Fields } from "@Auth/Schemas/SchemaFields";

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

    const { userId } = await decodeUserDataToken(token);

    const { data: userData, status: userDataStatus } =
      await GetUserInfo(userId);

    if (userDataStatus < 300) {
      getUserDataSuccess({ ...userData, userId });
    }
  }

  function getUserDataSuccess(userData: any) {
    login(userData);
    router.replace("/Content");
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
