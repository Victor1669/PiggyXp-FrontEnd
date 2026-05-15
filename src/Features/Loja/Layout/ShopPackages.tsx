import { View } from "react-native";
import Paragraph from "@Components/Paragraph";
import Picture from "@Components/Picture";
import Button from "Components/Button";
import { ShopPackagesStyles } from "../Styles/ShopPackages.css";

export default function ShopPackages() {
  const { container, introWrapper, introPicture, introTextWrapper } =
    ShopPackagesStyles;

  return (
    <View style={container}>
      <View style={introWrapper}>
        <Picture folder="loja" source="carrinho" style={introPicture} />
        <View style={introTextWrapper}>
          <Paragraph fontWeight="bold" textAlign="left">
            Pacotes para você
          </Paragraph>
          <Paragraph fontSize="small" textAlign="left">
            Acelere seu progresso com benefícios incríveis
          </Paragraph>
        </View>
      </View>

      <PackageCard />
    </View>
  );
}

function PackageCard() {
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
          onPress={() => {}}
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
