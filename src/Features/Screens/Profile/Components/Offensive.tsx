import { StyleSheet, useWindowDimensions, View } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { ProfileImages } from "@Assets/ProfileImages";

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

const {
  dayCircle,
  offensiveContainer,
  offensiveImage,
  offensiveList,
  offensiveListContainer,
} = StyleSheet.create({
  offensiveContainer: {
    width: "90%",
    justifyContent: "center",
    marginTop: 10,
  },
  offensiveListContainer: {
    backgroundColor: colors.sectionBackColor,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
  },
  offensiveImage: {
    width: 75,
    height: 75,
  },
  offensiveList: {
    width: "73%",
    height: "80%",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#fff",
    position: "absolute",
    right: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    padding: 5,
  },
});
