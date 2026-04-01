import { useState } from "react";
import RN, { TouchableOpacity, useWindowDimensions } from "react-native";

import Paragraph from "./Paragraph";

import { GlobalColors } from "@Assets/Colors";
interface ButtonProps {
  children: string;
  onPress: any;
  style?: RN.StyleProp<RN.ViewStyle>;
  testId?: string;
  fontColor?: string;
  shadowColor?: string;
  disabled?: boolean;
  fontSize?: number;
}

export default function Button({
  onPress,
  children,
  style,
  testId,
  fontColor = "#000",
  shadowColor = "#2A7121",
  disabled = false,
  fontSize,
}: ButtonProps) {
  const [buttonHeight, setButtonHeight] = useState(4);
  const { width } = useWindowDimensions();

  const BUTTON_BACK_COLOR =
    //@ts-ignore
    style?.backgroundColor || GlobalColors.formButtonBackColor;

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
            style?.boxShadow || `0px ${buttonHeight}px 4px ${shadowColor}`,
          transform: `translateY(${-buttonHeight}px)`,
        },
        style,
      ]}
    >
      <Paragraph
        fontWeight="bold"
        fontSize={fontSize ? fontSize : "big"}
        color={fontColor}
      >
        {children}
      </Paragraph>
    </TouchableOpacity>
  );
}
