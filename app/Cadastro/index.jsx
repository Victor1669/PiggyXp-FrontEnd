import { Link } from "expo-router";
import { View, Text, Image } from "react-native";

export default function Cadastro() {
  return (
    <View>
      <Text>Cadastro</Text>
      <Link href="/Login">Login</Link>
    </View>
  );
}
