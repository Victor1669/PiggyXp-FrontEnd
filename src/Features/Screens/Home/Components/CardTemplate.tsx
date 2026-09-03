import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";

import { AppConfig } from "Config/appConfig";
const { deviceWidth } = AppConfig;

import { getStorageItem, STORAGE_KEYS } from "Utils/securestore";

import { useAuth } from "@Auth/Contexts/useAuth";

import ProgressBar from "@Components/ProgressBar";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

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
    getStorageItem(STORAGE_KEYS.userUnit).then((userUnit) => {
      if (userUnit) {
        setSelectedUnit(Number(userUnit) || 1);
      }
    });
  }, []);

  return (
    <View style={unitCard}>
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
    <View style={progressCard}>
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

const { progressCard, unitCard } = StyleSheet.create({
  unitCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 35,
  },
  progressCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
