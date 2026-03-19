import { router } from "expo-router";

import { env } from "Config/env";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import Button from "@Components/Button";
import Paragraph from "@Components/Paragraph";
import { ImageUploaderButton } from "./ImageUploaderButton";

import { ImageContainer } from "../../Auth/Components/ImageContainer";

export default function DefinePhotoForm() {
  const { temporaryImageToken, login, user } = useAuth();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "upload-user-img",
    "POST",
  );
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit() {
    if (env.buildProfile === "preview") {
      await login({ ...user, user_img: imageURI });
      router.push("/Content");
      return;
    }
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);

    const userToken = await temporaryImageToken.get();

    await handleImageSubmit(userToken);
    await temporaryImageToken.delete();

    router.replace("/Login");

    setShowLoadingScreen(false);
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
