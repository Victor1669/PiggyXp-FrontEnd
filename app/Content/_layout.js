import { Image, View,} from "react-native";
import { Tabs } from "expo-router";

import { GlobalImages } from "../../assets/Images";
import { GlobalColors } from "../../assets/Colors";

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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={home}
              style={{
                width: 30,
                height: size,
                tintColor: focused
                  ? GlobalColors.Dark
                  : GlobalColors.Light,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Ranking"
        options={{
          title: "Ranking",
          tabBarIcon: ({ focused}) => (
            <View>
              <Image
                source={ranking}
                style={{
                  width: 40,
                  height: 40,
                  marginTop: 7,
                  tintColor: focused
                    ? GlobalColors.Dark
                    : GlobalColors.Light,
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
          tabBarIcon: ({ focused}) => (
            <Image
              source={missoes}
              style={{
                width: 35,
                marginTop: 5,
                height: 35,
                tintColor: focused
                  ? GlobalColors.Dark
                  : GlobalColors.Light,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Loja"
        options={{
          title: "Loja",
          tabBarIcon: ({ focused}) => (
            <Image
              source={loja}
              style={{
                width: 30,
                height: 30,
                marginTop: -5,
                tintColor: focused
                  ? GlobalColors.Dark
                  : GlobalColors.Light,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ focused}) => (
            <Image
              source={perfil}
              style={{
                width: 35,
                height: 50,
                marginTop: -5,
                tintColor: focused
                  ? GlobalColors.Dark
                  : GlobalColors.Light,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
