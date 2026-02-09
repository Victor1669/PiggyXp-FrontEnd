import { Image, View } from "react-native";
import { Tabs } from "expo-router";

import { GlobalImages } from "@Assets/GlobalImages";
import { GlobalColors } from "@Assets/Colors";

const {
  tabBar: { home, loja, missoes, perfil, ranking },
} = GlobalImages;

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: GlobalColors.Dark,
        tabBarInactiveTintColor: GlobalColors.Light,
        tabBarStyle: {
          backgroundColor: GlobalColors.tabBarBackColor,
          height: 120,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          marginTop: 2,
        },
        sceneStyle: {
          backgroundColor: GlobalColors.contentBackColor.Dark,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Image
              source={home}
              style={{
                width: 35,
                height: 35,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Ranking"
        options={{
          title: "Ranking",
          tabBarIcon: () => (
            <View>
              <Image
                source={ranking}
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 7,
                }}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="Missoes"
        options={{
          title: "Missões",
          tabBarIcon: () => (
            <Image
              source={missoes}
              style={{
                width: 35,
                marginTop: 5,
                height: 35,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Loja"
        options={{
          title: "Loja",
          tabBarIcon: () => (
            <Image
              source={loja}
              style={{
                width: 30,
                height: 30,
                marginTop: -5,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: "Perfil",
          tabBarIcon: () => (
            <Image
              source={perfil}
              style={{
                width: 35,
                height: 50,
                marginTop: -5,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
