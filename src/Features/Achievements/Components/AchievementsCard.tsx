import { Pressable, View } from "react-native";
import type { ViewStyle, StyleProp, ImageStyle } from "react-native";

import { useAchievements } from "../Contexts/useAchievements";

import Picture from "@Components/Picture";
import CardFooter from "./CardFooter";

import { AchievementsStyles } from "../Styles/AchievementsCardsStyles.css";
const { card, cardImage } = AchievementsStyles;

import { Achievement } from "../Types/AchievementTypes";

export function AchievementCard({
  achievement,
  index,
  style,
  imagePressEnabled = false,
}: {
  achievement: Achievement;
  index: number;
  style?: StyleProp<ViewStyle>;
  imagePressEnabled?: boolean;
}) {
  const { img } = achievement;

  return (
    <>
      <View style={[card, style]}>
        <CardImage {...{ imagePressEnabled, img, index }} />
        <CardFooter {...{ achievement, index }} />
      </View>
    </>
  );
}

function CardImage({
  imagePressEnabled = false,
  img,
  index,
}: {
  imagePressEnabled?: boolean;
  img: string;
  index: number;
}) {
  const { setShowDescription, setSelectedAchievementIndex } = useAchievements();

  return (
    <Pressable
      onPress={() => {
        if (!imagePressEnabled) return;

        setShowDescription(true);
        setSelectedAchievementIndex(index);
      }}
    >
      <Picture folder="achievements" source={img} style={cardImage} />
    </Pressable>
  );
}
