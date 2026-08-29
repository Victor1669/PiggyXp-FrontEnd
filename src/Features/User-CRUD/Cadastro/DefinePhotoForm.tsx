import { router } from "expo-router";

import { screenValues } from "Config/screenValues";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useInternetConnection } from "Contexts/useInternetConnection";

import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import Button from "@Components/Button";
import Paragraph from "@Components/Paragraph";
import { ImageUploaderButton } from "./ImageUploaderButton";

import { ImageContainer } from "../../Auth/Components/ImageContainer";
import {
  deleteStorageItem,
  getStorageItem,
  STORAGE_KEYS,
} from "Utils/securestore";

export default function DefinePhotoForm() {
  const { login, user } = useAuth();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "upload-user-img",
    "POST",
  );
  const { showStatus, hideStatus } = useStatus();
  const { getIsConnected } = useInternetConnection();

  const { isPreviewBuild } = screenValues();

  async function handleSubmit() {
    if (isPreviewBuild) {
      await login({ ...user, user_img: imageURI });
      router.push("/Content");
      return;
    }

    if (!getIsConnected()) {
      showStatus("noInternet");
      return;
    }

    showStatus("loading");

    const imageToken = await getStorageItem(STORAGE_KEYS.temporaryImageToken);

    await handleImageSubmit(imageToken ?? "");
    await deleteStorageItem(STORAGE_KEYS.temporaryImageToken);

    router.replace("/Login");

    hideStatus();
  }

  return (
    <>
      <Paragraph fontSize="small" style={{ marginVertical: 20 }}>
        Adicione uma foto para o seu perfil
      </Paragraph>
      <ImageContainer image={imageURI} />
      <ImageUploaderButton onPress={handleImageSending} />
      <Button onPress={handleSubmit} style={{ width: "90%" }}>
        Concluir cadastro
      </Button>
    </>
  );
}
