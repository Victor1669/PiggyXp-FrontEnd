import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
export const OUTER_MARGIN = 24 * 2;
export const COVER_PADDING = 18 * 2;
export const COVER_BORDER = 3 * 2;
export const SPINE_WIDTH = 10;
export const CARD_WIDTH = SCREEN_WIDTH - OUTER_MARGIN;
export const FULL_INNER = CARD_WIDTH - COVER_PADDING - COVER_BORDER;
export const PAGE_WIDTH = FULL_INNER - SPINE_WIDTH;
export const BOOK_HEIGHT = SCREEN_HEIGHT * 0.6;

export const BROWN_DARK = "#3B1F0A";
export const BROWN_MID = "#6B3A1F";
export const BROWN_ACCENT = "#C8843C";
export const GOLD = "#C9A84C";
export const CREAM = "#F7F2E8";
export const CREAM_DARK = "#EDE4D0";
export const INK_LIGHT = "#3D2B10";
