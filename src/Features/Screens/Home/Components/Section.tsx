import { Pressable, ScrollView, Text, View } from "react-native";

import { useDynamicScroll } from "Contexts/useDynamicScroll";
import { useShowSheet } from "../Contexts/useShowSheet";

import { screenValues } from "Config/screenValues";
const { deviceWidth } = screenValues();

import { HexagonButton } from "./HexagonButton";
import LevelPath from "./LevelPath";

import { GlobalColors, GlobalFontColors } from "@Assets/Colors";
import { useLevels, LevelType } from "../Contexts/useLevels";

export default function Section({ title }: { title: string }) {
  const { setShowSheet } = useShowSheet();
  const { setIsScrolling } = useDynamicScroll();
  const { levels } = useLevels();

  return (
    <>
      <SectionTitle title={title} />
      <ScrollView
        style={{ width: deviceWidth * 0.9, height: 540 }}
        contentContainerStyle={{
          height: levels.length * 120,
        }}
        onScrollBeginDrag={() => {
          setShowSheet(false);
          setIsScrolling(true);
        }}
        onScrollEndDrag={() => setIsScrolling(false)}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        bounces={false}
        overScrollMode="never"
      >
        {levels.map((level, i) => {
          const actualPosition = level.containerPosition;
          const nextPosition = levels[i + 1]?.containerPosition;

          //#region pathDirection
          const pathDirection =
            // SE FOR O PRIMEIRO ITEM, DEIXA UM VALOR PRÉ-DEFINIDO
            i == 0
              ? "left"
              : // SE O PRÓXIMO ITEM ESTIVER NA ESQUERDA, O CAMINHO VAI PRA ESQUERDA
                nextPosition === "flex-start"
                ? "left"
                : // SE O PRÓXIMO ITEM ESTIVER NA DIREITA, O CAMINHO VAI PRA DIREITA
                  nextPosition === "flex-end"
                  ? "right"
                  : // SE O ITEM ATUAL ESTIVER NA ESQUERDA, O CAMINHO VAI PRA DIREITA
                    actualPosition === "flex-start"
                    ? "right"
                    : // SE O ITEM ATUAL ESTIVER NA DIREITA, O CAMINHO VAI PRA ESQUERDA
                      actualPosition === "flex-end"
                      ? "left"
                      : "right";
          //#endregion

          return (
            <Level
              key={i}
              index={i}
              pathDirection={pathDirection}
              level={level}
            />
          );
        })}
      </ScrollView>
    </>
  );
}

function SectionTitle({ title }: { title: string }) {
  const { setShowSheet } = useShowSheet();
  return (
    <Pressable
      onPress={() => setShowSheet(false)}
      style={{
        width: "92%",
        borderBottomWidth: 2,
        borderBottomColor: GlobalFontColors.Dark,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          width: "auto",
          margin: "auto",
          paddingHorizontal: 10,
          backgroundColor: GlobalColors.contentBackColor.Dark,
          transform: [{ translateY: 10 }],
          color: GlobalFontColors.Dark,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}

function Level({
  index,
  level,
  pathDirection,
}: {
  index: number;
  level: LevelType;
  pathDirection: "left" | "right";
}) {
  const { containerPosition, img, isLocked, isPathLocked } = level;
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
