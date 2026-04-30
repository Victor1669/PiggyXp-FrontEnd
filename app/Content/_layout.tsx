import { Tabs } from "expo-router";

import { screenValues } from "Config/screenValues";

import TabBar from "@Components/Config/TabBar";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";

export default function Layout() {
  const {
    fontSizes: { TITLE_FONT_SIZE },
  } = screenValues();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen
        name="Ranking"
        options={{
          title: "Ranking",
          headerShown: true,
          headerStyle: { backgroundColor: GlobalColors.contentBackColor.Dark },
          headerTitleStyle: {
            color: GlobalFontColors.Dark,
            fontSize: TITLE_FONT_SIZE,
          },
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen name="Missions" options={{ title: "Missões" }} />
      <Tabs.Screen name="Loja" options={{ title: "Loja" }} />
      <Tabs.Screen name="Profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}
