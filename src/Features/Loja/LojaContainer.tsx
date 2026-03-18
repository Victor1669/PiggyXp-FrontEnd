import { View, Text } from "react-native";

import { screenValues } from "Config/screenValues";
import { GlobalFontColors } from "@Assets/Colors";

export default function LojaContainer() {
  const {
    fontSizes: { DEFAULT_FONT_SIZE },
  } = screenValues();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ fontSize: DEFAULT_FONT_SIZE, color: GlobalFontColors.Dark }}
      >
        Loja
      </Text>
    </View>
  );
}
