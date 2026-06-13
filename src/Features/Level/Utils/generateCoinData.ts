import { Animated } from "react-native";

import { screenValues } from "Config/screenValues";

import { CoinType } from "../Types/LevelTypes";

const COIN_SIZE = 36;
const FLOOR_Y = 640;

let globalCoinId = 0;

export function generateCoinData(currentQuestionIndex: number): CoinType {
  const { deviceWidth } = screenValues();

  const id = globalCoinId++;
  const laneCount = 8;
  const index = id % laneCount;

  const margin = 30;
  const usableWidth = deviceWidth - margin * 2;
  const laneWidth = usableWidth / laneCount;

  const baseX = margin + laneWidth * index;
  const jitter = Math.random() * (laneWidth * 0.7);
  const x = baseX + jitter;

  return {
    id,
    translateY: new Animated.Value(-COIN_SIZE),
    translateX: new Animated.Value(x),
    floorY: FLOOR_Y + Math.random() * 20 - currentQuestionIndex * 10,
    delay: index * 80 + Math.random() * 120,
    x,
    swing: Math.random() > 0.5 ? 12 : -12,
  };
}
