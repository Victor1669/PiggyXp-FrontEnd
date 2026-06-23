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

const offensiveDays = [
  { initials: "Seg", completed: false },
  { initials: "Ter", completed: true },
  { initials: "Qua", completed: false },
  { initials: "Qui", completed: false },
  { initials: "Sex", completed: false },
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
            <View
              style={[
                dayCircle,
                {
                  backgroundColor: day.completed
                    ? "rgb(255, 174, 0)"
                    : i % 2
                      ? "#999999"
                      : "#38AFC4",
                },
              ]}
              key={i}
            >
              <Paragraph fontSize="verySmall">{day.initials[0]}</Paragraph>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
