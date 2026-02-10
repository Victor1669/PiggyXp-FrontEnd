import { useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import { useAuth } from "@Auth/Contexts/useAuth";

export default function Home() {
  const { getFirstTimeLogged } = useAuth();

  useEffect(() => {
    (async function check() {
      const first = await getFirstTimeLogged();
      if (first === "true") Alert.alert("Bem vindo(a)!");
    })();
  }, []);
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
