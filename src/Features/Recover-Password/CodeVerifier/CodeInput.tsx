import { GlobalColors } from "@Assets/Colors";
import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CodeInputProps {
  length: number;
  code: string[];
  setCode: React.Dispatch<React.SetStateAction<string[]>>;
  onComplete?: (code: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function CodeInput({
  length,
  onComplete,
  containerStyle,
  code,
  setCode,
}: CodeInputProps) {
  const inputs = useRef<(TextInput | null)[]>([]);

  function handleChange(text: string, index: number): void {
    const cleanText = text.replace(/[^0-9]/g, "");

    if (cleanText === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0 && inputs.current[index - 1]) {
        inputs.current[index - 1]?.focus();
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = cleanText[cleanText.length - 1];
    setCode(newCode);

    if (index < length - 1 && inputs.current[index + 1]) {
      inputs.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "") && onComplete) {
      onComplete(newCode.join(""));
    }
  }

  function handleKeyPress(event: any, index: number): void {
    if (
      event.nativeEvent.key === "Backspace" &&
      code[index] === "" &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={[styles.input, digit !== "" && styles.inputFilled]}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          autoFocus={index === 0}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    margin: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 5,
  },
  input: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: GlobalColors.sectionBackColor,
  },
  inputFilled: {
    borderColor: "#007AFF",
  },
});
