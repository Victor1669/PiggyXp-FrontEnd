import { useRef } from "react";
import RN, { Animated, TextInput, View } from "react-native";
import RHF from "react-hook-form";

import { Animate } from "Utils/animate";

import { screenValues } from "Config/screenValues";

interface InputTypes {
  testID: string;
  label: string;
  value: string;
  onBlur: RHF.Noop;
  onChange: (...event: any[]) => void;
  inputStyle: RN.StyleProp<RN.TextStyle>;
  autoComplete: RN.TextInputProps["autoComplete"];
  labelStyle: RN.StyleProp<RN.TextStyle>;
}

export default function AnimatedInput({
  testID,
  inputStyle,
  labelStyle,
  label,
  onBlur,
  onChange,
  value,
  autoComplete,
}: InputTypes) {
  const { isDeviceHeigthSmall } = screenValues();

  const INITIAL_LABEL_MARGIN_BOTTOM = isDeviceHeigthSmall ? 6 : 15;
  const FINAL_LABEL_MARGIN_BOTTOM = isDeviceHeigthSmall ? 40 : 61;

  const labelMarginBottom = useRef(
    new Animated.Value(INITIAL_LABEL_MARGIN_BOTTOM),
  ).current;

  async function focusMarginBottom() {
    await Animate({
      animatedValue: labelMarginBottom,
      duration: 100,
      toValue: FINAL_LABEL_MARGIN_BOTTOM,
      useNativeDriver: false,
    });
  }
  async function blurMarginBottom() {
    await await Animate({
      animatedValue: labelMarginBottom,
      duration: 100,
      toValue: INITIAL_LABEL_MARGIN_BOTTOM,
      useNativeDriver: false,
    });
  }

  return (
    <View>
      <Animated.Text
        style={[
          labelStyle,
          { bottom: value ? FINAL_LABEL_MARGIN_BOTTOM : labelMarginBottom },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        autoComplete={autoComplete}
        style={inputStyle}
        testID={testID}
        onFocus={focusMarginBottom}
        onBlur={() => {
          blurMarginBottom();
          onBlur();
        }}
        onChangeText={onChange}
        value={value}
      />
    </View>
  );
}
