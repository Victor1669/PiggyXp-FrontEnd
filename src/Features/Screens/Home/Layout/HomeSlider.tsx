//#region Importações
import { Text, Image, View, FlatList } from "react-native";

import { useAuth } from "@Auth/Contexts/useAuth";

import { screenValues } from "Config/screenValues";
const {
  deviceWidth,
  fontSizes: { BIG_FONT_STYLE, BIGGER_FONT_SIZE },
} = screenValues();

import ProgressBar from "@Components/ProgressBar";

import { HomeSliderStyles } from "../Styles/HomeSlider.css";

import { HomeImages } from "../Assets/HomeImages";
import { GlobalFontColors } from "@Assets/Colors";
const {
  slider: { coin, section },
} = HomeImages;
//#endregion

export default function HomeSlider() {
  return (
    <FlatList
      data={[
        { backgroundColor: "#02B1E2", children: <Card1 /> },
        { backgroundColor: "#008CFF", children: <Card3 /> },
      ]}
      scrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: 100 }}
      renderItem={({ item: { backgroundColor, children } }) => {
        return (
          <CardTemplate backColor={backgroundColor}>{children}</CardTemplate>
        );
      }}
    />
  );
}

function CardTemplate({
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

function Card1() {
  return (
    <View style={HomeSliderStyles.card1}>
      <View>
        <Text style={HomeSliderStyles.cardTitle}>Seção 1, unidade 1</Text>
        <Text
          style={{
            color: GlobalFontColors.Dark,
            fontWeight: "bold",
            fontSize: BIG_FONT_STYLE,
          }}
        >
          Novos horizontes
        </Text>
      </View>
      <Image source={section} />
    </View>
  );
}

function Card3() {
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
        <Image source={coin} />
        <Text
          style={{ color: GlobalFontColors.Dark, fontSize: BIGGER_FONT_SIZE }}
        >
          {user.coins}
        </Text>
      </View>
    </View>
  );
}
