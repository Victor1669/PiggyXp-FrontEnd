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

export function SliderCardTemplate({
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor: string;
}) {
  const { deviceWidth } = screenValues();

  return (
    <View
      style={{
        backgroundColor,
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

export function UnitCard() {
  const { userUnit } = useStorageItemsContext();
  const [selectedUnit, setSelectedUnit] = useState(1);
  const {
    user: { difficulty },
  } = useAuth();

  function generateDifficultyName(difficulty: number) {
    switch (difficulty) {
      case 0:
        return "Fácil";
      case 1:
        return "Médio";
      case 2:
        return "Difícil";
      default:
        break;
    }
  }

  useEffect(() => {
    (async () => {
      const storedUnit = await userUnit.get();
      setSelectedUnit(+storedUnit || 1);
    })();
  }, [userUnit]);

  return (
    <View style={HomeSliderStyles.unitCard}>
      <View>
        <Paragraph fontSize="small" fontWeight="bold" textAlign="left">
          Unidade {selectedUnit} - {generateDifficultyName(difficulty)}
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

export function ProgressCard() {
  const { user } = useAuth();
  const { nivel, xp, coins, xpProximoNivel } = user;

  return (
    <View style={HomeSliderStyles.progressCard}>
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
