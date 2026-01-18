import { useState } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { useAuth } from "../../Auth/Contexts/useAuth";
import { DefinePhotoService } from "./DefinePhotoService";

import { DefinePhotoFormStyles } from "./DefinePhotoForm.css";

import Button from "../../../Components/Button/Button";
import { ImageContainer } from "./ImageContainer";
import { ImageUploaderButton } from "./ImageUploaderButton";

const { container, title, subtitle } = DefinePhotoFormStyles;

export default function DefinirFotoForm() {
  const router = useRouter();
  const { getTemporaryImageToken } = useAuth();

  const [imageURI, setImageURI] = useState("");
  const [imageLocation, setImageLocation] = useState<string | null>(null);

  async function handleImageSending() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    // SE O ENVIO FOR CANCELADO, SAI DA FUNÇÃO
    if (result.canceled) return;

    const image = result.assets[0];

    /* 
      VALIDAÇÃO PRA CASO A IMAGEM TENHA 5MB OU MAIS 
      OU NÃO EXISTE POR ALGUM MOTIVO
    */
    if (image.fileSize === undefined || image.fileSize > 5 * 1024 * 1024) {
      console.log("Imagem inexistente ou grande demais!");
      return;
    }

    setImageURI(image.uri);
    setImageLocation(image.uri);
  }

  async function handleImageSubmit() {
    if (imageLocation) {
      const token = await getTemporaryImageToken();

      const { body, status } = await DefinePhotoService(imageLocation, token);

      /**
       * TASK: Adicionar feedback do toastify
       */
      if (status < 300) {
        console.log("Erro: " + body);
      }
    }
    router.replace("/Login");
  }

  return (
    <View style={container}>
      <Text style={title}>Adicione uma foto</Text>
      <Text style={subtitle}>Adicione uma foto para o seu perfil</Text>
      <ImageContainer image={imageURI} />
      <ImageUploaderButton onPress={handleImageSending} />
      <Button onPress={handleImageSubmit} style={{ width: 395 }}>
        Concluir cadastro
      </Button>
    </View>
  );
}
