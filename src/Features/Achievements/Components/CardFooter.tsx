import { useAchievements } from "../Contexts/useAchievements";

import useAchievementCard from "../Hooks/useAchievementCard";

import Button from "Components/Button";
import ProgressBar from "Components/ProgressBar";
import Paragraph from "Components/Paragraph";

import { AchievementsStyles } from "../Styles/AchievementsCardsStyles.css";
const { progressBar } = AchievementsStyles;

import { Achievement } from "../Types/AchievementTypes";

export default function CardFooter({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const { setShowRewards, setSelectedAchievementIndex } = useAchievements();

  const {
    isCollectable,
    isFinished,
    actualProgress,
    buttonColor,
    totalProgress,
  } = useAchievementCard(achievement);

  function handlePressCollectable() {
    if (isFinished || !isCollectable) return;
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
          disabled={!isCollectable}
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
