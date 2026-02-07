import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

import { notifications } from "@Services/notifications";
import { toastMessage } from "@Services/toast";

export default function Home() {
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
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  Image: {
    width: 120,
    height: 100,
    borderRadius: 50,
    marginTop: 200,
  },
});
