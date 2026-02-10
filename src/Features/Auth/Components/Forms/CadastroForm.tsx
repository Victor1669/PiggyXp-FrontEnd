import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowModal } from "Contexts/useShowModal";

import { UserRegister } from "@Auth/Services/CadastroService";
import { toastMessage } from "Utils/toast";

import Form from "@Components/Form/Form";

import { Fields } from "@Auth/Schemas/SchemaFields";

export default function CadastroForm() {
  const { updateTemporaryImageToken } = useAuth();
  const { setShowModal } = useShowModal();

  async function handleSubmit(formData: {
    Nome: string;
    Email: string;
    Senha: string;
  }) {
    setShowModal(true);
    const { Nome: name, Email: email, Senha: password } = formData;

    const { data: registerData, status: registerStatus } = await UserRegister({
      name: name.trim(),
      email,
      password,
    });

    console.log(registerData);
    console.log(registerStatus);
    console.log(JSON.stringify(registerData, null, 2));

    if (registerStatus < 300) {
      registerSuccess(registerData);
    } else if (registerData.message === "Email já cadastrado!") {
      toastMessage({
        type: "info",
        text: "Email já está cadastrado!",
      });
      router.push("/Login");
    }
    setShowModal(false);
  }

  function registerSuccess(registerData: any) {
    const { token } = registerData;
    updateTemporaryImageToken(token);
    router.replace("/DefinePhoto");
    toastMessage({ type: "success", text: registerData.message });
  }

  return (
    <Form
      formFields={[Fields.Nome, Fields.Email, Fields.Senha]}
      onSubmit={handleSubmit}
      buttonText="Criar Conta"
    />
  );
}
