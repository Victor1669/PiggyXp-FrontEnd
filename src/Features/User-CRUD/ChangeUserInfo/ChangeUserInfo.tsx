import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import { GetUserInfo, UpdateUserInfo } from "@Auth/Services/UserInfoService";
import { toastMessage } from "Utils/toast";

import ChangeImageButton from "@Screens/Profile/Components/ChangeImageButton";
import ChangeUserInfoForm from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfoForm";
import DeleteUserButton from "Features/User-CRUD/DeleteUser/DeleteUserButton";

import { ChangeUserInfoStyles } from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfo.css";
const { container } = ChangeUserInfoStyles;

export default function ChangeUserInfoContainer() {
  const { user, logout, login, userToken } = useAuth();
  const [image, setImage] = useState<string>(user.user_img);
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "update-user-img",
    "PUT",
  );
  const { setShowLoadingScreen } = useShowLoadingScreen();

  async function handleSubmit(data: { Nome: string; Email: string }) {
    setShowLoadingScreen(true);
    const { Nome: name, Email: email } = data;

    const hasChangedEmail = email !== user.email;
    const hasChangedTextInfo = name.trim() !== user.name || hasChangedEmail;
    const hasChangedImage = image !== user.user_img;

    const storedUserToken = await userToken.get();

    if (hasChangedImage) await handleImageSubmit(storedUserToken);

    if (hasChangedTextInfo) {
      const { status } = await handleUpdateUserTextInfo(
        { name: name.trim(), email },
        storedUserToken,
      );

      if (status < 300 && hasChangedEmail) {
        await invalidTokenResponse();
        setShowLoadingScreen(false);
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
    setShowLoadingScreen(false);
  }

  async function handleUpdateUserTextInfo(
    formData: { name: string; email: string },
    userToken: string,
  ) {
    const { data, status } = await UpdateUserInfo(user.id, formData, userToken);

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
    const { data, status } = await GetUserInfo(String(user.id));

    if (status < 300 && !hasChangedEmail) {
      await login({ ...data, userId: user.id });
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
