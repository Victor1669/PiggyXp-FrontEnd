import { useState } from "react";

import { screenValues } from "Config/screenValues";

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
  const {
    fontSizes: { SMALL_FONT_SIZE },
  } = screenValues();

  const [buttonColor, setButtonColor] = useState({
    backColor: "rgba(217,217,217, 0.28)",
    shadowColor: "rgba(101,101,101, 0.78)",
  });

  return (
    <Button
      disabled={disabled}
      fontColor={GlobalFontColors.Dark}
      fontSize={SMALL_FONT_SIZE}
      style={{
        backgroundColor: buttonColor.backColor,
        justifyContent: "center",
        paddingVertical: 5,
        height: 60,
      }}
      shadowColor={buttonColor.shadowColor}
      onPress={async () => {
        onPress();
        setButtonColor({ backColor: "green", shadowColor: "green" });

        if (answerIndex !== rightAnswer) {
          setButtonColor({ backColor: "red", shadowColor: "red" });
        }
      }}
    >
      {text}
    </Button>
  );
}
