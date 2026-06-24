import { View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Paragraph from "@Components/Paragraph";
import DailyMissionsContainer from "../Components/DailyMissionsContainer";

import { MissionsHeaderStyles } from "../Styles/MissionsHeader.css";
const { container, headerText } = MissionsHeaderStyles;

export default function MissionsHeader() {
  const { isLoading } = useMissions();

  if (!isLoading)
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
