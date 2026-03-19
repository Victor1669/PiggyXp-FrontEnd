import { useWindowDimensions, View } from "react-native";

import Picture from "@Components/Picture";

import { AchievementsStyles } from "../Styles/Achievements.css";
const { achievementsContainer, achievementList, achievement, seeMore } =
  AchievementsStyles;

import { ProfileImages } from "@Assets/ProfileImages";
import Paragraph from "@Components/Paragraph";
const { trophy, invest } = ProfileImages;

export default function Achievements() {
  const { height } = useWindowDimensions();

  // Isso será pego do back-end no futuro
  const achievementsArray = [trophy, invest].slice(0, 2);
  return (
    <View style={[achievementsContainer, { height: height * 0.13 }]}>
      <Paragraph textAlign="left" style={{ margin: 5 }}>
        Conquistas
      </Paragraph>
      <View style={achievementList}>
        {achievementsArray.map((image, i) => (
          <View key={i} style={achievement}>
            <Picture
              folder="profile"
              style={{ width: "100%", height: "100%" }}
              source={image}
            />
            <View
              style={{
                height: "100%",
                width: 3,
                backgroundColor: "#fff",
              }}
            ></View>
          </View>
        ))}
        {
          // Será um <Link> no futuro para a tela de conquistas
        }
        <Paragraph fontSize="bigger" fontWeight="semibold" style={seeMore}>
          Ver mais
        </Paragraph>
      </View>
    </View>
  );
}
