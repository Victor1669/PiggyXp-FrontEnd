import { useState } from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";

import {
  deleteStorageItem,
  getStorageItem,
  STORAGE_KEYS,
} from "Utils/securestore";
import { toastMessage } from "Utils/toast";

import { useStatus } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";

import {
  resetPasswordApi,
  sendRecoveryEmailApi,
} from "Services/recoveryServices";
import { Fields } from "@Auth/Schemas/SchemaFields";

import CodeInput from "Features/Recover-Password/CodeVerifier/CodeInput";
import Form from "Components/Forms/Form";
import Paragraph from "@Components/Paragraph";

export default function CodeVerifierForm() {
  const LENGTH = 4;
  const [code, setCode] = useState<string[]>(Array(LENGTH).fill(""));

  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(formData: {
    "Confirmar nova senha": string;
    "Nova senha": string;
  }) {
    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const codeString = code.join("");
    const newPassword = formData["Nova senha"];
    const confirmPassword = formData["Confirmar nova senha"];

    const reqBody = { code: codeString, confirmPassword, newPassword };

    const { status } = await resetPasswordApi(reqBody);

    if (status < 300) {
      router.replace("/Login");
      await deleteStorageItem(STORAGE_KEYS.recoveryEmail);
    }

    hideStatus();
  }

  async function resendEmail() {
    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const recoveryEmail = await getStorageItem(STORAGE_KEYS.recoveryEmail);

    if (!recoveryEmail) {
      toastMessage({
        type: "error",
        text: "Sessão de recuperação inválida, solicite um novo código!",
      });
      hideStatus();
      return;
    }

    await sendRecoveryEmailApi({ email: recoveryEmail });

    hideStatus();
  }

  return (
    <>
      <CodeInput
        containerStyle={{ marginVertical: 30 }}
        code={code}
        setCode={setCode}
        length={LENGTH}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginHorizontal: "auto",
        }}
      >
        <Paragraph>Não recebeu o email?</Paragraph>
        <Pressable onPress={resendEmail}>
          <Paragraph style={{ textDecorationLine: "underline" }}>
            Reenvie
          </Paragraph>
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
