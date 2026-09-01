import { useRef, useState } from "react";
import RN, { Animated, Pressable, TextInput, View } from "react-native";
import RHF from "react-hook-form";

import { AnimationUtil } from "Utils/animationUtils";
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

  const ICON_SIZE = isDeviceHeigthSmall ? 22 : 28;
  const ICON_MARGIN_LEFT = isDeviceHeigthSmall ? 8 : 12;
  const INPUT_PADDING_LEFT = ICON_SIZE + ICON_MARGIN_LEFT + 8;

  const INITIAL_LABEL_BOTTOM = isDeviceHeigthSmall ? 6 : 15;
  const FINAL_LABEL_BOTTOM = isDeviceHeigthSmall ? 40 : 61;
  const INITIAL_LABEL_LEFT = INPUT_PADDING_LEFT;
  const FINAL_LABEL_LEFT = isDeviceHeigthSmall ? 5 : 10;
  const ANIMATION_DURATION = 75;

  const labelMarginLeft = useRef(
    new Animated.Value(INITIAL_LABEL_LEFT),
  ).current;

  const labelMarginBottom = useRef(
    new Animated.Value(INITIAL_LABEL_BOTTOM),
  ).current;

  async function focusMarginBottom() {
    await AnimationUtil({
      animatedValue: labelMarginBottom,
      duration: ANIMATION_DURATION,
      toValue: FINAL_LABEL_BOTTOM,
      useNativeDriver: false,
    });
    await AnimationUtil({
      animatedValue: labelMarginLeft,
      duration: ANIMATION_DURATION,
      toValue: FINAL_LABEL_LEFT,
      useNativeDriver: false,
    });
  }

  async function blurMarginBottom() {
    await AnimationUtil({
      animatedValue: labelMarginLeft,
      duration: ANIMATION_DURATION,
      toValue: INITIAL_LABEL_LEFT,
      useNativeDriver: false,
    });
    await AnimationUtil({
      animatedValue: labelMarginBottom,
      duration: ANIMATION_DURATION,
      toValue: INITIAL_LABEL_BOTTOM,
      useNativeDriver: false,
    });
  }

  return (
    <View>
      {/* Ícone esquerdo */}
      <Picture
        folder="auth"
        style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          marginVertical: isDeviceHeigthSmall ? 12 : 15,
          marginLeft: ICON_MARGIN_LEFT,
          position: "absolute",
          zIndex: 1,
        }}
        source={label === "Nome" ? name : label === "Email" ? email : lock}
      />

      {/* Label animado */}
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

      {/* Input */}
      <TextInput
        autoComplete={autoComplete}
        cursorColor={"#fff"}
        style={[
          inputStyle,
          {
            paddingLeft: INPUT_PADDING_LEFT,
          },
        ]}
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

      {/* Olho da senha */}
      {label === "Senha" && (
        <Pressable
          style={{
            position: "absolute",
            top: isDeviceHeigthSmall ? 12 : 17,
            right: isDeviceHeigthSmall ? 14 : 20,
            width: ICON_SIZE,
            height: ICON_SIZE,
            zIndex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setShowPassword((s) => !s)}
        >
          <Picture
            folder="auth"
            style={{ width: ICON_SIZE - 2, height: ICON_SIZE - 2 }}
            source={showPassword ? eyeClosed : eyeOpen}
          />
        </Pressable>
      )}
    </View>
  );
}
