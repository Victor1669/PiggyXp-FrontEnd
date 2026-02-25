//#region Importações
import { useState } from "react";
import { View, Pressable, Image } from "react-native";

import { screenValues } from "Config/screenValues";
const { isDeviceHeigthSmall } = screenValues();

import { HomeImages } from "../Assets/HomeImages";
const {
  content: { hexagon, hexagonShadow, hexagonLocked, hexagonLockedShadow },
} = HomeImages;
//#endregion

export function HexagonButton({
  position = "center",
  isLocked = true,
  onPress,
  img,
}: {
  position?: "flex-start" | "center" | "flex-end";
  isLocked?: boolean;
  onPress?: () => void;
  img?: any;
}) {
  const [showShadow, setShowShadow] = useState(false);
  return (
    <View
      style={{
        alignSelf: position,
        marginHorizontal: isDeviceHeigthSmall ? 0 : 15,
        position: "relative",
      }}
    >
      <Pressable
        onPressIn={() => setShowShadow(true)}
        onPressOut={() => setShowShadow(false)}
        onPress={onPress}
        style={{
          marginTop: showShadow ? 8 : 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: showShadow ? 47 : 45,
            height: showShadow ? 47 : 45,
            marginTop: showShadow ? 8 : 0,
            position: "absolute",
            zIndex: 2,
          }}
          source={img}
        />
        <Image
          style={{ zIndex: 1 }}
          source={
            showShadow
              ? isLocked
                ? hexagonLocked
                : hexagon
              : isLocked
                ? hexagonLockedShadow
                : hexagonShadow
          }
        />
      </Pressable>
    </View>
  );
}
