import { Tabs } from "expo-router";

import { useDynamicScroll } from "Contexts/useDynamicScroll";

import TabBar from "@Components/TabBar";

import { GlobalColors } from "@Assets/Colors";

export default function Layout() {
  const { navBarHeight } = useDynamicScroll();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} navBarHeight={navBarHeight} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="Ranking" options={{ title: "Ranking" }} />
      <Tabs.Screen name="Missoes" options={{ title: "Missões" }} />
      <Tabs.Screen name="Loja" options={{ title: "Loja" }} />
      <Tabs.Screen name="Profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
