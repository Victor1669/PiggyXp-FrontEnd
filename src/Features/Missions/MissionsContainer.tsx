import { ActivityIndicator, ScrollView, View } from "react-native";

import { useMissions } from "./Contexts/MissionsContext";

import MissionsHeader from "./Layout/MissionsHeader";
import WeeklyMissions from "./Layout/WeeklyMissions";
import MonthlyMissions from "./Layout/MonthlyMissions";

export default function MissionsContainer() {
  const { isLoading } = useMissions();

  return (
    <View style={{ flex: 1, paddingBottom: 130 }}>
      {isLoading ? (
        <View style={{ transform: [{ scale: 3 }], flex: 1 }}>
          <ActivityIndicator size="large" style={{ margin: "auto" }} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <MissionsHeader />
          <WeeklyMissions />
          <MonthlyMissions />
        </ScrollView>
      )}
    </View>
  );
}
