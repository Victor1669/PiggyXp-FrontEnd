import * as FileSystem from "expo-file-system/legacy";

import { env } from "Config/env";

/**
 *
 * @param imageLocation
 * @param token
 * @param mimeType
 * @param backEndURL
 * @param method
 * @returns
 */
export async function UploadPhotoService(
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
