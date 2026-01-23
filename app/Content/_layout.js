import { Image } from "react-native";
import { Tabs } from "expo-router";

import { GlobalImages } from "../../assets/Images";
import { GlobalColors } from "../../assets/Colors";

// IMAGENS
const {
  tabBar: { home, loja, missoes, perfil, ranking },
} = GlobalImages;

// EU IMPORTEI AS CORES DO PROJETO NO OBJETO "GlobalColors", POR FAVOR NÃO COPIAR E COLAR AS STRINGS, USE O OBJETO

// TODAS AS TAGS TEM A CHAVE "tabBarStyle", É NELA QUE VOCÊ COLOCA AS ESTILIZAÇÕES
// DEIXE O MENU DE NAVEGAÇÃO SEMELHANTE AO DO FIGMA

// EU JÁ FIZ A CONFIGURAÇÃO DA HOME COMO EXEMPLO, FAÇA O MESMO COM AS OUTRAS TELAS
// USE AS VARIÁVEIS DA "GlobalImages" PARA COLOCAR NA SOURCE DAS IMAGENS

// NÃO SE ESQUEÇA DE MUDAR A COR DE FUNDO DO MENU DE NAVEGAÇÃO

// APAGUE TODOS OS COMENTÁRIOS DEPOIS DE TERMINAR

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          // FUNDO DO MENU DE NAVEGAÇÃO
          backgroundColor: "#f00",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <Image style={{ width: size, height: size }} source={home} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Ranking"
        options={{
          title: "Ranking",
        }}
      />
      <Tabs.Screen
        name="Missoes"
        options={{
          title: "Missões",
        }}
      />
      <Tabs.Screen
        name="Loja"
        options={{
          title: "Loja",
        }}
      />
      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
