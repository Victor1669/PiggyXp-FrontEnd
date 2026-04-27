import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useSelectImage } from "@Auth/Hooks/useSelectImage";
import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { UpdateUserInfo } from "@Auth/Services/UserInfoService";
import { toastMessage } from "Utils/toast";

import ChangeImageButton from "@Screens/Profile/Components/ChangeImageButton";
import ChangeUserInfoForm from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfoForm";
import DeleteUserButton from "Features/User-CRUD/DeleteUser/DeleteUserButton";

import { ChangeUserInfoStyles } from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfo.css";
const { container } = ChangeUserInfoStyles;

export default function ChangeUserInfoContainer() {
  const { user, logout, login, userToken } = useAuth();
  const { showStatus, hideStatus } = useStatus();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "update-user-img",
    "PUT",
  );
  const updateUserInfo = useUpdateUserInfo();

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
      Promise.all([handleImageSubmit(token), updateUserInfo()]);
    }

    const { data, status } = await UpdateUserInfo(user.id, textData, token);

    if (data.message === "jwt expired" || data === "jwt expired") {
      toastMessage({
        type: "error",
        text: "Token expirado, refaça o login antes!",
      });
      await logout();
      router.replace("/Login");
      hideStatus();
      return;
    }

    if (status < 300) {
      await login({ ...user, ...textData, user_img: image });
      hasChangedEmail ? await logout() : router.push("/Content/Profile");
      if (hasChangedEmail) router.replace("/Login");
    }

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
