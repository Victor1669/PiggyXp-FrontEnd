import { router } from "expo-router";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { UserRegister } from "@Auth/Services/CadastroService";
import { toastMessage } from "Utils/toast";

import Form from "@Auth/Components/Form/Form";

import { Fields } from "@Auth/Schemas/SchemaFields";

import { PreviewUserInfo } from "Features/Preview/PreviewUser";

export default function CadastroForm() {
  const { temporaryImageToken, login } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(formData: {
    Nome: string;
    Email: string;
    Senha: string;
  }) {
    if (env.buildProfile === "preview") {
      login(PreviewUserInfo);
      router.push("/Cadastro/DefinePhoto");
      return;
    }
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const { Nome: name, Email: email, Senha: password } = formData;

    const { data: registerData, status: registerStatus } = await UserRegister({
      name: name.trim(),
      email,
      password,
    });

    if (registerStatus < 300) {
      registerSuccess(registerData);
    }
    setShowLoadingScreen(false);
  }

  async function registerSuccess(registerData: any) {
    const { token } = registerData;
    await temporaryImageToken.set(token);
    router.replace("/Cadastro/DefinePhoto");
    toastMessage({ type: "success", text: registerData.message });
  }

  return (
    <Form
      formFields={[Fields.Nome, Fields.Email, Fields.Senha]}
      onSubmit={handleSubmit}
      buttonText="Criar Conta"
      validationEnabled={env.buildProfile !== "preview"}
    />
  );
}
