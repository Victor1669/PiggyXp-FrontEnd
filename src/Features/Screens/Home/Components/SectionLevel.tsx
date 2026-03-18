import { View } from "react-native";

import { LevelType, useLevels } from "../Contexts/useLevels";
import { useShowSheet } from "../Contexts/useShowSheet";

import HexagonButton from "./HexagonButton";
import LevelPath from "./LevelPath";

export default function SectionLevel({
  index,
  level,
  pathDirection,
}: {
  index: number;
  level: LevelType;
  pathDirection: "left" | "right";
}) {
  const { containerPosition, img, imgFolder, isLocked, isPathLocked } = level;
  const { levels, setSelectedLevelIndex } = useLevels();
  const { setShowSheet } = useShowSheet();

  function handlePress() {
    setSelectedLevelIndex(index);
    setShowSheet((s) => !s);
  }

  return (
    <View
      style={{
        transform: [{ translateY: index !== 0 ? -53 * index : 0 }],
        width: "70%",
        margin: "auto",
      }}
    >
      <HexagonButton
        onPress={handlePress}
        position={containerPosition as any}
        isLocked={isLocked}
        img={img}
        imgFolder={imgFolder}
      />
      <LevelPath
        position={containerPosition as any}
        direction={pathDirection}
        isLocked={isPathLocked}
        isLast={index === levels.length - 1}
      />
    </View>
  );
}
