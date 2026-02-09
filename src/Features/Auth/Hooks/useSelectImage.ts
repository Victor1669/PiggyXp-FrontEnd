import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { UploadPhotoService } from "@Auth/Services/UploadPhotoService";
import { toastMessage } from "Utils/toast";

function useSelectImage(backEndURL: string, method: "POST" | "PUT") {
  const [imageURI, setImageURI] = useState<string>("");
  const [imageLocation, setImageLocation] = useState<string | null>(null);

  async function handleImageSending() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) return;

    const image = result.assets[0];

    if (image.fileSize === undefined || image.fileSize > 5 * 1024 * 1024) {
      toastMessage({
        type: "error",
        text: "Imagem inexistente ou grande demais!",
      });
      return;
    }

    setImageURI(image.uri);
    setImageLocation(image.uri);
  }

  async function handleImageSubmit(token: string) {
    if (imageLocation) {
      const mimeType = imageLocation.endsWith(".png")
        ? "image/png"
        : imageLocation.endsWith(".jpg") || imageLocation.endsWith(".jpeg")
          ? "image/jpeg"
          : "invalid";

      if (mimeType === "invalid") {
        toastMessage({
          type: "error",
          text: "Tipo de imagem inválida!",
        });
      }

      const { body, status } = await UploadPhotoService(
        imageLocation,
        token,
        mimeType,
        backEndURL,
        method,
      );

      const data = JSON.parse(body);

      if (status < 300) {
        toastMessage({ type: "success", text: data.message });
      } else {
        if (data.message === "Token inválido ou expirado") {
          toastMessage({
            type: "error",
            text: "Token expirado, refaça o login antes!",
          });

          router.replace("/Login");
        } else toastMessage({ type: "error", text: data.message });
      }
    }
  }

  return { handleImageSending, handleImageSubmit, imageURI };
}

export { useSelectImage };
