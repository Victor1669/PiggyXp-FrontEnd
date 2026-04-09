import { useRef, useEffect } from "react";
import { Animated } from "react-native";
import { router } from "expo-router";

import { AnimationUtil } from "Utils/animationUtils";

import Button from "@Components/Button";

export function SkipCardsButton() {
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async function animation() {
      await AnimationUtil({
        animatedValue: buttonOpacity,
        duration: 500,
        toValue: 1,
      });
    })();
  }, []);

  function handleRedirect() {
    router.push("/Welcome");
  }

  return (
    <Animated.View style={{ opacity: buttonOpacity }}>
      <Button
        style={{
          marginVertical: 20,
          backgroundColor: "#000",
        }}
        fontColor="#fff"
        shadowColor="#0000008a"
        onPress={handleRedirect}
      >
        Pular
      </Button>
    </Animated.View>
  );
}
