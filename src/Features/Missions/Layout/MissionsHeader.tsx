import { View } from "react-native";

import Paragraph from "@Components/Paragraph";

import { MissionsHeaderStyles } from "../Styles/MissionsHeader.css";
import DailyMissionsContainer from "../Components/DailyMissionsContainer";

const { container, headerText } = MissionsHeaderStyles;

export default function MissionsHeader() {
  return (
    <View style={container}>
      <Paragraph style={headerText}>
        Dica: As recompensas das missões são adicionadas automaticamente assim
        que forem cumpridas
      </Paragraph>

      <DailyMissionsContainer />
    </View>
  );
}
