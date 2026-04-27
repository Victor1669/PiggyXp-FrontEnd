import { useEffect, useRef } from "react";
import RN, { Animated, PanResponder, View } from "react-native";
import { screenValues } from "Config/screenValues";
import { BottomSheetStyles } from "./BottomSheet.css";

const { isDeviceHeigthSmall, deviceHeight, TABBAR_HEIGHT } = screenValues();

interface BottomSheetProps {
  children: React.ReactNode;
  yPosition: Animated.ValueXY;
  height: number;
  showSheet: boolean;
  setShowSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: RN.StyleProp<RN.ViewStyle>;
  showThumb?: boolean;
  interactive?: boolean;
  startSheetTop?: number;
  finalSheetTop?: number;
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
      onStartShouldSetPanResponder: () => interactive,
      onPanResponderGrant: () => {
        yPosition.stopAnimation();
      },
      onPanResponderMove: (e, gestureState) => {
        const newY = finalSheetTop + gestureState.dy;
        if (newY >= finalSheetTop) {
          yPosition.setValue({ x: 0, y: newY });
        } else {
          yPosition.setValue({ x: 0, y: finalSheetTop });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > height / 3 || gestureState.vy > 0.5) {
          if (setShowSheet) setShowSheet(false);
          animateTo(startSheetTop);
        } else {
          animateTo(finalSheetTop);
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
      <View style={{ flex: 1 }}>{children}</View>
    </Animated.View>
  );
}
