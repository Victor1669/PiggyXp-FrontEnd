import { View, Text, Image } from "react-native";
import { LevelAssets } from "../Assets/LevelAssets";
import Button from "@Components/Button";
import { GlobalFontColors } from "@Assets/Colors";
import { screenValues } from "Config/screenValues";

const {
  fontSizes: { DEFAULT_FONT_SIZE, BIG_FONT_SIZE },
} = screenValues();

export default function LevelConclusionContainer() {
  return (
    <View
      style={{
        gap: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={LevelAssets.homem}
        style={{
          width: "90%",
          aspectRatio: 16 / 9,
        }}
      />
      <Text
        style={{
          color: GlobalFontColors.Dark,
          fontSize: BIG_FONT_SIZE,
          marginHorizontal: 75,
          //   backgroundColor: "red",
          textAlign: "center",
        }}
      >
        Impressionante, você é fora da curva!
      </Text>
      <View style={{ gap: 20 }}>
        <Text
          style={{
            color: "#E2FF41",
            fontSize: BIG_FONT_SIZE,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          3:17
        </Text>
        <View style={{ flexDirection: "row", gap: 70 }}>
          <Text
            style={{
              color: GlobalFontColors.Dark,
              fontSize: DEFAULT_FONT_SIZE,
              fontWeight: "bold",
            }}
          >
            +30 coins
          </Text>
          <Text
            style={{
              color: GlobalFontColors.Dark,
              fontSize: DEFAULT_FONT_SIZE,
              fontWeight: "bold",
            }}
          >
            +150 xp
          </Text>
        </View>
      </View>
      <Button onPress={() => {}} style={{ marginTop: 50 }}>
        Receber xp
      </Button>
    </View>
  );
}
