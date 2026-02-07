import { useFetch } from "@Hooks/useFetch";

export { GetUserInfo };

async function GetUserInfo(userId: string) {
  const response = await useFetch({
    method: "get",
    rota: `api/userInfo/?userId=${userId}`,
  });
  return response;
}

import * as FileSystem from "expo-file-system/legacy";

import { env } from "@Config/env";

const BACKEND_URL = env.backEndUrl;

export async function DefinePhotoService(imageLocation: string, token: string) {
  const mimeType = imageLocation.endsWith(".png")
    ? "image/png"
    : imageLocation.endsWith(".jpg") || imageLocation.endsWith(".jpeg")
      ? "image/jpeg"
      : "invalid";

  if (mimeType === "invalid") {
    /**
     * TASK: Adicionar feedback do toastify
     *  */
    throw new Error("Tipo inválido");
  }
  const response = await FileSystem.uploadAsync(
    `${BACKEND_URL}/api/upload-user-img`,
    imageLocation,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "image",
      mimeType,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
}
