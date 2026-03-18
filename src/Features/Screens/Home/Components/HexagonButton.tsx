//#region Importações
import { useState } from "react";
import RN, { View, Pressable, Image } from "react-native";

import { screenValues } from "Config/screenValues";
const { isDeviceHeigthSmall } = screenValues();

import Picture from "@Components/Picture";

import { HomeImages } from "../Assets/HomeImages";
const {
  content: { hexagon, hexagonShadow, hexagonLocked, hexagonLockedShadow },
} = HomeImages;
//#endregion

export default function HexagonButton({
  position = "center",
  isLocked = true,
  onPress,
  imgFolder,
  img,
}: {
  position: "flex-start" | "center" | "flex-end";
  isLocked: boolean;
  onPress: (e: RN.GestureResponderEvent) => void;
  imgFolder: string;
  img: string;
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
        disabled={isLocked}
        onPress={onPress}
        style={{
          marginTop: showShadow ? 8 : 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Ícone do nível — por cima */}
        <Picture
          folder={imgFolder}
          source={img}
          style={{
            width: showShadow ? 47 : 45,
            height: showShadow ? 47 : 45,
            marginTop: showShadow ? 8 : 0,
            position: "absolute",
            zIndex: 2,
          }}
        />

        <Picture
          style={{ zIndex: 1, width: 80, height: showShadow ? 93 : 101 }}
          folder="home/content"
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
