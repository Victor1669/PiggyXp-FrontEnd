//#region Importações
import { Text, View } from "react-native";

import { useAuth } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";
const {
  deviceWidth,
  fontSizes: { BIG_FONT_SIZE, BIGGER_FONT_SIZE },
} = screenValues();

import ProgressBar from "@Components/ProgressBar";
import Picture from "@Components/Picture";

import { HomeSliderStyles } from "../Styles/HomeSlider.css";

import { GlobalFontColors } from "@Assets/Colors";
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
        <Text style={HomeSliderStyles.cardTitle}>Seção 1, unidade 1</Text>
        <Text
          style={{
            color: GlobalFontColors.Dark,
            fontWeight: "bold",
            fontSize: BIG_FONT_SIZE,
          }}
        >
          Novos horizontes
        </Text>
      </View>
      <Picture
        style={{ width: 60, height: 60 }}
        folder="home/slider"
        source={section}
      />
    </View>
  );
}

export function Card3() {
  const { user } = useAuth();

  return (
    <View style={HomeSliderStyles.card3}>
      <View style={{ gap: 5 }}>
        <Text style={HomeSliderStyles.cardTitle}>
          Nível: {user.nivel} XP: {user.xp}
        </Text>
        <ProgressBar width={200} maxValue={10} actualValue={1} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Picture
          style={{ width: 35, height: 35 }}
          folder="home/slider"
          source={coin}
        />
        <Text
          style={{ color: GlobalFontColors.Dark, fontSize: BIGGER_FONT_SIZE }}
        >
          {user.coins}
        </Text>
      </View>
    </View>
  );
}
