import { View } from "react-native";

import { screenValues } from "Config/screenValues";

import NavigationButton from "./Components/NavigationButton";
import ShowTokenButton from "./Components/ShowTokenButton";

export default function DevToolsContainer() {
  const { showDevTools } = screenValues();

  if (__DEV__)
    if (showDevTools)
      return (
        <View style={{ gap: 15, paddingTop: 30 }}>
          <NavigationButton />
          <ShowTokenButton />
        </View>
      );
}
