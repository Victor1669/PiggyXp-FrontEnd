import { useWindowDimensions, View } from "react-native";

import Picture from "@Components/Picture";

import { OffensiveStyles } from "../Styles/Offensive.css";

import { ProfileImages } from "@Assets/ProfileImages";
import Paragraph from "@Components/Paragraph";

const {
  offensiveContainer,
  offensiveListContainer,
  offensiveImage,
  offensiveList,
  dayCircle,
} = OffensiveStyles;

interface DayType {
  initials: string;
  completed: boolean;
}

const offensiveDays: DayType[] = [
  { initials: "Seg", completed: false },
  { initials: "Ter", completed: false },
  { initials: "Qua", completed: false },
  { initials: "Qui", completed: false },
  { initials: "Sex", completed: true },
  { initials: "Sab", completed: false },
  { initials: "Dom", completed: false },
];

export default function Offensive() {
  const { height } = useWindowDimensions();

  return (
    <View style={[offensiveContainer, { height: height * 0.14 }]}>
      <Paragraph textAlign="left" style={{ margin: 5 }}>
        Ofensiva
      </Paragraph>
      <View style={offensiveListContainer}>
        <Picture
          folder="profile"
          style={offensiveImage}
          source={ProfileImages.fire}
        />
        <View style={offensiveList}>
          {offensiveDays.map((day, i) => (
            <OffensiveDay isEven={i % 2 === 0} day={day} key={i} />
          ))}
        </View>
      </View>
    </View>
  );
}

function OffensiveDay({ day, isEven }: { day: DayType; isEven: boolean }) {
  return (
    <View
      style={[
        dayCircle,
        {
          backgroundColor: day.completed
            ? "rgb(255, 174, 0)"
            : isEven
              ? "#38AFC4"
              : "#999999",
        },
      ]}
    >
      <Paragraph fontSize="verySmall">{day.initials[0]}</Paragraph>
    </View>
  );
}
