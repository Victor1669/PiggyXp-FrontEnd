import { useRef, useState } from "react";
import RN, { Animated, Pressable, TextInput, View } from "react-native";
import RHF from "react-hook-form";

import { Animate } from "Utils/animate";

import { screenValues } from "Config/screenValues";

import Picture from "@Components/Picture";

import { AuthImages } from "@Auth/Assets/AuthImages";
const {
  name,
  email,
  password: { eyeClosed, eyeOpen, lock },
} = AuthImages;

export default function AnimatedInput({
  testID,
  inputStyle,
  labelStyle,
  label,
  onBlur,
  onChange,
  value,
  autoComplete,
}: {
  testID: string;
  label: string;
  value: string;
  onBlur: RHF.Noop;
  onChange: (...event: any[]) => void;
  inputStyle: RN.StyleProp<RN.TextStyle>;
  autoComplete: RN.TextInputProps["autoComplete"];
  labelStyle: RN.StyleProp<RN.TextStyle>;
}) {
  const { isDeviceHeigthSmall } = screenValues();

  const [showPassword, setShowPassword] = useState(false);

  const INITIAL_LABEL_BOTTOM = isDeviceHeigthSmall ? 6 : 15;
  const FINAL_LABEL_BOTTOM = isDeviceHeigthSmall ? 40 : 61;
  const INITIAL_LABEL_LEFT = isDeviceHeigthSmall ? 36 : 50;
  const FINAL_LABEL_LEFT = isDeviceHeigthSmall ? 5 : 10;
  const ANIMATION_DURATION = 75;

  const labelMarginLeft = useRef(
    new Animated.Value(INITIAL_LABEL_LEFT),
  ).current;

  const labelMarginBottom = useRef(
    new Animated.Value(INITIAL_LABEL_BOTTOM),
  ).current;

  async function focusMarginBottom() {
    await Animate({
      animatedValue: labelMarginBottom,
      duration: ANIMATION_DURATION,
      toValue: FINAL_LABEL_BOTTOM,
      useNativeDriver: false,
    });
    await Animate({
      animatedValue: labelMarginLeft,
      duration: ANIMATION_DURATION,
      toValue: FINAL_LABEL_LEFT,
      useNativeDriver: false,
    });
  }
  async function blurMarginBottom() {
    await Animate({
      animatedValue: labelMarginLeft,
      duration: ANIMATION_DURATION,
      toValue: INITIAL_LABEL_LEFT,
      useNativeDriver: false,
    });
    await Animate({
      animatedValue: labelMarginBottom,
      duration: ANIMATION_DURATION,
      toValue: INITIAL_LABEL_BOTTOM,
      useNativeDriver: false,
    });
  }

  return (
    <View>
      <Picture
        folder="auth"
        style={{
          width: 30,
          height: 30,
          marginVertical: 15,
          marginLeft: 10,

          position: "absolute",
        }}
        source={label === "Nome" ? name : label === "Email" ? email : lock}
      />
      <Animated.Text
        style={[
          labelStyle,
          {
            bottom: value ? FINAL_LABEL_BOTTOM : labelMarginBottom,
            left: value ? FINAL_LABEL_LEFT : labelMarginLeft,
          },
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        autoComplete={autoComplete}
        cursorColor={"#fff"}
        style={inputStyle}
        testID={testID}
        onFocus={focusMarginBottom}
        onBlur={() => {
          blurMarginBottom();
          onBlur();
        }}
        onChangeText={onChange}
        value={value}
        secureTextEntry={label === "Senha" && !showPassword}
      />
      {label === "Senha" && (
        <Pressable
          style={{
            position: "absolute",
            marginTop: 17,
            width: 25,
            right: 20,
            zIndex: 2,
          }}
          onPress={() => setShowPassword((s) => !s)}
        >
          <Picture
            folder="auth"
            style={{ width: 25, height: 25 }}
            source={showPassword ? eyeClosed : eyeOpen}
          />
        </Pressable>
      )}
    </View>
  );
}
