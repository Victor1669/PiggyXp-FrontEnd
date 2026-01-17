import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

import { useAuth } from "../../src/Features/Auth/Contexts/useAuth";

import { notifications } from "../../src/Services/notifications";

import { GlobalImages } from "../../assets/Images";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const { name, email, picture } = user;

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
          Toast.show({
            type: "customSuccess",
            text1: "Teste",
          });
        }}
      >
        <Text>Mensagem Toast</Text>
      </TouchableOpacity>
      <Image
        style={{ width: 100, height: 100 }}
        source={
          picture
            ? {
                uri: picture,
              }
            : GlobalImages.porco
        }
      />
      <Text>{name}</Text>
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
