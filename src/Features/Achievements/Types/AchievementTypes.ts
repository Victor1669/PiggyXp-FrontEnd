import { UserType } from "Features/Auth/Types/UserType";

export type Achievement = {
  isCompleted: number;
  isCollected: number;
  img: string;
  name: string;
  progress: { actual: number; total: number };
  description: string;
};

export type AchievementProgress = {
  name: string;
  userField: keyof UserType;
  total: number;
};
