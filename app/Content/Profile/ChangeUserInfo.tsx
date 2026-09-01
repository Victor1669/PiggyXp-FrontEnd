import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { updateUserInfoApi } from "Services/userInfoServices";

import { getStorageItem, STORAGE_KEYS } from "Utils/securestore";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";

import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import { toastMessage } from "Utils/toast";

import ChangeImageButton from "@Screens/Profile/Components/ChangeImageButton";
import ChangeUserInfoForm from "Components/Forms/ChangeUserInfoForm";
import DeleteUserButton from "Components/Buttons/deleteUserButton";
import ChangeDifficultyButton from "Components/Buttons/changeDifficultybutton";

export default function ChangeUserInfo() {
  const { user, logout, login } = useAuth();
  const { showStatus, hideStatus } = useStatus();
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
    const userToken = await getStorageItem(STORAGE_KEYS.userToken);

    if (image !== user.user_img) {
      await handleImageSubmit(userToken ?? "");
    }

    const { data, status } = await updateUserInfoApi(user.id, textData);

    if (data.message === "jwt expired" || data.message === "jwt expired") {
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
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{
        paddingVertical: 40,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChangeImageButton onPress={handleImageSending} image={image} />
      <ChangeUserInfoForm
        onProductionSubmit={handleProductionSubmit}
        currentImage={image}
      />
      <ChangeDifficultyButton />
      <DeleteUserButton />
    </ScrollView>
  );
}
