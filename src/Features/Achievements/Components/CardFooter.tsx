import { useAchievements } from "../Contexts/useAchievements";

import useAchievementCard from "../Hooks/useAchievementCard";

import Button from "Components/Button";
import ProgressBar from "Components/ProgressBar";
import Paragraph from "Components/Paragraph";

import { AchievementsStyles } from "../Styles/AchievementsCardsStyles.css";
const { progressBar } = AchievementsStyles;

import { Achievement } from "../Types/AchievementTypes";
import { useState } from "react";

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
            style={progressBar}
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
