import { View } from "react-native";

import Paragraph from "@Components/Paragraph";
import ProgressBar from "Components/ProgressBar";
import Picture from "@Components/Picture";

import { MonthlyMissionsStyles } from "../Styles/MonthlyMissions.css";
import { MissionAssets } from "../Assets/MissionAssets";

export default function MonthlyMissionsContainer() {
  const {
    sectionContainer,
    missionItem,
    progressWrapper,
    progressBar,
    rewardIcon,
    separator,
  } = MonthlyMissionsStyles;

  const missions = [
    { text: "Complete 10 fases intacto", current: 4, total: 10 },
    { text: "Investiu em 5 produtos", current: 2, total: 5 },
    { text: "Ganhou 40 XP", current: 15, total: 40 },
  ];

  return (
    <View style={sectionContainer}>
      {missions.map((mission, index) => (
        <View key={index}>
          <View style={missionItem}>
            <Paragraph textAlign="left" fontWeight="bold">
              {mission.text}
            </Paragraph>

            <View style={progressWrapper}>
              <ProgressBar
                maxValue={mission.total}
                actualValue={mission.current}
                style={progressBar}
              />
              <Picture
                folder="missions"
                source={MissionAssets.chest}
                style={rewardIcon}
              />
            </View>
          </View>

          {index !== missions.length - 1 && <View style={separator} />}
        </View>
      ))}
    </View>
  );
}
