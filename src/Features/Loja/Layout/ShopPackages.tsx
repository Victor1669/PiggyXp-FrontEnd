import { View } from "react-native";

import Paragraph from "@Components/Paragraph";
import Picture from "@Components/Picture";
import PackageCard from "../Components/PackageCard";

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
