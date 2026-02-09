import { Dimensions } from "react-native";

export function screenValues() {
  const phoneWindow = Dimensions.get("window");

  const deviceWidth = phoneWindow.width;
  const deviceHeight = phoneWindow.height;
  const isDeviceHeigthSmall = phoneWindow.height < 861;

  const TITLE_FONT_SIZE = 32;
  const BIGGER_FONT_SIZE = 28;
  const BIG_FONT_STYLE = 24;
  const DEFAULT_FONT_SIZE = 20;
  const SMALL_FONT_SIZE = 16;
  const VERY_SMALL_FONT_SIZE = 14;

  const fontSizes = {
    /**
     * Fonte para títulos: 32
     */
    TITLE_FONT_SIZE,
    /**
     * Fonte para textos grandes: 28
     */
    BIGGER_FONT_SIZE,
    /**
     * Fonte para textos maiores que o comum: 24
     */
    BIG_FONT_STYLE,
    /**
     * Fonte para texto comum: 20
     */
    DEFAULT_FONT_SIZE,
    /**
     * Fonte para textos pequenos: 16
     */
    SMALL_FONT_SIZE,
    /**
     * Fonte para textos muito pequenos: 14
     */
    VERY_SMALL_FONT_SIZE,
  };

  return { isDeviceHeigthSmall, deviceWidth, deviceHeight, fontSizes };
}
