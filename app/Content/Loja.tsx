import { StyleSheet, View } from "react-native";

export default function Loja() {
  return <View style={LojaStyles.container}></View>;
}

const LojaStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
