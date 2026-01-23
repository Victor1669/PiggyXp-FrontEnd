import { View } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "../../src/Features/Auth/Contexts/useAuth";

import Button from "../../src/Components/Button";

export default function Perfil() {
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/Login");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={handleLogout}>Sair</Button>
    </View>
  );
}
