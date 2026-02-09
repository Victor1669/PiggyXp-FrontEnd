import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";

import Button from "@Components/Button";

import { WelcomeContainerStyles } from "./WelcomeContainer.css";

import { env } from "Config/env";

const { container, text, buttons } = WelcomeContainerStyles;

export default function WelcomeContainer() {
  const router = useRouter();

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
      {env.buildProfile !== "production" && (
        <Button style={buttons} onPress={() => router.push("/Content")}>
          Conteúdo
        </Button>
      )}
    </View>
  );
}
