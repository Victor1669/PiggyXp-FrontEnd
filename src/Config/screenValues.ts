import { Dimensions } from "react-native";

import { env } from "./env";

import { normalize } from "Helpers/normalizeSize";

export function screenValues() {
  const phoneWindow = Dimensions.get("window");

  const deviceWidth = phoneWindow.width;
  const deviceHeight = phoneWindow.height;
  const deviceScale = phoneWindow.scale;
  const isDeviceHeigthSmall = phoneWindow.height < 861;
  const isPreviewBuild = env.buildProfile === "preview";
  const showDevTools = true;

  const TABBAR_HEIGHT = 130;

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
    TABBAR_HEIGHT,
    isPreviewBuild,
    deviceScale,
  };
}
