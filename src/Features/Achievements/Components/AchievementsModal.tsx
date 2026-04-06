import { View } from "react-native";

import DefaultModal from "@Components/DefaultModal";
import Button from "@Components/Button";
import Paragraph from "@Components/Paragraph";
import { AchievementCard } from "./AchievementsCard";

import { AchievementsModalStyles } from "../Styles/AchievementsModalStyles.css";
const { container, card, descriptionView, button } = AchievementsModalStyles;

import { useAchievements } from "../Contexts/useAchievements";

export default function AchievementModal() {
  const {
    showDescription,
    setShowDescription,
    selectedAchievementIndex,
    selectedAchievement,
  } = useAchievements();

  return (
    <DefaultModal showModal={showDescription} containerStyle={container}>
      {selectedAchievementIndex !== null ? (
        <AchievementCard
          style={card}
          achievement={selectedAchievement}
          imageStyle={{ width: 275, height: 275 }}
          index={selectedAchievementIndex}
        />
      ) : (
        <></>
      )}
      <View style={descriptionView}>
        <Paragraph color="lightModeFont" fontWeight="600">
          {selectedAchievement?.description}
        </Paragraph>
      </View>
      <Button style={button} onPress={() => setShowDescription(false)}>
        Fechar descrição
      </Button>
    </DefaultModal>
  );
}
