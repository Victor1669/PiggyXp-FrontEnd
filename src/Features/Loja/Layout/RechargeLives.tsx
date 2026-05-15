import { View, FlatList } from "react-native";
import Paragraph from "@Components/Paragraph";
import Picture from "@Components/Picture";
import Button from "Components/Button";
import { RechargeLivesStyles } from "../Styles/RechargeLives.css";

// Mock temporário para os itens da loja
const RECHARGE_OPTIONS = [
  { id: "1", label: "1 Vida", price: "50", icon: "coracaoVermelho" },
  { id: "2", label: "3 Vidas", price: "120", icon: "quatroCoracoes" },
];

export default function RechargeLives() {
  const {
    container,
    introWrapper,
    introPicture,
    introTextWrapper,
    card,
    cardPicture,
  } = RechargeLivesStyles;

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
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <View style={card}>
            <Picture folder="loja" source={item.icon} style={cardPicture} />
            <Paragraph fontWeight="bold" fontSize="small">
              {item.label}
            </Paragraph>
            <Button
              fontColor="#fff"
              style={{ width: "100%" }}
              onPress={() => {}}
            >
              {"R$ " + item.price}
            </Button>
          </View>
        )}
      />
    </View>
  );
}
