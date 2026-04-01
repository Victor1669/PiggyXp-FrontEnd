import React, { useState } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  StyleProp,
} from "react-native";

interface ProgressBarProps {
  maxValue: number;
  actualValue: number;
  style?: StyleProp<ViewStyle>;
}

export default function ProgressBar({
  maxValue,
  actualValue,
  style,
}: ProgressBarProps) {
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const progressWidth =
    maxValue > 0 ? (actualValue / maxValue) * containerWidth : 0;

  return (
    <View onLayout={handleLayout} style={[styles.container, style]}>
      <View
        style={[
          styles.bar,
          {
            width: progressWidth,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 50,
    backgroundColor: "#fff",
    overflow: "hidden",
    width: "100%",
  },
  bar: {
    height: "100%",
    backgroundColor: "#67E34F",
    borderRadius: 50,
  },
});
