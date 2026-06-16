import { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import { screenValues } from "Config/screenValues";

import Button from "@Components/Button";

import { GlobalFontColors } from "@Assets/Colors";

export default function AnswerButton({
  answerIndex,
  rightAnswer,
  children,
  onPress,
  disabled,
}: {
  answerIndex: number;
  rightAnswer: number;
  onPress: () => void;
  children: string;
  disabled: boolean;
}) {
  const [buttonPressed, setButtonPressed] = useState(false);

  const {
    fontSizes: { SMALL_FONT_SIZE },
  } = screenValues();

  const [buttonColor, setButtonColor] = useState({
    backColor: "rgba(217,217,217, 0.28)",
    shadowColor: "rgba(101,101,101, 0.78)",
  });

  const STYLES: StyleProp<ViewStyle> = {
    backgroundColor: buttonColor.backColor,
    justifyContent: "center",
    paddingVertical: 15,
    minHeight: 72,
  };

  async function handlePress() {
    setButtonPressed(true);
    onPress();

    if (answerIndex !== rightAnswer) {
      setButtonColor({ backColor: "red", shadowColor: "red" });
    } else setButtonColor({ backColor: "green", shadowColor: "green" });
  }

  return (
    <Button
      disabled={disabled || buttonPressed}
      fontColor={GlobalFontColors.Dark}
      fontSize={SMALL_FONT_SIZE}
      style={STYLES}
      shadowColor={buttonColor.shadowColor}
      onPress={handlePress}
    >
      {children}
    </Button>
  );
}
