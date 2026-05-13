import RN, { Text } from "react-native";

import { screenValues } from "Config/screenValues";

import { GlobalFontColors } from "@Assets/Colors";
import { GlobalFonts } from "@Assets/fonts/Fonts";

export default function Paragraph({
  children = "",
  numberOfLines,
  testID,
  fontSize = "normal",
  fontFamily,
  fontWeight,
  color = "darkModeFont",
  textAlign = "center",
  textAlignVertical = "center",
  style,
}: {
  children: React.ReactNode;
  numberOfLines?: number;
  testID?: string;
  fontSize?:
    | "verySmall"
    | "small"
    | "normal"
    | "big"
    | "bigger"
    | "title"
    | (number & {});
  color?: "darkModeFont" | "lightModeFont" | (string & {});
  fontFamily?: keyof typeof GlobalFonts | undefined;
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

  const TEXT_STYLES = [
    {
      fontSize: typeof fontSize === "number" ? fontSize : fontSizeMap[fontSize],
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
  ];

  return (
    <Text numberOfLines={numberOfLines} testID={testID} style={TEXT_STYLES}>
      {children}
    </Text>
  );
}
