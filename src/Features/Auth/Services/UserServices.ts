import * as FileSystem from "expo-file-system/legacy";

import { useFetch } from "../../../Hooks/useFetch";

export { UserRegister, UserUploadPhoto };

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

async function UserRegister(userData: any) {
  const response = await useFetch({
    method: "post",
    body: userData,
    rota: "api/register",
  });
  return response;
}

async function UserUploadPhoto(imageLocation: string, token: string) {
  const response = await FileSystem.uploadAsync(
    `${BACKEND_URL}/api/upload-user-img`,
    imageLocation,
    {
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: "image",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
}
