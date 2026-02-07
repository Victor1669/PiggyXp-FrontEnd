import RN, { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { GlobalColors } from "../../assets/Colors";
import { useState } from "react";

interface ButtonProps {
  children: string;
  onPress: any;
  style?: RN.StyleProp<any>;
}

export default function Button({ onPress, children, style }: ButtonProps) {
  const [buttonHeight, setButtonHeight] = useState(4);

  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
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
