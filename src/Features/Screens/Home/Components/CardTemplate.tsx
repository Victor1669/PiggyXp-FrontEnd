//#region Importações
import { View } from "react-native";
import { useEffect, useState } from "react";

import { useAuth } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import ProgressBar from "@Components/ProgressBar";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { HomeSliderStyles } from "../Styles/HomeSlider.css";

import { HomeImages } from "../Assets/HomeImages";
const {
  slider: { coin, section },
} = HomeImages;
//#endregion

export function CardTemplate({
  children,
  backColor,
}: {
  children: React.ReactNode;
  backColor: string;
}) {
  const { deviceWidth } = screenValues();

  return (
    <View
      style={{
        backgroundColor: backColor,
        width: deviceWidth * 0.9,
        height: 100,
        marginHorizontal: deviceWidth * 0.05,
        borderRadius: 15,
      }}
    >
      {children}
    </View>
  );
}

export function Card1() {
  const { userUnit } = useStorageItemsContext();

  const [selectedUnit, setSelectedUnit] = useState(1);

  useEffect(() => {
    (async () => {
      const storedUnit = await userUnit.get();
      setSelectedUnit(+storedUnit || 1);
    })();
  }, [userUnit]);

  return (
    <View style={HomeSliderStyles.card1}>
      <View>
        <Paragraph fontSize="small" fontWeight="bold" textAlign="left">
          Unidade {selectedUnit}
        </Paragraph>
        <Paragraph fontWeight="bold" fontSize="big">
          Novos horizontes
        </Paragraph>
      </View>
      <Picture
        style={{ width: 60, height: 60 }}
        folder="home/slider"
        source={section}
      />
    </View>
  );
}

export function Card2() {
  const { user } = useAuth();

  const { nivel, xp, coins, xpProximoNivel } = user;

  return (
    <View style={HomeSliderStyles.card3}>
      <View style={{ gap: 5 }}>
        <Paragraph fontSize="small" fontWeight="bold" textAlign="left">
          Nível: {nivel} XP: {xp}
        </Paragraph>
        <ProgressBar
          style={{ width: 200 }}
          maxValue={xpProximoNivel}
          actualValue={xp}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Picture
          style={{ width: 35, height: 35 }}
          folder="home/slider"
          source={coin}
        />
        <Paragraph fontSize="big">{coins}</Paragraph>
      </View>
    </View>
  );
}
