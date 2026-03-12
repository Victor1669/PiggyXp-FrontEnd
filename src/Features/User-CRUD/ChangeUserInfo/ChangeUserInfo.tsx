//#region Importações
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import { GetUserInfo, UpdateUserInfo } from "@Auth/Services/UserInfoService";
import { toastMessage } from "Utils/toast";

import ChangeImageButton from "@Screens/Profile/Components/ChangeImageButton";
import ChangeUserInfoForm from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfoForm";
import DeleteUserButton from "Features/User-CRUD/DeleteUser/DeleteUserButton";

import { ChangeUserInfoStyles } from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfo.css";
const { container } = ChangeUserInfoStyles;
//#endregion

export default function ChangeUserInfoContainer() {
  const { user, logout, login, userToken } = useAuth();
  const { getIsConnected } = useInternetConnection();
  const { setShowLoadingScreen } = useShowLoadingScreen();

  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "update-user-img",
    "PUT",
  );
  const [image, setImage] = useState<string>(user.user_img as string);

  async function handleSubmit(data: { Nome: string; Email: string }) {
    if (!getIsConnected()) return;

    setShowLoadingScreen(true);

    const { Nome: name, Email: email } = data;
    const trimmedName = name.trim();

    const hasChangedImage = image !== user.user_img;
    const hasChangedEmail = email !== user.email;
    const hasChangedTextInfo = trimmedName !== user.name || hasChangedEmail;
    const hasChangedAnything = hasChangedImage || hasChangedTextInfo;

    if (!hasChangedAnything) {
      toastMessage({ type: "info", text: "Nenhuma informação foi alterada!" });
      setShowLoadingScreen(false);
      return;
    }

    if (env.buildProfile === "preview") {
      await login({
        ...user,
        name: trimmedName,
        email,
        user_img: hasChangedImage ? imageURI : user.user_img,
      });
      router.push("/Content/Profile");
      setShowLoadingScreen(false);
      return;
    }

    const storedUserToken = await userToken.get();

    if (hasChangedImage) {
      await handleImageSubmit(storedUserToken);
    }

    if (hasChangedTextInfo) {
      const shouldRedirectToLogin = await updateTextInfoAndCheckRedirect(
        { name: trimmedName, email },
        storedUserToken,
        hasChangedEmail,
      );

      if (shouldRedirectToLogin) {
        setShowLoadingScreen(false);
        return;
      }
    }

    await handleUpdateUserInfo(hasChangedEmail);
    setShowLoadingScreen(false);
  }

  async function updateTextInfoAndCheckRedirect(
    formData: { name: string; email: string },
    storedUserToken: string,
    hasChangedEmail: boolean,
  ): Promise<boolean> {
    const { status } = await handleUpdateUserTextInfo(
      formData,
      storedUserToken,
    );

    const updatedSuccessfully = status < 300;
    const shouldLogout = updatedSuccessfully && hasChangedEmail;

    if (shouldLogout) {
      await invalidTokenResponse();
      return true;
    }

    return false;
  }

  async function handleUpdateUserTextInfo(
    formData: { name: string; email: string },
    token: string,
  ) {
    const { data, status } = await UpdateUserInfo(user.id, formData, token);

    const isTokenExpired =
      data.message === "jwt expired" || data === "jwt expired";

    if (isTokenExpired) {
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

    const fetchedSuccessfully = status < 300;

    if (fetchedSuccessfully && !hasChangedEmail) {
      await login({ ...data, id: user.id });
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
