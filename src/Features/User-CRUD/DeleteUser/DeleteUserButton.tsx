import { useRouter } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { DeleteUserService } from "@Auth/Services/DeleteUser";

import { toastMessage } from "Utils/toast";

import Button from "@Components/Button";

export default function DeleteUserButton() {
  const router = useRouter();

  const { user, userToken, logout } = useAuth();
  const { setShowLoadingScreen } = useShowLoadingScreen();
  const { getIsConnected } = useInternetConnection();

  async function handleDeleteAccount() {
    if (!getIsConnected()) return;
    setShowLoadingScreen(true);
    const token = await userToken.get();
    const { data, status } = await DeleteUserService(user.id, token);
    console.log(data);
    if (status < 300) {
      await logout();
      toastMessage({ type: "success", text: data.message });
      router.replace("/Cadastro");
    } else if (data === "jwt expired") {
      toastMessage({ type: "info", text: "Token expirado, refaça o login!" });
      router.replace("/Login");
    }
    setShowLoadingScreen(false);
  }
  return <Button onPress={handleDeleteAccount}>Apagar conta</Button>;
}
