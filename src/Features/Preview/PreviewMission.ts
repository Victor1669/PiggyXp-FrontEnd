import { UserMission } from "Features/Missions/Types/MissionsTypes";

const generateMockProgress = (target: number) => {
  const progress = Math.floor(Math.random() * (target + 2));
  return {
    progress: Math.min(progress, target),
    completed: progress >= target,
  };
};

const baseMissions = [
  {
    name: "Complete 1 fases",
    target: 1,
    frequency: "daily",
    xp: 50,
    coins: 10,
    type: "complete_phases",
    condition: null,
  },
  {
    name: "Acertar 20 questões sem errar",
    target: 20,
    frequency: "daily",
    xp: 100,
    coins: 20,
    type: "correct_answers",
    condition: "no_errors",
  },
  {
    name: "Acerte 15 questões",
    target: 15,
    frequency: "daily",
    xp: 60,
    coins: 12,
    type: "correct_answers",
    condition: null,
  },
  {
    name: "Acertar 50 questões",
    target: 50,
    frequency: "weekly",
    xp: 200,
    coins: 40,
    type: "correct_answers",
    condition: null,
  },
  {
    name: "Sequência de estudo 7 dias",
    target: 7,
    frequency: "weekly",
    xp: 250,
    coins: 50,
    type: "streak",
    condition: null,
  },
  {
    name: "complete 3 fases",
    target: 3,
    frequency: "weekly",
    xp: 120,
    coins: 25,
    type: "complete_phases",
    condition: null,
  },
  {
    name: "Usar o app por 20 dias",
    target: 20,
    frequency: "monthly",
    xp: 500,
    coins: 100,
    type: "login_days",
    condition: null,
  },
  {
    name: "Finalizar 10 fases",
    target: 10,
    frequency: "monthly",
    xp: 400,
    coins: 80,
    type: "complete_phases",
    condition: null,
  },
  {
    name: "Finalize 1 unidade",
    target: 1,
    frequency: "monthly",
    xp: 600,
    coins: 120,
    type: "complete_unit",
    condition: null,
  },
];

export const PreviewMissions = baseMissions.map((mission) => {
  const status = generateMockProgress(mission.target);
  return {
    ...status,
    reset_at: new Date().toISOString(),
    user: { id: 1 },
    mission,
  };
}) as UserMission[];
