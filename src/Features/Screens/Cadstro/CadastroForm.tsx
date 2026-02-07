import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import { UserRegister } from "@Auth/use-cases/Cadastro/CadastroService";
import { toastMessage } from "@Services/toast";

import Form from "@Components/Form/Form";
import { CadastroFormStyles } from "./CadastroForm.css";
import { CadastroFields } from "@Auth/use-cases/Cadastro/CadastroSchema";

import { GlobalFontColors } from "@Colors";

export default function CadastroForm() {
  const router = useRouter();
  const { updateTemporaryImageToken } = useAuth();

  async function handleSubmit(formData: any) {
    const { Nome: name, Email: email, Senha: password } = formData;

    const { data: registerData, status: registerStatus } = await UserRegister({
      name,
      email,
      password,
    });

    if (registerStatus < 300) {
      registerSuccess(registerData);
    } else
      toastMessage({
        type: "error",
        text: registerData?.error ?? registerData.message,
      });
  }

  function registerSuccess(registerData: any) {
    const { token } = registerData;
    updateTemporaryImageToken(token);
    router.replace("/DefinePhoto");
    toastMessage({ type: "success", text: registerData.message });
  }

  return (
    <View>
      <Text style={CadastroFormStyles.title}>Cadastro</Text>

      <Form
        formFields={CadastroFields}
        onSubmit={handleSubmit}
        buttonText="Criar Conta"
      />
      <JaTemContaText />
    </View>
  );
}
function JaTemContaText() {
  return (
    <View style={CadastroFormStyles.jaTemConta}>
      <Text style={{ color: GlobalFontColors.Dark }}>Já tem uma conta? </Text>
      <Link
        href="/Login"
        style={{
          color: GlobalFontColors.Dark,
          textDecorationLine: "underline",
        }}
      >
        Logar-se
      </Link>
    </View>
  );
}
