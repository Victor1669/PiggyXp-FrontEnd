import { Image, Text, View } from "react-native";

import { OffensiveStyles } from "./OffensiveStyles.css";

import { ProfileImages } from "@Assets/ProfileImages";

const {
  offensiveContainer,
  offensiveTitle,
  offensiveListContainer,
  offensiveImage,
  offensiveList,
  dayCircle,
  dayText,
} = OffensiveStyles;

export default function Offensive() {
  const offensiveDays = [
    { initials: "Seg", completed: false },
    { initials: "Ter", completed: false },
    { initials: "Qua", completed: false },
    { initials: "Qui", completed: false },
    { initials: "Sex", completed: false },
    { initials: "Sab", completed: false },
    { initials: "Dom", completed: false },
  ];
  return (
    <View style={offensiveContainer}>
      <Text style={offensiveTitle}>Ofensiva</Text>
      <View style={offensiveListContainer}>
        <Image style={offensiveImage} source={ProfileImages.fire} />
        <View style={offensiveList}>
          {offensiveDays.map((day, i) => (
            <View
              style={[
                dayCircle,
                { backgroundColor: i % 2 ? "#999999" : "#38AFC4" },
              ]}
              key={i}
            >
              <Text style={dayText}>{day.initials[0]}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
