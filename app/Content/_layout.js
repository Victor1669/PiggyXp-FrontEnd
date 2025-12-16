import { Tabs } from "expo-router";

import { GlobalImages } from "../../assets/Images";

import { Image } from "react-native";
// IMAGENS
const {
  tabBar: { home, loja, missoes, perfil, ranking },
} = GlobalImages;

// DENTRO DAS CHAVES DE "tabBarStyle", FAÇA A ESTILIZAÇÃO DA TABBAR PRA FICAR COMO NO FIGMA

// CONFIGURE AS OUTRAS PÁGINAS COM ESSAS IMAGENS

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
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
    </Tabs>
  );
}
