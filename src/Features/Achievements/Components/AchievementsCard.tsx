import { Pressable, StyleSheet, View } from "react-native";
import type { ViewStyle, StyleProp } from "react-native";

import { screenValues } from "Config/screenValues";
const { deviceWidth } = screenValues();
const CARD_IMAGE_SIZE = deviceWidth * 0.4;

import { useAchievements } from "../Contexts/useAchievements";

import Picture from "@Components/Picture";
import CardFooter from "./CardFooter";

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

const { card, cardImage } = StyleSheet.create({
  card: {
    margin: 5,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",

    width: 196,
    height: 196,
    marginTop: 20,
    marginBottom: 80,
    backgroundColor: "#1F3B66",
    borderRadius: "50%",
    boxShadow: "0 4px 4px black",
  },
  cardImage: {
    width: CARD_IMAGE_SIZE,
    height: CARD_IMAGE_SIZE,
    marginBottom: 20,
    top: -7,
  },
});
