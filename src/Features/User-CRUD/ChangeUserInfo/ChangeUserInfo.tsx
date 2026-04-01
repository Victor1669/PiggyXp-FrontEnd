//#region Importações
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { useSelectImage } from "@Auth/Hooks/useSelectImage";
import { useVerifyAchievements } from "Features/Achievements/Hooks/useVerifyAchievements";

import { UpdateUserInfo } from "@Auth/Services/UserInfoService";
import { toastMessage } from "Utils/toast";

import ChangeImageButton from "@Screens/Profile/Components/ChangeImageButton";
import ChangeUserInfoForm from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfoForm";
import DeleteUserButton from "Features/User-CRUD/DeleteUser/DeleteUserButton";

import { ChangeUserInfoStyles } from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfo.css";
const { container } = ChangeUserInfoStyles;
//#endregion

type FormData = { Nome: string; Email: string };

export default function ChangeUserInfoContainer() {
  const { user, logout, login, userToken } = useAuth();
  const { getIsConnected } = useInternetConnection();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "update-user-img",
    "PUT",
  );
  const { checkAchievementsStatus } = useVerifyAchievements();

  const [image, setImage] = useState<string>(user.user_img as string);

  useEffect(() => {
    if (imageURI.length) setImage(imageURI);
  }, [imageURI]);

  // --- Detecção de mudanças ---

  function detectChanges(name: string, email: string) {
    const hasChangedImage = image !== user.user_img;
    const hasChangedName = name !== user.name;
    const hasChangedEmail = email !== user.email;
    const hasChangedTextInfo = hasChangedName || hasChangedEmail;
    const hasChangedAnything = hasChangedImage || hasChangedTextInfo;

    return {
      hasChangedImage,
      hasChangedEmail,
      hasChangedTextInfo,
      hasChangedAnything,
    };
  }

  // --- Preview mode ---

  async function handlePreviewSubmit(name: string, email: string) {
    await login({
      ...user,
      name,
      email,
      user_img: image !== user.user_img ? imageURI : user.user_img,
    });
    router.push("/Content/Profile");
  }

  // --- Atualização de imagem ---

  async function submitImageIfChanged(hasChangedImage: boolean, token: string) {
    if (hasChangedImage) {
      await handleImageSubmit(token);
      await checkAchievementsStatus(String(user.id));
    }
  }

  // --- Atualização de texto ---

  async function submitTextInfoIfChanged(
    hasChangedTextInfo: boolean,
    hasChangedEmail: boolean,
    formData: { name: string; email: string },
    token: string,
  ): Promise<boolean> {
    if (!hasChangedTextInfo) return false;

    const { data, status } = await UpdateUserInfo(user.id, formData, token);
    const isTokenExpired =
      data.message === "jwt expired" || data === "jwt expired";

    if (isTokenExpired) {
      toastMessage({
        type: "error",
        text: "Token expirado, refaça o login antes!",
      });
      await redirectToLogin();
      return true;
    }

    const updatedSuccessfully = status < 300;

    // --- ADIÇÃO DA ATUALIZAÇÃO LOCAL ---
    if (updatedSuccessfully) {
      // Atualiza o contexto global com o novo nome/imagem sem deslogar o usuário
      await login({
        ...user,
        name: formData.name,
        email: formData.email,
        user_img: image, // Garante que a imagem do estado local também reflita no contexto
      });
    }
    // ----------------------------------

    if (updatedSuccessfully && hasChangedEmail) {
      await redirectToLogin();
      return true;
    }

    return false;
  }

  // --- Redirecionamento ---

  async function redirectToLogin() {
    await logout();
    router.replace("/Login");
  }

  // --- Submit principal ---

  async function handleSubmit({ Nome: name, Email: email }: FormData) {
    if (!getIsConnected()) return;

    const trimmedName = name.trim();
    const {
      hasChangedImage,
      hasChangedEmail,
      hasChangedTextInfo,
      hasChangedAnything,
    } = detectChanges(trimmedName, email);

    if (!hasChangedAnything) {
      toastMessage({ type: "info", text: "Nenhuma informação foi alterada!" });
      return;
    }

    setShowLoadingScreen(true);

    if (env.buildProfile === "preview") {
      await handlePreviewSubmit(trimmedName, email);
      setShowLoadingScreen(false);
      return;
    }

    const token = await userToken.get();

    await submitImageIfChanged(hasChangedImage, token);

    const shouldRedirect = await submitTextInfoIfChanged(
      hasChangedTextInfo,
      hasChangedEmail,
      { name: trimmedName, email },
      token,
    );

    if (!shouldRedirect) {
      router.push("/Content/Profile");
    }

    setShowLoadingScreen(false);
  }

  return (
    <ScrollView style={{ width: "100%" }} contentContainerStyle={container}>
      <ChangeImageButton onPress={handleImageSending} image={image} />
      <ChangeUserInfoForm
        onSubmit={handleSubmit}
        defaultValues={{ Nome: user.name, Email: user.email }}
      />
      <DeleteUserButton />
    </ScrollView>
  );
}
