import { StyleSheet, View } from "react-native";

import Paragraph from "@Components/Paragraph";
import Picture from "@Components/Picture";
import PackageCard from "../Components/PackageCard";

export default function ShopPackages() {
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

const { container, introPicture, introTextWrapper, introWrapper } =
  StyleSheet.create({
    container: {
      paddingHorizontal: "5%",
      marginVertical: 20,
      paddingBottom: 40,
    },
    introWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 15,
      marginBottom: 20,
    },
    introPicture: {
      width: 60,
      height: 60,
    },
    introTextWrapper: {
      flex: 1,
    },
  });
