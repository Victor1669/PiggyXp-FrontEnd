import { useEffect, useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { AppConfig } from "Config/appConfig";

interface BottomSheetProps {
  children: React.ReactNode;
  yPosition: Animated.ValueXY;
  height: number;
  showSheet: boolean;
  setShowSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>;
  showThumb?: boolean;
  interactive?: boolean;
  startSheetTop?: number;
  finalSheetTop?: number;
}

interface PanResponderConfig {
  height: number;
  interactive: boolean;
  startSheetTop: number;
  finalSheetTop: number;
  setShowSheet?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BottomSheet({
  children,
  yPosition,
  height,
  showSheet,
  setShowSheet,
  style,
  showThumb = true,
  interactive = true,
  startSheetTop = height,
  finalSheetTop = 0,
}: BottomSheetProps) {
  const { isDeviceHeightSmall, deviceHeight, TABBAR_HEIGHT } = AppConfig;

  const isMounted = useRef(false);
  const configRef = useRef<PanResponderConfig>({
    height,
    interactive,
    startSheetTop,
    finalSheetTop,
    setShowSheet,
  });

  useEffect(() => {
    configRef.current = {
      height,
      interactive,
      startSheetTop,
      finalSheetTop,
      setShowSheet,
    };
  }, [height, interactive, startSheetTop, finalSheetTop, setShowSheet]);

  function animateTo(y: number, immediate = false) {
    if (immediate) {
      yPosition.setValue({ x: 0, y });
      return;
    }

    Animated.spring(yPosition, {
      toValue: { x: 0, y },
      useNativeDriver: true,
      tension: 40,
      friction: 8,
    }).start();
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => configRef.current.interactive,
      onPanResponderGrant: () => {
        yPosition.stopAnimation();
      },
      onPanResponderMove: (_e, gestureState) => {
        const { finalSheetTop } = configRef.current;
        const newY = finalSheetTop + gestureState.dy;
        yPosition.setValue({
          x: 0,
          y: newY >= finalSheetTop ? newY : finalSheetTop,
        });
      },
      onPanResponderRelease: (_e, gestureState) => {
        const { height, startSheetTop, finalSheetTop, setShowSheet } =
          configRef.current;

        if (gestureState.dy > height / 3 || gestureState.vy > 0.5) {
          setShowSheet?.(false);
          animateTo(startSheetTop);
        } else {
          animateTo(finalSheetTop);
        }
      },
    }),
  ).current;

  useEffect(() => {
    const targetY = showSheet ? finalSheetTop : startSheetTop;

    if (!isMounted.current) {
      isMounted.current = true;
      animateTo(targetY, true);
      return;
    }

    animateTo(targetY);
  }, [showSheet, startSheetTop, finalSheetTop]);

  return (
    <Animated.View
      style={[
        container,
        {
          height,
          transform: yPosition.getTranslateTransform(),
          top:
            deviceHeight - 3 * TABBAR_HEIGHT + (isDeviceHeightSmall ? 30 : 0),
        },
        style,
      ]}
    >
      <View style={interactiveView} {...panResponder.panHandlers}>
        {showThumb && <View style={thumb} />}
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </Animated.View>
  );
}

const SHEET_MARGIN_BOTTOM = 20;

export const { container, interactiveView, thumb } = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "rgb(85, 105, 78)",
    zIndex: 999,
    borderRadius: 50,
    paddingBottom: SHEET_MARGIN_BOTTOM,
    position: "absolute",
  },
  interactiveView: {
    width: "100%",
    height: 30,
    padding: 10,
    margin: 0,
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  thumb: {
    backgroundColor: "#ADADAD",
    width: 150,
    height: 15,
    borderRadius: 10,
    margin: "auto",
  },
});
