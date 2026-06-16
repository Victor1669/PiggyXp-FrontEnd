import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { updateUserInfoApi } from "@Auth/Services/UserInfoService";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import { toastMessage } from "Utils/toast";

import ChangeImageButton from "@Screens/Profile/Components/ChangeImageButton";
import ChangeUserInfoForm from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfoForm";
import DeleteUserButton from "Features/User-CRUD/DeleteUser/DeleteUserButton";

import { ChangeUserInfoStyles } from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfo.css";
const { container } = ChangeUserInfoStyles;

export default function ChangeUserInfoContainer() {
  const { user, logout, login } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { userToken } = useStorageItemsContext();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "update-user-img",
    "PUT",
  );

  const [image, setImage] = useState<string>(user.user_img as string);

  useEffect(() => {
    if (imageURI.length) setImage(imageURI);
  }, [imageURI]);

  async function handleProductionSubmit(
    textData: { name: string; email: string },
    hasChangedEmail: boolean,
  ) {
    showStatus("loading");
    const token = await userToken.get();

    if (image !== user.user_img) {
      await handleImageSubmit(token);
    }

    const { data, status } = await updateUserInfoApi(user.id, textData, token);

    if (data.message === "jwt expired" || data === "jwt expired") {
      jwtExpiredHandler();
      return;
    }

    if (status < 300) {
      await login({ ...user, ...textData, user_img: image });

      if (hasChangedEmail) {
        await logout();
        router.replace("/Login");
      } else router.push("/Content/Profile");
    }

    hideStatus();
  }

  async function jwtExpiredHandler() {
    toastMessage({
      type: "error",
      text: "Token expirado, refaça o login antes!",
    });
    await logout();
    router.replace("/Login");
    hideStatus();
  }

  return (
    <ScrollView style={{ width: "100%" }} contentContainerStyle={container}>
      <ChangeImageButton onPress={handleImageSending} image={image} />
      <ChangeUserInfoForm
        onProductionSubmit={handleProductionSubmit}
        currentImage={image}
      />
      <DeleteUserButton />
    </ScrollView>
  );
}
