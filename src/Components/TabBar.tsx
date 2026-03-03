import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { GlobalColors } from "@Assets/Colors";
import { GlobalImages } from "@Assets/GlobalImages";
import { usePathname } from "expo-router";

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

interface MyTabBarProps extends BottomTabBarProps {
  navBarHeight: Animated.Value;
}

export default function TabBar({
  state,
  descriptors,
  navigation,
  navBarHeight,
}: MyTabBarProps) {
  const pathName = usePathname();
  const translateY = navBarHeight.interpolate({
    inputRange: [0, 30],
    outputRange: [30, 0],
    extrapolate: "clamp",
  });

  if (!pathName.startsWith("/Content/Level"))
    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: 130,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.content}>
          {state.routes.map((route, index) => {
            const options = descriptors[route.key]
              .options as BottomTabNavigationOptions & { href?: string | null };
            const tabBarStyle = options.tabBarStyle as any;
            const isDisplayNone = tabBarStyle?.display === "none";

            if (options.href === null || isDisplayNone) {
              return null;
            }

            const isFocused = state.index === index;
            const iconData = ICON_MAP[route.name];

            return (
              <TouchableOpacity
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                activeOpacity={0.7}
                style={styles.tabItem}
              >
                {iconData && (
                  <Image
                    source={iconData.img}
                    style={{
                      width: iconData.width,
                      height: iconData.height,
                      marginTop: iconData.mt,
                      marginBottom: iconData.mb,
                    }}
                  />
                )}
                <Text
                  style={[styles.label, { color: isFocused ? "#FFF" : "#888" }]}
                >
                  {options.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: GlobalColors.tabBarBackColor,
    height: 120,
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
  label: {
    fontSize: 13,
    marginTop: 2,
  },
});
