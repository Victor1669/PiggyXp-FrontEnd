import { useMissions } from "../Contexts/MissionsContext";

import DailyMissionProgress from "./DailyMissionProgress";

export default function DailyMissionsContainer() {
  const { dailyMissions } = useMissions();

  return dailyMissions.map((dailyMission, index) => (
    <DailyMissionProgress key={index} dailyMission={dailyMission} />
  ));
}
