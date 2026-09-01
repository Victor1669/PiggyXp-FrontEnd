import { StatusBar, StyleSheet, View } from "react-native";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import Paragraph from "@Components/Paragraph";
import Picture from "@Components/Picture";

export default function LojaHeader() {
  return (
    <View style={container}>
      <View style={topWrapper}>
        <View style={textWrapper}>
          <Paragraph
            fontFamily="mohave"
            color="#CAF9FF"
            fontSize={50}
            textAlign="left"
          >
            LOJA
          </Paragraph>
          <Paragraph fontSize="small" textAlign="left">
            Use moedas e pacotes para impulsionar sua jornada
          </Paragraph>
        </View>
        <Picture folder="loja" source="sacola" style={headerPicture} />
      </View>
      <CoinContainer />
    </View>
  );
}

function CoinContainer() {
  const { user } = useAuth();
  return (
    <View style={coinContainer}>
      <Picture folder="home" source="slider/coin" style={coinIcon} />
      <Paragraph fontSize="bigger" fontWeight="bold" color="#FFFFFF">
        {user?.coins ?? 0},00
      </Paragraph>
    </View>
  );
}

const {
  coinContainer,
  coinIcon,
  container,
  headerPicture,
  textWrapper,
  topWrapper,
} = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    paddingTop: (StatusBar.currentHeight ?? 55) + 20,
    paddingBottom: 30,
    backgroundColor: "#314A63",
    gap: 20,
  },
  topWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
    gap: 5,
  },
  headerPicture: {
    width: 120,
    height: 120,
  },
  coinContainer: {
    width: "100%",
    backgroundColor: "#02B1E2",

    borderRadius: 25,
    padding: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  coinIcon: {
    width: 50,
    height: 50,
  },
});
