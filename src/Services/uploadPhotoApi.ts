import * as FileSystem from "expo-file-system/legacy";

import { env } from "Config/env";

export async function uploadPhotoApi(
  imageLocation: string,
  token: string,
  mimeType: string,
  backEndURL: string,
  method: "POST" | "PUT",
) {
  const response = await FileSystem.uploadAsync(
    `${env.backEndUrl}/api/${backEndURL}`,
    imageLocation,
    {
      httpMethod: method,
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
