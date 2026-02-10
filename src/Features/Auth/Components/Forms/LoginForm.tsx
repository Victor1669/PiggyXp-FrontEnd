import { useRouter } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowModal } from "Contexts/useShowModal";

import { UserLogin } from "@Auth/Services/LoginService";
import { GetUserInfo } from "@Auth/Services/UserInfoService";

import Form from "@Components/Form/Form";
import { Fields } from "@Auth/Schemas/SchemaFields";

export default function LoginForm() {
  const router = useRouter();
  const { login, decodeUserDataToken, setFirstTimeLogged } = useAuth();
  const { setShowModal } = useShowModal();

  async function handleSubmit(data: any) {
    setShowModal(true);
    const { Email: email, Senha: password } = data;
    const { data: loginData, status: loginStatus } = await UserLogin({
      email,
      password,
    });

    if (loginStatus < 300) {
      await loginSuccess(loginData);
    }
    setShowModal(false);
  }

  async function loginSuccess(loginData: any) {
    const { message, refreshToken, token } = loginData;

    const { userId } = await decodeUserDataToken(token);

    const { data: userData, status: userDataStatus } =
      await GetUserInfo(userId);

    if (userDataStatus < 300) {
      await getUserDataSuccess({ ...userData, userId });
    }
  }

  async function getUserDataSuccess(userData: any) {
    login(userData);
    router.replace("/Content");
    await setFirstTimeLogged();
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
