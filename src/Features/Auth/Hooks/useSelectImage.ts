import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { UploadPhotoService } from "@Auth/Services/UploadPhotoService";
import { toastMessage } from "Utils/toast";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const MIME_TYPE_MAP: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
};

function getMimeType(uri: string): string {
  const extension = Object.keys(MIME_TYPE_MAP).find((ext) => uri.endsWith(ext));
  return extension ? MIME_TYPE_MAP[extension] : "invalid";
}

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
    const isFileSizeInvalid =
      image.fileSize === undefined || image.fileSize > MAX_FILE_SIZE_BYTES;

    if (isFileSizeInvalid) {
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
    if (!imageLocation) return;

    const mimeType = getMimeType(imageLocation);

    if (mimeType === "invalid") {
      toastMessage({ type: "error", text: "Tipo de imagem inválida!" });
      return;
    }

    const { body, status } = await UploadPhotoService(
      imageLocation,
      token,
      mimeType,
      backEndURL,
      method,
    );

    const data = JSON.parse(body);
    const uploadFailed = status >= 300;

    if (!uploadFailed) {
      toastMessage({ type: "success", text: data.message });
      return;
    }

    const isTokenExpired = data.message === "Token inválido ou expirado";

    if (isTokenExpired) {
      toastMessage({
        type: "error",
        text: "Token expirado, refaça o login antes!",
      });
      router.replace("/Login");
    } else {
      toastMessage({ type: "error", text: data.message });
    }
  }

  return { handleImageSending, handleImageSubmit, imageURI };
}

export { useSelectImage };
