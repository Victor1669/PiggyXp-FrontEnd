import { Tabs } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import { MissionsProvider } from "Features/Missions/Contexts/MissionsContext";

import TabBar from "@Components/Config/TabBar";

export default function Layout() {
  return (
    <MissionsProvider>
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: {
            backgroundColor: colors.contentBackColor.Dark,
          },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen
          name="Ranking"
          options={{
            title: "Ranking",
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.contentBackColor.Dark,
            },
            headerTitleStyle: {
              color: "#fff",
              fontSize: AppConfig.fontSizes.TITLE_FONT_SIZE,
            },
            headerTitleAlign: "center",
          }}
        />
        <Tabs.Screen name="Missions" options={{ title: "Missões" }} />
        <Tabs.Screen name="Loja" options={{ title: "Loja" }} />
        <Tabs.Screen name="Profile" options={{ title: "Perfil" }} />
      </Tabs>
    </MissionsProvider>
  );
}
