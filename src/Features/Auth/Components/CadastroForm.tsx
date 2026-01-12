import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "../Contexts/useAuth";

import { UserRegister } from "../Services/UserServices";

import Form from "../../../Components/Form/Form";
import AlternateSignins from "./AlternateSignins";

import { CadastroSchema } from "../Validations/CadastroSchema";
import { CadastroFormStyles } from "../Styles/CadastroForm.css";

export default function CadastroForm() {
  const router = useRouter();
  const { updateTemporaryImageToken } = useAuth();

  async function handleSubmit(formData: any) {
    const { Nome: name, Email: email, Senha: password } = formData;

    const { data, status } = await UserRegister({ name, email, password });

    if (!data) {
      console.log("Erro no cadastro:", data);
      return;
    }

    const { token } = data;

    if (status < 300) {
      updateTemporaryImageToken(token ?? "");
      router.replace("/DefinirFoto");
    }
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
          Senha: "@Vi09112001",
        }}
        onSubmit={handleSubmit}
        buttonText="Criar Conta"
      />
      <JaTemContaText />
      <AlternateSignins text="Criar conta com" bottom={-250} />
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
