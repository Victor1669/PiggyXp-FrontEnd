//#region Importações
import { useEffect, useRef } from "react";
import { FlatList, StyleSheet } from "react-native";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useAchievements } from "./Contexts/useAchievements";

import { useUpdateUserInfo } from "../../Hooks/useUpdateUserInfo";

import { randomNumber } from "Utils/randomNumber";

import AchievementModal from "./Components/AchievementsModal";
import { AchievementCard } from "./Components/AchievementsCard";
import RewardsModal from "./Components/RewardsModal";
import Paragraph from "@Components/Paragraph";
import NotificationButton from "./Components/NotificationButton";
//#endregion

export default function AchievementsContainer() {
  const { user } = useAuth();
  const { achievements } = useAchievements();
  const updateUserInfo = useUpdateUserInfo();

  const tipsIndex = useRef(randomNumber());

  const tips = [
    "clique nas imagens para ver a descrição da conquista",
    "Faça níveis para completar as conquistas",
  ];

  useEffect(
    function updateAchievementsStatus() {
      (async () => {
        await updateUserInfo();
      })();
    },
    [user.collectedAchievements],
  );

  return (
    <>
      {<NotificationButton />}
      <Paragraph style={{ marginTop: 25 }}>
        Dica: {tips[tipsIndex.current]}
      </Paragraph>
      <FlatList
        data={achievements}
        numColumns={2}
        style={achievementsContainerStyles.cardsContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, key) => String(key)}
        renderItem={({ index, item }) => {
          return (
            <AchievementCard
              imagePressEnabled
              achievement={item}
              index={index}
            />
          );
        }}
      />
      <AchievementModal />
      <RewardsModal />
    </>
  );
}

const achievementsContainerStyles = StyleSheet.create({
  cardsContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 50,
  },
});
