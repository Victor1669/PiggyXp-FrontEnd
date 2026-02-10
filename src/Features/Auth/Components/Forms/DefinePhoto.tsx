import { Text, View } from "react-native";
import { router } from "expo-router";

import { useShowModal } from "Contexts/useShowModal";
import { useAuth } from "@Auth/Contexts/useAuth";
import { useSelectImage } from "@Auth/Hooks/useSelectImage";

import Button from "@Components/Button";
import { ImageUploaderButton } from "../Buttons/ImageUploaderButton";

import { DefinePhotoFormStyles } from "@Styles/DefinePhoto.css";
import { ImageContainer } from "../Containers/ImageContainer";
const { container, subtitle } = DefinePhotoFormStyles;

export default function DefinePhotoForm() {
  const { getTemporaryImageToken } = useAuth();
  const { handleImageSending, handleImageSubmit, imageURI } = useSelectImage(
    "upload-user-img",
    "POST",
  );
  const { setShowModal } = useShowModal();

  async function handleSubmit() {
    setShowModal(true);
    const userToken = await getTemporaryImageToken();
    await handleImageSubmit(userToken);
    router.replace("/Login");
    setShowModal(false);
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
