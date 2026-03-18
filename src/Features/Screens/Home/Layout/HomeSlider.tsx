//#region Importações
import { FlatList } from "react-native";

import { Card1, Card3, CardTemplate } from "../Components/CardTemplate";

export default function HomeSlider() {
  return (
    <FlatList
      data={[
        { backgroundColor: "#02B1E2", children: <Card1 /> },
        { backgroundColor: "#008CFF", children: <Card3 /> },
      ]}
      scrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: 100 }}
      renderItem={({ item: { backgroundColor, children } }) => {
        return (
          <CardTemplate backColor={backgroundColor}>{children}</CardTemplate>
        );
      }}
    />
  );
}
