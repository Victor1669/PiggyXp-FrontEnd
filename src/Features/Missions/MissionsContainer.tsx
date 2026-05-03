import { ScrollView, View } from "react-native";

import MissionsHeader from "./Layout/MissionsHeader";
import WeeklyMissions from "./Layout/WeeklyMissions";
import MonthlyMissions from "./Layout/MonthlyMissions";

export default function MissionsContainer() {
  return (
    <View style={{ flex: 1, paddingBottom: 130 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MissionsHeader />
        <WeeklyMissions />
        <MonthlyMissions />
      </ScrollView>
    </View>
  );
}
