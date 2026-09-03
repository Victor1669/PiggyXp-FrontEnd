import { View } from "react-native";

import { AppConfig } from "Config/appConfig";

import NavigationButton from "./Components/NavigationButton";
import ShowTokenButton from "./Components/ShowTokenButton";
import ClearStorageButton from "./Components/ClearStorageButton";
import ShowPhoneSize from "./Components/ShowPhoneSize";
import ShowModals from "./Components/ShowModals";

export default function DevToolsContainer() {
  if (__DEV__)
    if (AppConfig.showDevTools)
      return (
        <View style={{ gap: 15, paddingTop: 30 }}>
          <NavigationButton />
          <ShowTokenButton />
          <ClearStorageButton />
          <ShowPhoneSize />
          <ShowModals />
        </View>
      );
}
