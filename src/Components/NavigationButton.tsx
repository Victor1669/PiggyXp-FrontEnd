import { Text, Pressable } from "react-native";
import { router } from "expo-router";

import { env } from "Config/env";

import { screenValues } from "Config/screenValues";
const {showDevTools} = screenValues();

import { GlobalColors } from "@Assets/Colors";


/**
 *
 * TODO: Transformar num modal e mostar isso como uma das opções
 */

export default function NavigationButton() {
  if (env.buildProfile === "development")
    if(showDevTools)return (
      <Pressable
        onPress={() => router.push("/_sitemap")}
        style={{
          position: "absolute",
          right: 0,
          marginTop: 50,
          marginRight: 30,
          backgroundColor: GlobalColors.splashBackColor,
          mixBlendMode: "difference",
          padding: 15,
          borderRadius: 5,
        }}
      >
        <Text>Navegar</Text>
      </Pressable>
    );
}
