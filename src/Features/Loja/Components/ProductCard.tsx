import { TouchableOpacity, View } from "react-native";

import { usePurchase } from "../Hooks/usePurchase";

import Picture from "Components/Picture";
import Paragraph from "Components/Paragraph";

import { RechargeLivesStyles } from "../Styles/RechargeLives.css";
const { card, cardPicture, purchaseButton } = RechargeLivesStyles;

import { ProductType } from "../Types/ProductType";

export default function ProductCard({ product }: { product: ProductType }) {
  const purchase = usePurchase();

  const { icon, id, label, price } = product;

  return (
    <View style={card}>
      <Picture folder="loja" source={icon} style={cardPicture} />
      <Paragraph fontWeight="bold" fontSize="small">
        {label}
      </Paragraph>
      <TouchableOpacity style={purchaseButton} onPress={() => purchase(id)}>
        <Paragraph color="#000">{price}</Paragraph>
        <Picture
          folder="home"
          source="slider/coin"
          style={{ width: 22, height: 22 }}
        />
      </TouchableOpacity>
    </View>
  );
}
