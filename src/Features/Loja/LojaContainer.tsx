import { ScrollView, View } from "react-native";
import LojaHeader from "./Layout/LojaHeader";
import RechargeLives from "./Layout/RechargeLives";
import ShopPackages from "./Layout/ShopPackages";
import { screenValues } from "Config/screenValues";

export default function LojaContainer() {
  const { TABBAR_HEIGHT } = screenValues();
  return (
    <View style={{ flex: 1, paddingBottom: TABBAR_HEIGHT }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LojaHeader />
        <RechargeLives />
        <ShopPackages />
      </ScrollView>
    </View>
  );
}
