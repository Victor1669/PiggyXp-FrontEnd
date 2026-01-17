import { useEffect } from "react";
import { Text, View } from "react-native";
import { Link, useRouter } from "expo-router";

import { useAuth } from "../Contexts/useAuth";

import Form from "../../../Components/Form/Form";
import { CadastroSchema } from "../Validations/CadastroSchema";
import { CadastroFormStyles } from "../Styles/CadastroForm.css";

interface CadastroFormProps {
  googleUser: object;
  facebookUser: object;
}

export default function CadastroForm({
  googleUser,
  facebookUser,
}: CadastroFormProps) {
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(data: any) {
    console.log(data);
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
