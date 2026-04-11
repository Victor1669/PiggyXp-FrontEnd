//#region Importações
import { FlatList } from "react-native";

import { Card1, Card2, CardTemplate } from "../Components/CardTemplate";

const DATA = [
  { backgroundColor: "#02B1E2", children: <Card1 /> },
  { backgroundColor: "#008CFF", children: <Card2 /> },
];

export default function HomeSlider() {
  return (
    <FlatList
      data={DATA}
      scrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: 110 }}
      renderItem={({ item: { backgroundColor, children } }) => {
        return (
          <CardTemplate backColor={backgroundColor}>{children}</CardTemplate>
        );
      }}
    />
  );
}
