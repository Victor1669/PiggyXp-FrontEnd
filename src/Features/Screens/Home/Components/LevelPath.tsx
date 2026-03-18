import { View } from "react-native";

import Picture from "@Components/Picture";

import { HomeImages } from "../Assets/HomeImages";
const { path } = HomeImages;

/*
  ESQUERDA:
    container:
      rotateZ: 0deg
    imagem:
      rotateX: 0deg


  DIREITA: 
    container:
      rotateZ: 180deg
    imagem:
      rotateX: 180deg
*/

export default function LevelPath({
  direction,
  position,
  isLocked = true,
  isLast = false,
}: {
  direction: "left" | "right";
  position: "flex-start" | "center" | "flex-end";
  isLocked?: boolean;
  isLast?: boolean;
}) {
  if (!isLast)
    return (
      <View
        style={{
          zIndex: -1,
          transform: [
            { translateY: -25 },
            { rotateZ: direction === "left" ? "0deg" : "180deg" },
          ],
          width: "45%",
          alignSelf: position,
        }}
      >
        <Picture
          folder="home/path"
          style={{
            width: 52,
            height: 66,
            aspectRatio: 0.8,
            transform: [{ rotateX: direction === "left" ? "0deg" : "180deg" }],
          }}
          source={isLocked ? path.locked : path.unLocked}
        />
      </View>
    );
}
