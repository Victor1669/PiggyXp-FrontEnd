import { useEffect } from "react";
import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "../../Contexts/useAuth";
import { UserRegister } from "./CadastroService";
import { toastMessage } from "../../../../Services/toast";

import Form from "../../../../Components/Form/Form";
import { CadastroSchema } from "./CadastroSchema";
import { CadastroFormStyles } from "./CadastroForm.css";

interface CadastroFormProps {
  googleUser: object;
  facebookUser: object;
}

export default function CadastroForm({
  googleUser,
  facebookUser,
}: CadastroFormProps) {
  const router = useRouter();
  const { login, updateTemporaryImageToken } = useAuth();

  async function handleSubmit(formData: any) {
    const { Nome: name, Email: email, Senha: password } = formData;

    const { data, status } = await UserRegister({ name, email, password });

    const { token } = data;

    if (status < 300) {
      toastMessage({ type: "success", text: data.message });
      updateTemporaryImageToken(token);
      router.replace("/DefinirFoto");
    } else toastMessage({ type: "error", text: data.message });
  }

  useEffect(() => {
    if (Object.keys(facebookUser).length) {
      login(facebookUser);
      router.replace("/Content");
    }
    if (Object.keys(googleUser).length) login(googleUser);
  }, [googleUser, facebookUser]);

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
      <Text style={{ color: "#fff" }}>Já tem uma conta? </Text>
      <Link
        href="/Login"
        style={{ color: "#fff", textDecorationLine: "underline" }}
      >
        Logar-se
      </Link>
    </View>
  );
}
