import { StyleSheet, View } from "react-native";

import DefaultModal from "@Components/DefaultModal";
import Button from "Components/Buttons/Button";
import Paragraph from "@Components/Paragraph";
import { AchievementCard } from "./AchievementsCard";

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
        <>
          <Paragraph color="#fff" fontWeight="bold">
            {selectedAchievement.name}
          </Paragraph>
          <AchievementCard
            style={card}
            achievement={selectedAchievement}
            index={selectedAchievementIndex}
          />
        </>
      ) : (
        <></>
      )}
      <View style={descriptionView}>
        <Paragraph color="#fff" fontWeight="600">
          {selectedAchievement?.description}
        </Paragraph>
      </View>
      <Button style={button} onPress={() => setShowDescription(false)}>
        Fechar descrição
      </Button>
    </DefaultModal>
  );
}

const { button, card, container, descriptionView } = StyleSheet.create({
  container: {
    backgroundColor: "#bbbbbb",
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 20,
  },

  card: { margin: "auto" },

  descriptionView: {
    width: "100%",
    marginHorizontal: "auto",
    marginBottom: 25,
    padding: 15,
  },

  button: {
    width: "90%",
  },
});
