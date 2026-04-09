import RN, { Text } from "react-native";

import { screenValues } from "Config/screenValues";

import { GlobalFontColors } from "@Assets/Colors";
import { GlobalFonts } from "@Assets/fonts/Fonts";

export default function Paragraph({
  testID,
  children = "",
  fontSize = "normal",
  fontFamily,
  fontWeight,
  color = "darkModeFont",
  textAlign = "center",
  textAlignVertical = "center",
  style,
}: {
  testID?: string;
  children: React.ReactNode;
  fontSize?:
    | "verySmall"
    | "small"
    | "normal"
    | "big"
    | "bigger"
    | "title"
    | (number & {});
  color?: "darkModeFont" | "lightModeFont" | (string & {});
  fontFamily?: "madimiOne" | undefined;
  style?: RN.StyleProp<RN.TextStyle>;
  fontWeight?: RN.TextStyle["fontWeight"];
  textAlign?: RN.TextStyle["textAlign"];
  textAlignVertical?: RN.TextStyle["textAlignVertical"];
}) {
  const {
    fontSizes: {
      VERY_SMALL_FONT_SIZE: verySmall,
      SMALL_FONT_SIZE: small,
      DEFAULT_FONT_SIZE: normal,
      BIG_FONT_SIZE: big,
      BIGGER_FONT_SIZE: bigger,
      TITLE_FONT_SIZE: title,
    },
  } = screenValues();

  const fontSizeMap = {
    verySmall,
    small,
    normal,
    big,
    bigger,
    title,
  } satisfies Record<typeof fontSize, number>;

  const { Dark, Light } = GlobalFontColors;

  return (
    <Text
      testID={testID}
      style={[
        {
          fontSize:
            typeof fontSize === "number" ? fontSize : fontSizeMap[fontSize],
          color:
            color === "darkModeFont"
              ? Dark
              : color === "lightModeFont"
                ? Light
                : color,
          fontFamily: fontFamily ? GlobalFonts[fontFamily] : undefined,
          fontWeight,
          textAlign,
          textAlignVertical,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
