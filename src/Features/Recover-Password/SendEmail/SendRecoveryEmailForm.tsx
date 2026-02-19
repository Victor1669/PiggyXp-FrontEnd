import { router } from "expo-router";

import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { Fields } from "@Auth/Schemas/SchemaFields";
import { SendRecoveryEmail } from "@Auth/Services/RecoveryService";

import Form from "@Auth/Components/Form/Form";

export default function SendRecoveryEmailForm() {
  const { userEmailWhileRecovering } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit(formData: { Email: string }) {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const body = { email: formData.Email };

    const { data, status } = await SendRecoveryEmail(body);

    if (status < 300) {
      await userEmailWhileRecovering.set(body.email);
      router.replace("/SendRecoveryEmail/CodeVerifier");
    }
    setShowLoadingScreen(false);
  }
  return (
    <Form
      onSubmit={handleSubmit}
      buttonText="Enviar"
      formFields={[Fields.Email]}
    />
  );
}
