import { router } from "expo-router";

import { useStatus } from "Contexts/StatusContext";
import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { Fields } from "@Auth/Schemas/SchemaFields";
import { SendRecoveryEmail } from "@Auth/Services/RecoveryService";

import Form from "@Auth/Components/Form/Form";

export default function SendRecoveryEmailForm() {
  const { userEmailWhileRecovering } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(formData: { Email: string }) {
    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const body = { email: formData.Email };

    const { status } = await SendRecoveryEmail(body);

    if (status < 300) {
      await userEmailWhileRecovering.set(body.email);
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
