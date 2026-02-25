//#region Importações
import RN, { Text, Image, View, FlatList, StyleSheet } from "react-native";

import { screenValues } from "Config/screenValues";
const {
  deviceWidth,
  isDeviceHeigthSmall,
  fontSizes: { BIG_FONT_STYLE, SMALL_FONT_SIZE, BIGGER_FONT_SIZE },
} = screenValues();

import { GlobalFontColors } from "@Assets/Colors";
import { HomeImages } from "../Assets/HomeImages";
const {
  slider: { coin, section },
} = HomeImages;
//#endregion

const HomeSliderStyles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  cardTitle: {
    color: GlobalFontColors.Dark,
    fontWeight: "bold",
    fontSize: SMALL_FONT_SIZE,
    textAlign: "left",
  },
});

export default function HomeSlider() {
  return (
    <FlatList
      data={[
        { backgroundColor: "#02B1E2", children: <Card1 /> },
        { backgroundColor: "#88AF2D", children: <Card2 /> },
        { backgroundColor: "#008CFF", children: <Card3 /> },
      ]}
      scrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        height: isDeviceHeigthSmall ? 100 : 135,
      }}
      renderItem={({ item: { backgroundColor, children } }) => {
        return (
          <View
            style={{
              backgroundColor,
              width: deviceWidth * 0.9,
              height: isDeviceHeigthSmall ? 80 : 100,
              marginHorizontal: deviceWidth * 0.05,
              borderRadius: 15,
            }}
          >
            {children}
          </View>
        );
      }}
    />
  );
}

function Card1() {
  return (
    <View
      style={[
        HomeSliderStyles.cardContainer,
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 35,
        },
      ]}
    >
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

function Card2() {
  return (
    <View style={{ flex: 1, paddingLeft: 20, justifyContent: "center" }}>
      <Text style={HomeSliderStyles.cardTitle}>Investimentos</Text>
      <Text
        style={{
          color: GlobalFontColors.Dark,
          fontWeight: "bold",
          fontSize: BIGGER_FONT_SIZE,
        }}
      >
        R$ 200000,00
      </Text>
    </View>
  );
}

function Card3() {
  const BAR_WIDTH = 200;

  const barStyle: RN.StyleProp<RN.ViewStyle> = {
    height: 30,
    borderRadius: 50,
  };
  return (
    <View
      style={[
        HomeSliderStyles.cardContainer,
        { flexDirection: "row", alignItems: "center" },
      ]}
    >
      <View style={{ gap: 5 }}>
        <Text style={HomeSliderStyles.cardTitle}>Level: 7 XP: 13450</Text>
        <View style={[barStyle, { width: BAR_WIDTH, backgroundColor: "#fff" }]}>
          <View
            style={[
              barStyle,
              { backgroundColor: "#67E34F", width: BAR_WIDTH * 0.8 },
            ]}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image source={coin} />
        <Text
          style={{ color: GlobalFontColors.Dark, fontSize: BIGGER_FONT_SIZE }}
        >
          350
        </Text>
      </View>
    </View>
  );
}
