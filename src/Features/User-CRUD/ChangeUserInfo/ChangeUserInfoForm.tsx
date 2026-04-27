import { router } from "expo-router";
import { Fields } from "@Auth/Schemas/SchemaFields";
import Form from "@Auth/Components/Form/Form";

import { screenValues } from "Config/screenValues";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { toastMessage } from "Utils/toast";

interface ChangeUserInfoFormProps {
  onProductionSubmit: (
    data: { name: string; email: string },
    hasChangedEmail: boolean,
  ) => Promise<void>;
  currentImage: string;
}

const USER_FIELDS = [Fields.Nome, Fields.Email];

export default function ChangeUserInfoForm({
  onProductionSubmit,
  currentImage,
}: ChangeUserInfoFormProps) {
  const { user, login } = useAuth();
  const { getIsConnected } = useInternetConnection();

  const { isPreviewBuild } = screenValues();

  async function internalSubmit(formData: { Nome: string; Email: string }) {
    if (!getIsConnected()) return;

    const trimmedName = formData.Nome.trim();
    const hasChangedName = trimmedName !== user.name;
    const hasChangedEmail = formData.Email !== user.email;
    const hasChangedImage = currentImage !== user.user_img;

    if (!hasChangedName && !hasChangedEmail && !hasChangedImage) {
      toastMessage({ type: "info", text: "Nenhuma informação foi alterada!" });
      return;
    }

    if (isPreviewBuild) {
      await login({
        ...user,
        name: trimmedName,
        email: formData.Email,
        user_img: currentImage,
      });
      router.push("/Content/Profile");
      return;
    }

    await onProductionSubmit(
      { name: trimmedName, email: formData.Email },
      hasChangedEmail,
    );
  }

  return (
    <Form
      onSubmit={internalSubmit}
      buttonText="Salvar"
      formFields={USER_FIELDS}
      defaultValues={{ Nome: user.name, Email: user.email }}
    />
  );
}
