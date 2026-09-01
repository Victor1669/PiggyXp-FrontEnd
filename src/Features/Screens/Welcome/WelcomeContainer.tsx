import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { router } from "expo-router";

import { themeChanger } from "Helpers/themeChanger";

import Button from "Components/Buttons/Button";
import Paragraph from "@Components/Paragraph";

import { GlobalColors } from "Assets/Colors";

export default function WelcomeContainer() {
  useEffect(() => {
    themeChanger("dark");
  }, []);

  return (
    <View style={container}>
      <Image source={require("./Welcome.png")} />
      <Paragraph style={text}>
        Bem-vindo ao PiggyXp! Aprenda a gerenciar seu dinheiro com facilidade.
      </Paragraph>

      <Button style={buttons} onPress={() => router.push("/Login")}>
        Entrar
      </Button>
      <Button style={buttons} onPress={() => router.push("/Cadastro")}>
        Cadastrar-se
      </Button>
    </View>
  );
}

const { buttons, container, text } = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.contentBackColor.Dark,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    width: "60%",
    marginVertical: 50,
  },
  buttons: {
    marginVertical: 10,
  },
});
