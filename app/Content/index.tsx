import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { requestAndSendNotification } from "../../src/Utils/requestAndSendNotification";

export default function Home() {
  return (
    <View style={HomeStyles.container}>
      <TouchableOpacity
        onPress={() => {
          requestAndSendNotification();
        }}
      >
        <Text>Enviar notificação</Text>
      </TouchableOpacity>
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
