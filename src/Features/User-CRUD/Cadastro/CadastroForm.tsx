import { router } from "expo-router";

import { screenValues } from "Config/screenValues";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { UserRegister } from "@Auth/Services/CadastroService";
import { toastMessage } from "Utils/toast";

import Form from "@Auth/Components/Form/Form";

import { Fields } from "@Auth/Schemas/SchemaFields";

import { PreviewUserInfo } from "Features/Preview/PreviewUser";

export default function CadastroForm() {
  const { temporaryImageToken, login } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();

  const { isPreviewBuild } = screenValues();

  async function handleSubmit(formData: {
    Nome: string;
    Email: string;
    Senha: string;
  }) {
    if (isPreviewBuild) {
      login(PreviewUserInfo);
      router.push("/Cadastro/DefinePhoto");
      return;
    }

    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const { Nome: name, Email: email, Senha: password } = formData;

    const { data: registerData, status: registerStatus } = await UserRegister({
      name: name.trim(),
      email,
      password,
    });

    if (registerStatus < 300) {
      registerSuccess(registerData);
    }

    hideStatus();
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
      validationEnabled={!isPreviewBuild}
    />
  );
}
