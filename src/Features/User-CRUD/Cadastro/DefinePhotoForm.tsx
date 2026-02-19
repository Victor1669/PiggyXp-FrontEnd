import { Text, View } from "react-native";
import { router } from "expo-router";

import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useAuth } from "@Auth/Contexts/useAuth";
import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import Button from "@Components/Button";
import { ImageUploaderButton } from "./ImageUploaderButton";

import { DefinePhotoFormStyles } from "Features/User-CRUD/Cadastro/DefinePhoto.css";
import { ImageContainer } from "../../Auth/Components/ImageContainer";
const { container, subtitle } = DefinePhotoFormStyles;

export default function DefinePhotoForm() {
  const { temporaryImageToken } = useAuth();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "upload-user-img",
    "POST",
  );
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleSubmit() {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const userToken = await temporaryImageToken.get();
    await handleImageSubmit(userToken);
    await temporaryImageToken.delete();
    router.replace("/Login");
    setShowLoadingScreen(false);
  }

  return (
    <View style={container}>
      <Text style={subtitle}>Adicione uma foto para o seu perfil</Text>
      <ImageContainer image={imageURI} />
      <ImageUploaderButton onPress={handleImageSending} />
      <Button onPress={handleSubmit} style={{ width: "90%" }}>
        Concluir cadastro
      </Button>
    </View>
  );
}
