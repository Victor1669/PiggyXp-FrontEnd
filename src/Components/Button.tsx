import { useState } from "react";

import RN, { Text, TouchableOpacity, useWindowDimensions } from "react-native";

import { GlobalColors } from "@Assets/Colors";

interface ButtonProps {
  children: string;
  onPress: any;
  style?: RN.StyleProp<any>;
  testId?: string;
}

export default function Button({
  onPress,
  children,
  style,
  testId,
}: ButtonProps) {
  const [buttonHeight, setButtonHeight] = useState(4);

  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      testID={testId}
      activeOpacity={1}
      onPress={onPress}
      onPressIn={() => setButtonHeight(0)}
      onPressOut={() => setButtonHeight(4)}
      style={[
        style,
        {
          width: style?.width ? style.width : width - 40,
          alignItems: "center",
          padding: 12,
          borderRadius: 15,
          backgroundColor: GlobalColors.formButtonBackColor,
          boxShadow: `0px ${buttonHeight}px 4px #2A7121`,
          transform: `translateY(${-buttonHeight}px)`,
        },
      ]}
    >
      <Text style={{ fontSize: 24 }}>{children}</Text>
    </TouchableOpacity>
  );
}
