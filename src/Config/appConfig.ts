import { Dimensions } from "react-native";

import { env } from "./env";

import { normalize } from "Utils/mathHelpers";

export class AppConfig {
  static phoneWindow = Dimensions.get("window");

  static deviceWidth = AppConfig.phoneWindow.width;
  static deviceHeight = AppConfig.phoneWindow.height;
  static deviceScale = AppConfig.phoneWindow.scale;
  static isDeviceHeightSmall = AppConfig.phoneWindow.height < 861;
  static isPreviewBuild = env.buildProfile === "preview";
  static showDevTools = false;

  static TABBAR_HEIGHT = normalize(120);

  static fontSizes = {
    TITLE_FONT_SIZE: normalize(32),
    BIGGER_FONT_SIZE: normalize(28),
    BIG_FONT_SIZE: normalize(24),
    DEFAULT_FONT_SIZE: normalize(20),
    SMALL_FONT_SIZE: normalize(16),
    VERY_SMALL_FONT_SIZE: normalize(14),
  };

  static colors = {
    splashBackColor: "#97D98E",
    formButtonBackColor: "#76CF6B",
    tabBarBackColor: "#1F3B66",
    sectionBackColor: "rgb(255,255,255,0.30)",
    contentBackColor: {
      Dark: "#243B53",
      Light: "#D9EDF3",
    },
  };
}
