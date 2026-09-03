import { router } from "expo-router";

import { setStorageItem, STORAGE_KEYS } from "Utils/securestore";

import { useStatus } from "Contexts/StatusContext";

import { Fields } from "@Auth/Schemas/SchemaFields";
import { sendRecoveryEmailApi } from "Services/recoveryServices";

import Form from "Components/Forms/Form";

export default function SendRecoveryEmailForm() {
  const { showStatus, hideStatus } = useStatus();

  async function handleSubmit(formData: { Email: string }) {
    showStatus("loading");

    const body = { email: formData.Email };

    const { status } = await sendRecoveryEmailApi(body);

    if (status < 300) {
      await setStorageItem(STORAGE_KEYS.recoveryEmail, body.email);
      router.replace("/SendRecoveryEmail/CodeVerifier");
    }

    hideStatus();
  }

  return (
    <Form
      onSubmit={handleSubmit}
      buttonText="Enviar"
      formFields={[Fields.Email]}
    />
  );
}
