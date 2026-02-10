import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowModal } from "Contexts/useShowModal";
import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import { GetUserInfo, UpdateUserInfo } from "@Auth/Services/UserInfoService";
import { toastMessage } from "Utils/toast";

import ChangeImageButton from "@Auth/Components/Buttons/ChangeImageButton";
import ChangeUserInfoForm from "@Auth/Components/Forms/ChangeUserInfoForm";
import DeleteUserButton from "@Auth/Components/Buttons/DeleteUserButton";

import { ChangeUserInfoStyles } from "@Styles/ChangeUserInfo.css";
const { container } = ChangeUserInfoStyles;

export default function ChangeUserInfoContainer() {
  const { user, logout, login, getUserToken } = useAuth();
  const [image, setImage] = useState<string>(user.user_img);
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "update-user-img",
    "PUT",
  );
  const { setShowModal } = useShowModal();

  async function handleSubmit(data: { Nome: string; Email: string }) {
    setShowModal(true);
    const { Nome: name, Email: email } = data;

    const hasChangedEmail = email !== user.email;
    const hasChangedTextInfo = name.trim() !== user.name || hasChangedEmail;
    const hasChangedImage = image !== user.user_img;

    const userToken = await getUserToken();

    if (hasChangedImage) await handleImageSubmit(userToken);

    if (hasChangedTextInfo) {
      const { status } = await handleUpdateUserTextInfo(
        { name: name.trim(), email },
        userToken,
      );

      if (status < 300 && hasChangedEmail) {
        await invalidTokenResponse();
        setShowModal(false);
        return;
      }
    }

    if (!hasChangedTextInfo && !hasChangedImage) {
      toastMessage({
        type: "info",
        text: "Nenhuma informação foi alterada!",
      });
    } else {
      await handleUpdateUserInfo(hasChangedEmail);
    }
    setShowModal(false);
  }

  async function handleUpdateUserTextInfo(
    formData: { name: string; email: string },
    userToken: string,
  ) {
    const { data, status } = await UpdateUserInfo(
      user.userId,
      formData,
      userToken,
    );

    if (data.message === "jwt expired") {
      toastMessage({
        type: "error",
        text: "Token expirado, refaça o login antes!",
      });
      await invalidTokenResponse();
    }

    return { status };
  }

  async function handleUpdateUserInfo(hasChangedEmail: boolean) {
    const { data, status } = await GetUserInfo(user.userId);

    if (status < 300 && !hasChangedEmail) {
      await login({ ...data, userId: user.userId });
      router.push("/Content/Profile");
    }
  }

  async function invalidTokenResponse() {
    await logout();
    router.replace("/Login");
  }

  useEffect(() => {
    if (imageURI.length) setImage(imageURI);
  }, [imageURI]);

  return (
    <ScrollView style={{ width: "100%" }} contentContainerStyle={container}>
      <ChangeImageButton onPress={handleImageSending} image={image} />
      <ChangeUserInfoForm
        onSubmit={handleSubmit}
        defaultValues={{
          Nome: user.name,
          Email: user.email,
        }}
      />
      <DeleteUserButton />
    </ScrollView>
  );
}
