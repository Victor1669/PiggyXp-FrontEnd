import { useState } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  StyleProp,
} from "react-native";
import Paragraph from "@Components/Paragraph";

interface ProgressBarProps {
  maxValue: number;
  actualValue: number;
  style?: StyleProp<ViewStyle>;
  children?: string;
}

export default function ProgressBar({
  maxValue,
  actualValue,
  style,
  children,
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

      {children && (
        <View style={styles.textOverlay}>
          <Paragraph
            style={{ mixBlendMode: "difference" }}
            fontSize="small"
            fontWeight="bold"
          >
            {children}
          </Paragraph>
        </View>
      )}
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
    justifyContent: "center",
  },
  bar: {
    height: "100%",
    backgroundColor: "#67E34F",
    borderRadius: 50,
    position: "absolute",
    left: 0,
    top: 0,
  },
  textOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
