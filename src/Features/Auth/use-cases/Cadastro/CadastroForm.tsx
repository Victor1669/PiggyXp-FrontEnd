import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "../../Contexts/useAuth";
import { UserRegister } from "./CadastroService";
import { toastMessage } from "../../../../Services/toast";

import Form from "../../../../Components/Form/Form";
import { CadastroSchema } from "./CadastroSchema";
import { CadastroFormStyles } from "./CadastroForm.css";

import { GlobalFontColors } from "../../../../../assets/Colors";

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

    console.log(registerData, registerStatus);

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
      <Text style={CadastroFormStyles.title}>Criar Conta</Text>
      <Form
        formFields={[
          { nomeCampo: "Nome", validation: CadastroSchema.Nome },
          { nomeCampo: "Email", validation: CadastroSchema.Email },
          { nomeCampo: "Senha", validation: CadastroSchema.Senha },
        ]}
        defaultValues={{
          Nome: "Victor",
          Email: "victorfernandes1669@gmail.com",
          Senha: "@Ar09112001",
        }}
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
