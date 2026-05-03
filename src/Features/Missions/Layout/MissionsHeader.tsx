import { View } from "react-native";

import Paragraph from "@Components/Paragraph";
import MissionProgress from "../Components/MissionProgress";

import { MissionsHeaderStyles } from "../Styles/MissionsHeader.css";

const { container, headerText } = MissionsHeaderStyles;

export default function MissionsHeader() {
  return (
    <View style={container}>
      <Paragraph textAlign="left" fontWeight="bold" style={headerText}>
        Recompensa disponível ao concluir.
      </Paragraph>

      <MissionProgress
        missionText="Complete 20 fases"
        currentValue={10}
        totalValue={20}
      />
    </View>
  );
}
