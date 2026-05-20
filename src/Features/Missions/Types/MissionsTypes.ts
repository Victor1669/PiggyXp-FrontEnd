export type MissionType =
  | "complete_phases"
  | "correct_answers"
  | "streak"
  | "login_days"
  | "perfect_run"
  | "complete_unit";

export type MissionFrequency = "daily" | "weekly" | "monthly";

export type MissionCondition = "no_errors" | null;

export interface Mission {
  name: string;
  target: number;
  frequency: MissionFrequency;
  xp: number;
  coins: number;
  type: MissionType;
  condition: MissionCondition;
}

export interface UserMission {
  progress: number;
  completed: boolean;
  reset_at: string;
  mission: Mission;
  user: {
    id: number;
  };
}
