//#region Importações
import { useState } from "react";
import { ScrollView, View } from "react-native";

import LevelPath from "../Components/LevelPath";
import { HomeImages } from "../Assets/HomeImages";
const {
  content: { star, graphic, trophy },
} = HomeImages;
import { GlobalImages } from "@Assets/GlobalImages";
import { HexagonButton } from "../Components/HexagonButton";
const {
  tabBar: { loja, missoes, perfil, ranking },
} = GlobalImages;
//#endregion

export default function HomeContent() {
  const [actualLevel, setActualLevel] = useState(1);

  const levels = [
    {
      containerPosition: "center",
      isLocked: 1 > actualLevel,
      isPathLocked: 0 > actualLevel - 2,
      img: ranking,
    },
    {
      containerPosition: "flex-start",
      isLocked: 2 > actualLevel,
      isPathLocked: 1 > actualLevel - 2,
      img: perfil,
    },
    {
      containerPosition: "center",
      isLocked: 3 > actualLevel,
      isPathLocked: 2 > actualLevel - 2,
      img: missoes,
    },
    {
      containerPosition: "flex-end",
      isLocked: 4 > actualLevel,
      isPathLocked: 3 > actualLevel - 2,
      img: loja,
    },
    {
      containerPosition: "center",
      isLocked: 5 > actualLevel,
      isPathLocked: 4 > actualLevel - 2,
      img: graphic,
    },
    {
      containerPosition: "flex-start",
      isLocked: 6 > actualLevel,
      isPathLocked: 5 > actualLevel - 2,
      img: star,
    },
    {
      containerPosition: "center",
      isLocked: 7 > actualLevel,
      isPathLocked: 6 > actualLevel - 2,
      img: loja,
    },
    {
      containerPosition: "flex-end",
      isLocked: 8 > actualLevel,
      isPathLocked: 7 > actualLevel - 2,
      img: trophy,
    },
  ];

  return (
    <ScrollView
      style={{ width: "90%", height: 540 }}
      contentContainerStyle={{ height: levels.length * 115 }}
      showsVerticalScrollIndicator={false}
      scrollEnabled
    >
      {levels.map((path, i) => {
        const actualPosition = path.containerPosition;
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
          <View
            key={i}
            style={{
              transform: [{ translateY: i !== 0 ? -53 * i : 0 }],
              width: "70%",
              margin: "auto",
            }}
          >
            <HexagonButton
              onPress={() => setActualLevel((prev) => prev + 1)}
              position={path.containerPosition as any}
              isLocked={path.isLocked}
              img={path.img}
            />

            <LevelPath
              position={path.containerPosition as any}
              direction={pathDirection}
              isLocked={path.isPathLocked}
              isLast={i === levels.length - 1}
            />
          </View>
        );
      })}
    </ScrollView>
  );
}
