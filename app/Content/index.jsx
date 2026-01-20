import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "../../src/Features/Auth/Contexts/useAuth";

import { notifications } from "../../src/Services/notifications";
import { toastMessage } from "../../src/Services/toast";

import { GlobalImages } from "../../assets/Images";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const { difficulty, name, email, user_img } = user;

  return (
    <View style={HomeStyles.container}>
      <TouchableOpacity
        onPress={() => {
          notifications();
        }}
      >
        <Text>Enviar notificação</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toastMessage({ type: "error", text: `Olá, ${name}` });
        }}
      >
        <Text>Mensagem Toast</Text>
      </TouchableOpacity>
      <Image
        style={{ width: 100, height: 100, borderRadius: 50 }}
        source={
          user_img
            ? {
                uri: user_img,
              }
            : GlobalImages.porco
        }
      />
      <Text>{name}</Text>
      <Text>Dificuldade: {difficulty}</Text>
      <Text>{email}</Text>
      <TouchableOpacity
        onPress={() => {
          logout();
          router.replace("/Login");
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
