//#region Importações
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { usePathname } from "expo-router";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";

import { screenValues } from "Config/screenValues";

import Picture from "@Components/Picture";
import Paragraph from "../Paragraph";

import { GlobalColors } from "@Assets/Colors";
import { GlobalImages } from "@Assets/GlobalImages";
//#endregion

const {
  tabBar: { home, loja, missoes, perfil, ranking },
} = GlobalImages;

const ICON_MAP: Record<string, any> = {
  index: { img: home, width: 40, height: 40, mt: 0, mb: 0 },
  Ranking: { img: ranking, width: 35, height: 30, mt: 9, mb: 0 },
  Missoes: { img: missoes, width: 35, height: 35, mt: 5, mb: 0 },
  Loja: { img: loja, width: 36, height: 36, mt: 0, mb: 5 },
  Profile: { img: perfil, width: 40, height: 40, mt: 0, mb: 0 },
};

interface TabItemProps {
  routeName: string;
  isFocused: boolean;
  title?: string;
  onPress: () => void;
}
//#endregion

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const pathName = usePathname();

  // Esconde a TabBar em rotas específicas
  if (pathName === "/Content/Profile/Config") return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const options = descriptors[route.key]
            .options as BottomTabNavigationOptions & { href?: string | null };
          const isDisplayNone =
            (options.tabBarStyle as any)?.display === "none";

          if (options.href === null || isDisplayNone) return null;

          return (
            <TabItem
              key={route.key}
              routeName={route.name}
              isFocused={state.index === index}
              title={options.title}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
}

/**
 * Componente interno para cada botão da TabBar
 */
function TabItem({ routeName, isFocused, title, onPress }: TabItemProps) {
  const iconData = ICON_MAP[routeName];

  if (!iconData) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.tabItem}
    >
      <Picture
        source={iconData.img}
        folder="tabbar"
        style={{
          width: iconData.width,
          height: iconData.height,
          marginTop: iconData.mt,
          marginBottom: iconData.mb,
        }}
      />
      <Paragraph fontSize="verySmall" color={isFocused ? "#FFF" : "#888"}>
        {title}
      </Paragraph>
    </TouchableOpacity>
  );
}
const { TABBAR_HEIGHT } = screenValues();

const styles = StyleSheet.create({
  container: {
    height: TABBAR_HEIGHT,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: GlobalColors.tabBarBackColor,
    borderTopWidth: 0,
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    height: 90,
    paddingTop: 10,
    alignItems: "flex-start",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
