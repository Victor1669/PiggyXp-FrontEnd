import { useState } from "react";

import { useAchievements } from "../Contexts/useAchievements";
import useAchievementCard from "../Hooks/useAchievementCard";

import Button from "Components/Buttons/Button";
import ProgressBar from "Components/ProgressBar";
import Paragraph from "Components/Paragraph";

import { Achievement } from "../Types/AchievementTypes";

export default function CardFooter({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const { setShowRewards, setSelectedAchievementIndex } = useAchievements();

  const [disableButton, setDisableButton] = useState(false);

  const {
    isCollectable,
    isFinished,
    actualProgress,
    buttonColor,
    totalProgress,
  } = useAchievementCard(achievement);

  function handlePressCollectable() {
    if (isFinished || !isCollectable) return;
    setDisableButton(true);
    setShowRewards(true);
    setSelectedAchievementIndex(index);
  }

  return (
    <>
      {isCollectable || isFinished ? (
        <Button
          style={{
            width: "90%",
            margin: 5,
            backgroundColor: buttonColor.backColor,
          }}
          fontSize={20}
          shadowColor={buttonColor.shadowColor}
          disabled={disableButton || !isCollectable}
          onPress={handlePressCollectable}
        >
          {isFinished ? "Coletado" : isCollectable ? "Coletar" : ""}
        </Button>
      ) : (
        <>
          <ProgressBar
            actualValue={actualProgress}
            maxValue={totalProgress}
            style={{ margin: 5, width: "90%" }}
          />
          <Paragraph>
            {actualProgress !== null && actualProgress !== undefined
              ? `${actualProgress}/${totalProgress}`
              : "Incompleto"}
          </Paragraph>
        </>
      )}
    </>
  );
}
