//#region Importações
import { View } from "react-native";

import { useAuth } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";

import ProgressBar from "@Components/ProgressBar";
import Picture from "@Components/Picture";

import { HomeSliderStyles } from "../Styles/HomeSlider.css";

import { HomeImages } from "../Assets/HomeImages";
import Paragraph from "@Components/Paragraph";
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
  return (
    <View style={HomeSliderStyles.card1}>
      <View>
        <Paragraph fontSize="small" fontWeight="bold" textAlign="left">
          Seção 1, unidade 1
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

  return (
    <View style={HomeSliderStyles.card3}>
      <View style={{ gap: 5 }}>
        <Paragraph fontSize="small" fontWeight="bold" textAlign="left">
          Nível: {user.nivel} XP: {user.xp}
        </Paragraph>
        <ProgressBar width={200} maxValue={10} actualValue={1} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Picture
          style={{ width: 35, height: 35 }}
          folder="home/slider"
          source={coin}
        />
        <Paragraph fontSize="big">{user.coins}</Paragraph>
      </View>
    </View>
  );
}
