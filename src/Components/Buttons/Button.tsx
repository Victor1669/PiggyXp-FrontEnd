import { useState } from "react";
import RN, { TouchableOpacity, useWindowDimensions } from "react-native";

import Paragraph from "../Paragraph";

import { GlobalColors } from "@Assets/Colors";

type ButtonType = "warning" | "danger" | "red";

interface ButtonProps {
  children: string;
  onPress: any;
  style?: RN.StyleProp<RN.ViewStyle>;
  testId?: string;
  fontColor?: string;
  shadowColor?: string;
  disabled?: boolean;
  fontSize?: number;
  numberOfLines?: number | undefined;
  type?: ButtonType;
}

const TYPE_STYLES: Record<
  ButtonType,
  { backgroundColor: string; shadowColor: string; fontColor: string }
> = {
  warning: {
    backgroundColor: "gold",
    shadowColor: "rgb(182, 139, 0)",
    fontColor: "#000",
  },
  red: {
    backgroundColor: "rgb(255, 57, 57)",
    shadowColor: "rgb(139, 0, 0)",
    fontColor: "#fff",
  },
  danger: {
    backgroundColor: "rgb(175, 1, 1)",
    shadowColor: "rgb(92, 0, 0)",
    fontColor: "#fff",
  },
};

export default function Button({
  onPress,
  children,
  style,
  testId,
  fontColor,
  shadowColor,
  disabled = false,
  fontSize,
  numberOfLines,
  type,
}: ButtonProps) {
  const [buttonHeight, setButtonHeight] = useState(4);
  const { width } = useWindowDimensions();

  const typeStyle = type ? TYPE_STYLES[type] : undefined;

  const finalFontColor = fontColor || typeStyle?.fontColor || "#000";
  const finalShadowColor = shadowColor || typeStyle?.shadowColor || "#2A7121";

  const BUTTON_BACK_COLOR =
    //@ts-ignore
    style?.backgroundColor ||
    typeStyle?.backgroundColor ||
    GlobalColors.formButtonBackColor;

  return (
    <TouchableOpacity
      testID={testId}
      disabled={disabled}
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => setButtonHeight(0)}
      onPressOut={() => setButtonHeight(4)}
      style={[
        {
          //@ts-ignore
          width: style?.width || width - 40,
          alignItems: "center",
          padding: 12,
          borderRadius: 15,
          backgroundColor: BUTTON_BACK_COLOR,
          marginHorizontal: "auto",

          boxShadow:
            //@ts-ignore
            style?.boxShadow || `0px ${buttonHeight}px 4px ${finalShadowColor}`,
          transform: `translateY(${-buttonHeight}px)`,
        },
        style,
      ]}
    >
      <Paragraph
        numberOfLines={numberOfLines}
        fontWeight="bold"
        fontSize={fontSize ? fontSize : "big"}
        color={finalFontColor}
        style={{ width: "100%" }}
      >
        {children}
      </Paragraph>
    </TouchableOpacity>
  );
}
