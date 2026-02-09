import { Text, View } from "react-native";
import { router } from "expo-router";

import { useSelectImage } from "@Auth/Hooks/useSelectImage";
import { useAuth } from "@Auth/Contexts/useAuth";

import Button from "@Components/Button";
import { ImageUploaderButton } from "../Buttons/ImageUploaderButton";

import { DefinePhotoFormStyles } from "@Styles/DefinePhoto.css";
import { ImageContainer } from "../Containers/ImageContainer";
const { container, title, subtitle } = DefinePhotoFormStyles;

export default function DefinePhotoForm() {
  const { getTemporaryImageToken } = useAuth();

  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "upload-user-img",
    "POST",
  );

  async function handleSubmit() {
    const userToken = await getTemporaryImageToken();
    await handleImageSubmit(userToken);
    router.replace("/Login");
  }

  return (
    <View style={container}>
      <Text style={title}>Adicione uma foto</Text>
      <Text style={subtitle}>Adicione uma foto para o seu perfil</Text>
      <ImageContainer image={imageURI} />
      <ImageUploaderButton onPress={handleImageSending} />
      <Button onPress={handleSubmit} style={{ width: 395 }}>
        Concluir cadastro
      </Button>
    </View>
  );
}
