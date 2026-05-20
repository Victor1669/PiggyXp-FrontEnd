import { View } from "react-native";

import Paragraph from "@Components/Paragraph";

import { MissionsHeaderStyles } from "../Styles/MissionsHeader.css";
import DailyMissionsContainer from "../Components/DailyMissionsContainer";

const { container, headerText } = MissionsHeaderStyles;

export default function MissionsHeader() {
  return (
    <View style={container}>
      <Paragraph textAlign="left" fontWeight="bold" style={headerText}>
        Recompensa disponível ao concluir.
      </Paragraph>

      <DailyMissionsContainer />
    </View>
  );
}
