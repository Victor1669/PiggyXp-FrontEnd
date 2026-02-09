import { StyleSheet, Text, View } from "react-native";

export default function Loja() {
  return (
    <View style={LojaStyles.container}>
      <Text style={{ color: "#fff", fontSize: 32 }}>LOJA</Text>
    </View>
  );
}

const LojaStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
