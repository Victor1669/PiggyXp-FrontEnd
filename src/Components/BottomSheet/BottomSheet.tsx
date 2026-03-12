import { useEffect, useRef } from "react";
import RN, { Animated, PanResponder, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { screenValues } from "Config/screenValues";
const { isDeviceHeigthSmall, deviceHeight, TABBAR_HEIGHT } = screenValues();

import Button from "../Button";

import { BottomSheetStyles } from "./BottomSheet.css";

export default function BottomSheet({
  onButtonPress,
  buttonText,
  textElements,
  yPosition,
  height,
  showSheet,
  setShowSheet,
  style,
  showThumb = true,
  interactive = true,
  startSheetTop = height,
  finalSheetTop = 0,
}: {
  onButtonPress: () => void;
  buttonText: string;
  textElements: React.ReactNode;
  yPosition: Animated.ValueXY;
  height: number;
  showSheet: boolean;
  setShowSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: RN.StyleProp<RN.ViewStyle>;
  showThumb?: boolean;
  interactive?: boolean;
  startSheetTop?: number;
  finalSheetTop?: number;
}) {
  function animateTo(y: number) {
    Animated.spring(yPosition, {
      toValue: { x: 0, y },
      useNativeDriver: true,
      tension: 40,
      friction: 8,
    }).start();
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return interactive;
      },

      onMoveShouldSetPanResponder: (_, gestureState) => {
        return interactive && Math.abs(gestureState.dy) > 5;
      },

      onPanResponderMove: (_, gestureState) => {
        if (!interactive) return;

        const newY = Math.max(0, gestureState.dy);
        yPosition.setValue({ x: 0, y: newY + finalSheetTop });
      },

      onPanResponderRelease: (_, gestureState) => {
        if (!setShowSheet || !interactive) return;

        if (gestureState.dy > 100 || gestureState.vy > 0.5) {
          animateTo(startSheetTop);
          setShowSheet(false);
        } else {
          animateTo(finalSheetTop);
          setShowSheet(true);
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (showSheet) {
      animateTo(finalSheetTop);
    } else {
      animateTo(startSheetTop);
    }
  }, [showSheet]);

  return (
    <>
      <Animated.View
        style={[
          style,
          BottomSheetStyles.container,
          {
            height,
            transform: yPosition.getTranslateTransform(),
            top:
              deviceHeight - 3 * TABBAR_HEIGHT + (isDeviceHeigthSmall ? 30 : 0),
          },
        ]}
      >
        <View
          style={BottomSheetStyles.interactiveView}
          {...panResponder.panHandlers}
        >
          {showThumb && <View style={BottomSheetStyles.thumb} />}
        </View>
        <View>{textElements}</View>
        <Button style={{ margin: "auto" }} onPress={onButtonPress}>
          {buttonText}
        </Button>
      </Animated.View>
    </>
  );
}
