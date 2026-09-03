import { StyleSheet, TouchableOpacity, View } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors, deviceWidth } = AppConfig;

import { usePurchase } from "../Hooks/usePurchase";

import Picture from "Components/Picture";
import Paragraph from "Components/Paragraph";

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

const { card, cardPicture, purchaseButton } = StyleSheet.create({
  card: {
    backgroundColor: colors.sectionBackColor,
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    width: deviceWidth * 0.45 - 5,
  },
  cardPicture: {
    width: 90,
    height: 90,
  },
  purchaseButton: {
    width: "100%",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#76CF6B",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
