import { FlatList } from "react-native";

import {
  ProgressCard,
  SliderCardTemplate,
  UnitCard,
} from "../Components/CardTemplate";
import { useAutoSlider } from "Hooks/useAutoSlider";

const DATA = [
  { backgroundColor: "#02B1E2", children: <UnitCard /> },
  { backgroundColor: "#008CFF", children: <ProgressCard /> },
];

export default function HomeSlider() {
  const { flatListRef, handleUserInteractionStart } = useAutoSlider({
    totalItems: DATA.length,
    delay: 5000,
    bounce: true,
    peek: true,
  });

  return (
    <FlatList
      ref={flatListRef}
      data={DATA}
      scrollEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height: 110 }}
      onTouchStart={handleUserInteractionStart}
      renderItem={({ item: { backgroundColor, children } }) => (
        <SliderCardTemplate backgroundColor={backgroundColor}>
          {children}
        </SliderCardTemplate>
      )}
    />
  );
}
