import { StyleProp, Text, TextStyle } from "react-native";

import { AppConfig } from "Config/appConfig";

import { GlobalFonts } from "@Assets/fonts/Fonts";

export default function Paragraph({
  children = "",
  numberOfLines,
  testID,
  fontSize = "normal",
  fontFamily,
  fontWeight,
  color = "#fff",
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
  color?: string;
  fontFamily?: keyof typeof GlobalFonts | undefined;
  style?: StyleProp<TextStyle>;
  fontWeight?: TextStyle["fontWeight"];
  textAlign?: TextStyle["textAlign"];
  textAlignVertical?: TextStyle["textAlignVertical"];
}) {
  const {
    VERY_SMALL_FONT_SIZE: verySmall,
    SMALL_FONT_SIZE: small,
    DEFAULT_FONT_SIZE: normal,
    BIG_FONT_SIZE: big,
    BIGGER_FONT_SIZE: bigger,
    TITLE_FONT_SIZE: title,
  } = AppConfig.fontSizes;

  const fontSizeMap = {
    verySmall,
    small,
    normal,
    big,
    bigger,
    title,
  } satisfies Record<typeof fontSize, number>;

  const TEXT_STYLES = [
    {
      fontSize: typeof fontSize === "number" ? fontSize : fontSizeMap[fontSize],
      color,
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
