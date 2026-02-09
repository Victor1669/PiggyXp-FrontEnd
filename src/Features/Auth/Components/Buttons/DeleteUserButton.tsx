import { useRouter } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import { DeleteUserService } from "@Auth/Services/DeleteUser";
import { toastMessage } from "Utils/toast";

import Button from "@Components/Button";

export default function DeleteUserButton() {
  const router = useRouter();
  const { user, getUserToken, logout } = useAuth();

  async function handleDeleteAccount() {
    const token = await getUserToken();
    const { status } = await DeleteUserService(user.userId, token);
    if (status < 300) {
      await logout();
      router.replace("/Cadastro");
    }
  }
  return <Button onPress={handleDeleteAccount}>Apagar conta</Button>;
}
