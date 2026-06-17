import { ToastAndroid, View } from "react-native";

import Button from "Components/Button";
import Picture from "Components/Picture";
import Paragraph from "Components/Paragraph";

import { ShopPackagesStyles } from "../Styles/ShopPackages.css";

export default function PackageCard() {
  const { packageCard, leftPicture, rightWrapper, buyButton } =
    ShopPackagesStyles;

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
  const { middleWrapper, benefitRow, benefitIcon } = ShopPackagesStyles;
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
