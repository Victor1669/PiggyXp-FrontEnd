import { useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useQuiz } from "../Contexts/useQuiz";
import { AnimationUtil } from "Utils/animationUtils";
import { CoinType } from "../Types/LevelTypes";

const COIN_SIZE = 36;
const GRAVITY_DURATION = 900;

export interface CoinRainHandle {
  clearCoins: () => void;
}

interface CoinRainProps {
  emoji?: string;
}

const CoinRain = forwardRef(function CoinRain(
  { emoji = "🪙" }: CoinRainProps,
  ref,
) {
  const { coinList } = useQuiz();
  const lastAnimatedId = useRef(-1);

  async function startCoinAnimation(coin: CoinType) {
    await new Promise((res) => setTimeout(res, coin.delay));

    await Promise.all([
      AnimationUtil({
        animatedValue: coin.translateY,
        toValue: coin.floorY,
        duration: GRAVITY_DURATION,
      }),
      new Promise((resolve) => {
        Animated.sequence([
          Animated.timing(coin.translateX, {
            toValue: coin.x,
            duration: GRAVITY_DURATION,
            useNativeDriver: true,
          }),
        ]).start(resolve);
      }),
    ]);
  }

  useEffect(() => {
    if (coinList.length > 0) {
      const newCoins = coinList.filter(
        (coin) => coin.id > lastAnimatedId.current,
      );

      newCoins.forEach((coin) => {
        startCoinAnimation(coin);
        if (coin.id > lastAnimatedId.current) {
          lastAnimatedId.current = coin.id;
        }
      });
    }
  }, [coinList.length]);

  useImperativeHandle(
    ref,
    () => ({
      clearCoins: () => {},
    }),
    [],
  );

  return (
    <View style={styles.container} pointerEvents="none">
      {coinList.map((coin) => (
        <Animated.Text
          key={coin.id}
          style={[
            styles.coin,
            {
              transform: [
                { translateX: coin.translateX },
                { translateY: coin.translateY },
              ],
            },
          ]}
        >
          {emoji}
        </Animated.Text>
      ))}
    </View>
  );
});

export default CoinRain;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -200,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "visible",
  },
  coin: {
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: COIN_SIZE,
    lineHeight: COIN_SIZE + 4,
  },
});
