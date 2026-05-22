import { Achievement } from "../Types/AchievementTypes";

export default function useAchievementCard(achievement: Achievement) {
  const { isCollected, isCompleted } = achievement;

  const isCollectable = isCompleted !== isCollected;

  const isFinished = isCompleted && isCollected;

  const actualProgress = achievement.progress.actual;
  const totalProgress = achievement.progress.total;

  const buttonColor = {
    backColor: isCollectable ? "rgb(221, 188, 0)" : "rgba(217,217,217, 0.5)",
    shadowColor: isCollectable ? undefined : "rgba(101,101,101, 0.78)",
  };

  return {
    isFinished,
    isCollectable,
    buttonColor,
    actualProgress,
    totalProgress,
  };
}
