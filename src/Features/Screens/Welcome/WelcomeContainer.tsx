import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { router } from "expo-router";

import { env } from "Config/env";
import { screenValues } from "Config/screenValues";
const { showDevTools } = screenValues();

import { themeChanger } from "Helpers/themeChanger";

import Button from "@Components/Button";

import { WelcomeContainerStyles } from "./WelcomeContainer.css";
const { container, text, buttons } = WelcomeContainerStyles;

export default function WelcomeContainer() {
  useEffect(() => {
    themeChanger("dark");
  }, []);

  return (
    <View style={container}>
      <Image source={require("./Welcome.png")} />
      <Text style={text}>
        Bem-vindo ao PiggyXp! Aprenda a gerenciar seu dinheiro com facilidade.
      </Text>

      <Button style={buttons} onPress={() => router.push("/Login")}>
        Entrar
      </Button>
      <Button style={buttons} onPress={() => router.push("/Cadastro")}>
        Cadastrar-se
      </Button>
      {env.buildProfile !== "production" && showDevTools && (
        <Button style={buttons} onPress={() => router.push("/Content")}>
          Conteúdo
        </Button>
      )}
    </View>
  );
}
