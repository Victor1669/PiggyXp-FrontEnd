import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";

import {
  resendRecoveryEmail,
  ResetPassword,
} from "@Auth/Services/RecoveryService";
import { Fields } from "@Auth/Schemas/SchemaFields";

import CodeInput from "Features/Recover-Password/CodeVerifier/CodeInput";
import Form from "@Auth/Components/Form/Form";

import { CodeVerifierStyles } from "Features/Recover-Password/CodeVerifier/CodeVerifier.css";
const { textContainer, text } = CodeVerifierStyles;

export default function CodeVerifierForm() {
  const LENGTH = 4;
  const [code, setCode] = useState<string[]>(Array(LENGTH).fill(""));

  const { userEmailWhileRecovering } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(formData: {
    "Confirmar nova senha": string;
    "Nova senha": string;
  }) {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const codeString = code.join("");
    const newPassword = formData["Nova senha"];
    const confirmPassword = formData["Confirmar nova senha"];

    const reqBody = { code: codeString, confirmPassword, newPassword };

    const { data, status } = await ResetPassword(reqBody);

    console.log(data);
    if (status < 300) {
      router.replace("/Login");
      await userEmailWhileRecovering.delete();
    }
    setShowLoadingScreen(false);
  }

  async function resendEmail() {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const email = await userEmailWhileRecovering.get();
    await resendRecoveryEmail({ email });
    setShowLoadingScreen(false);
  }

  return (
    <>
      <CodeInput
        containerStyle={{ marginVertical: 30 }}
        code={code}
        setCode={setCode}
        length={LENGTH}
      />
      <View style={textContainer}>
        <Text style={text}>Não recebeu o email?</Text>
        <Pressable onPress={resendEmail}>
          <Text style={[text, { textDecorationLine: "underline" }]}>
            Reenvie
          </Text>
        </Pressable>
      </View>
      <Form
        formFields={[
          { ...Fields.Senha, nomeCampo: "Nova senha" },
          { ...Fields.Senha, nomeCampo: "Confirmar nova senha" },
        ]}
        onSubmit={handleSubmit}
        buttonText="Enviar"
      />
    </>
  );
}
