import { Dimensions } from "react-native";

export function normalize(size: number) {
  const phoneWindow = Dimensions.get("window");
  const deviceWidth = phoneWindow.width;

  const BASE_WIDTH = 390;
  const scale = deviceWidth / BASE_WIDTH;

  return Math.round(size * scale);
}
