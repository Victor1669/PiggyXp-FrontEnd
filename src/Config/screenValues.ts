import { Dimensions } from "react-native";

export function screenValues() {
  const phoneWindow = Dimensions.get("window");

  const deviceWidth = phoneWindow.width;
  const deviceHeight = phoneWindow.height;
  const isDeviceHeigthSmall = phoneWindow.height < 861;
  const showDevTools = false;

  // Largura de referência (ex: iPhone 14 = 390px)
  const BASE_WIDTH = 390;
  const scale = deviceWidth / BASE_WIDTH;

  const normalize = (size: number) => Math.round(size * scale);

  const fontSizes = {
    TITLE_FONT_SIZE: normalize(32),
    BIGGER_FONT_SIZE: normalize(28),
    BIG_FONT_SIZE: normalize(24),
    DEFAULT_FONT_SIZE: normalize(20),
    SMALL_FONT_SIZE: normalize(16),
    VERY_SMALL_FONT_SIZE: normalize(14),
  };

  return {
    isDeviceHeigthSmall,
    deviceWidth,
    deviceHeight,
    fontSizes,
    showDevTools,
  };
}
