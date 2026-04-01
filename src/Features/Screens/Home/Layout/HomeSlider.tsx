//#region Importações
import { FlatList } from "react-native";

import { Card1, Card2, CardTemplate } from "../Components/CardTemplate";

export default function HomeSlider() {
  return (
    <FlatList
      data={[
        { backgroundColor: "#02B1E2", children: <Card1 /> },
        { backgroundColor: "#008CFF", children: <Card2 /> },
      ]}
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
