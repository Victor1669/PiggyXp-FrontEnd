import { View, StyleSheet, Text } from "react-native";

export default function Home() {
  return (
    <View style={HomeStyles.container}>
      <Text style={{ color: "#fff", fontSize: 32 }}>HOME</Text>
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
