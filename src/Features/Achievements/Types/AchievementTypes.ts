import { User } from "@Auth/Contexts/useAuth";

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
  userField: keyof User;
  total: number;
};
