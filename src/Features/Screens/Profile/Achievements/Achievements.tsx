import { Image, Text, View } from "react-native";

import { AchievementsStyles } from "./Achievements.css";
const {
  achievementsContainer,
  achievementTitle,
  achievementList,
  achievement,
  seeMore,
} = AchievementsStyles;

import { ProfileImages } from "@Assets/ProfileImages";
const { trophy, invest } = ProfileImages;

export default function Achievements() {
  // Isso será pego do back-end no futuro
  const achievementsArray = [trophy, invest].slice(0, 2);
  return (
    <View style={achievementsContainer}>
      <Text style={achievementTitle}>Conquistas</Text>
      <View style={achievementList}>
        {achievementsArray.map((image, i) => (
          <View key={i} style={achievement}>
            <Image style={{ width: "100%", height: "100%" }} source={image} />
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
        <Text style={seeMore}>Ver mais</Text>
      </View>
    </View>
  );
}
