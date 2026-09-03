import { ScrollView, View } from "react-native";

import { AppConfig } from "Config/appConfig";

import LojaHeader from "./Layout/LojaHeader";
import RechargeLives from "./Layout/RechargeLives";
import ShopPackages from "./Layout/ShopPackages";

export default function LojaContainer() {
  return (
    <View style={{ flex: 1, paddingBottom: AppConfig.TABBAR_HEIGHT }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LojaHeader />
        <RechargeLives />
        <ShopPackages />
      </ScrollView>
    </View>
  );
}
