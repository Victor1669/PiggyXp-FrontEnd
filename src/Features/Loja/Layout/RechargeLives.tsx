import { View, FlatList } from "react-native";

import Paragraph from "@Components/Paragraph";
import Picture from "@Components/Picture";
import ProductCard from "../Components/ProductCard";

import { RechargeLivesStyles } from "../Styles/RechargeLives.css";
const { container, introWrapper, introPicture, introTextWrapper } =
  RechargeLivesStyles;

import { ProductType } from "../Types/ProductType";

const RECHARGE_OPTIONS: ProductType[] = [
  { id: 1, label: "2 Vidas", price: 100, icon: "coracaoVermelho" },
  { id: 2, label: "4 Vidas", price: 200, icon: "quatroCoracoes" },
];

export default function RechargeLives() {
  return (
    <View style={container}>
      <View style={introWrapper}>
        <Picture folder="loja" source="coracaoAzul" style={introPicture} />
        <View style={introTextWrapper}>
          <Paragraph fontWeight="bold" textAlign="left">
            Recarga de Vidas
          </Paragraph>
          <Paragraph fontSize="small" textAlign="left">
            Mais vidas para continuar sua jornada
          </Paragraph>
        </View>
      </View>

      <FlatList
        data={RECHARGE_OPTIONS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}
