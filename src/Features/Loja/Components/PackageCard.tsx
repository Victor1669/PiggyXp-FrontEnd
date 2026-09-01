import { StyleSheet, ToastAndroid, View } from "react-native";

import Button from "Components/Buttons/Button";
import Picture from "Components/Picture";
import Paragraph from "Components/Paragraph";

export default function PackageCard() {
  return (
    <View style={packageCard}>
      <Picture folder="loja" source="sacola" style={leftPicture} />

      <MiddlePackagePart />

      <View style={rightWrapper}>
        <Button
          fontSize={20}
          fontColor="#fff"
          style={buyButton}
          onPress={() =>
            ToastAndroid.showWithGravity(
              "Funcionalidade em desenvolvimento",
              3000,
              1,
            )
          }
          numberOfLines={1}
        >
          Comprar
        </Button>
      </View>
    </View>
  );
}

function MiddlePackagePart() {
  return (
    <View style={middleWrapper}>
      <Paragraph
        color="#000"
        fontWeight="bold"
        textAlign="left"
        fontSize="normal"
      >
        Pacotão Explorador
      </Paragraph>

      <View style={benefitRow}>
        <Picture folder="loja" source="coracaoVermelho" style={benefitIcon} />
        <Paragraph color="#000" fontSize="small">
          10 Vidas
        </Paragraph>
      </View>

      <View style={benefitRow}>
        <Picture folder="home" source="slider/coin" style={benefitIcon} />
        <Paragraph color="#000" fontSize="small">
          500 moedas
        </Paragraph>
      </View>
    </View>
  );
}

const {
  benefitIcon,
  benefitRow,
  buyButton,
  leftPicture,
  middleWrapper,
  packageCard,
  rightWrapper,
} = StyleSheet.create({
  packageCard: {
    backgroundColor: "#CAF9FF",
    borderRadius: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  leftPicture: {
    width: 80,
    height: 80,
  },
  middleWrapper: {
    flex: 1,
    gap: 8,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  benefitIcon: {
    width: 20,
    height: 20,
  },
  rightWrapper: {
    justifyContent: "center",
  },
  buyButton: {
    width: "100%",
    paddingVertical: 8,
  },
});
