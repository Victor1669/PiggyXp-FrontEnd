import { useState } from "react";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { DEFAULT_FONT_SIZE },
} = screenValues();

import Button from "@Components/Button";

import { GlobalFontColors } from "@Assets/Colors";

export default function AnswerButton({
  answerIndex,
  rightAnswer,
  text,
  onPress,
  disabled,
}: {
  answerIndex: number;
  rightAnswer: number;
  onPress: () => void;
  text: string;
  disabled: boolean;
}) {
  const [buttonColor, setButtonColor] = useState({
    backColor: "rgba(217,217,217, 0.28)",
    shadowColor: "rgba(101,101,101, 0.78)",
  });
  return (
    <Button
      disabled={disabled}
      fontColor={GlobalFontColors.Dark}
      fontSize={DEFAULT_FONT_SIZE}
      style={{
        backgroundColor: buttonColor.backColor,
        margin: "auto",
        justifyContent: "center",
        height: 72,
      }}
      shadowColor={buttonColor.shadowColor}
      onPress={() => {
        onPress();

        setButtonColor({ backColor: "green", shadowColor: "green" });

        if (answerIndex !== rightAnswer)
          setButtonColor({ backColor: "red", shadowColor: "red" });
      }}
    >
      {text}
    </Button>
  );
}
