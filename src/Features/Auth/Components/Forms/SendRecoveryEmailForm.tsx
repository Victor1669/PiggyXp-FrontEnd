import { router } from "expo-router";

import { Fields } from "@Auth/Schemas/SchemaFields";
import { SendRecoveryEmail } from "@Auth/Services/RecoveryService";

import Form from "@Components/Form/Form";
import { Alert } from "react-native";

export default function SendRecoveryEmailForm() {
  async function handleSubmit(formData: { Email: string }) {
    const body = { email: formData.Email };
    const { data, status } = await SendRecoveryEmail(body);

    Alert.alert("Funcionalidade em desenvolvimento!");
  }
  return (
    <Form
      onSubmit={handleSubmit}
      buttonText="Enviar"
      formFields={[Fields.Email]}
    />
  );
}
