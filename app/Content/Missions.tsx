import { MissionsProvider } from "Features/Missions/Contexts/MissionsContext";
import MissionsContainer from "Features/Missions/MissionsContainer";

export default function Missions() {
  return (
    <MissionsProvider>
      <MissionsContainer />
    </MissionsProvider>
  );
}
