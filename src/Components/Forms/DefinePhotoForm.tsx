import { Pressable } from "react-native";
import { router } from "expo-router";

import { AppConfig } from "Config/appConfig";

import {
  deleteStorageItem,
  getStorageItem,
  STORAGE_KEYS,
} from "Utils/securestore";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";
import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import Button from "Components/Buttons/Button";
import Paragraph from "@Components/Paragraph";
import Picture from "Components/Picture";

import { ImageContainer } from "../../Features/Auth/Components/ImageContainer";
import { AuthImages } from "Features/Auth/Assets/AuthImages";

export default function DefinePhotoForm() {
  const { login, user } = useAuth();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "upload-user-img",
    "POST",
  );
  const { showStatus, hideStatus } = useStatus();

  async function handleSubmit() {
    if (AppConfig.isPreviewBuild) {
      await login({ ...user, user_img: imageURI });
      router.push("/Content");
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

export function ImageUploaderButton({
  onPress,
}: {
  onPress: () => Promise<void>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
          width: "90%",
          backgroundColor: "rgb(255,255,255,0.30)",
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 0.5,
          padding: 10,
          marginTop: 20,
          marginBottom: 100,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        },
      ]}
    >
      <Picture
        folder="auth"
        source={AuthImages.upload}
        style={{ width: 40, height: 40 }}
      />
      <Paragraph>Upload da sua foto</Paragraph>
    </Pressable>
  );
}
