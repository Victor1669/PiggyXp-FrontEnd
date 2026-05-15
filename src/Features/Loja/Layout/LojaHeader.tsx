import { View } from "react-native";
import Paragraph from "@Components/Paragraph";
import Picture from "@Components/Picture";
import { useAuth } from "Features/Auth/Contexts/useAuth";
import { LojaHeaderStyles } from "../Styles/LojaHeader.css";

export default function LojaHeader() {
  const { container, topWrapper, textWrapper, headerPicture } =
    LojaHeaderStyles;
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
  const { coinContainer, coinIcon } = LojaHeaderStyles;
  return (
    <View style={coinContainer}>
      <Picture folder="home" source="slider/coin" style={coinIcon} />
      <Paragraph fontSize="bigger" fontWeight="bold" color="#FFFFFF">
        {user?.coins ?? 0},00
      </Paragraph>
    </View>
  );
}
