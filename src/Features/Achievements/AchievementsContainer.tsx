import { useEffect, useRef } from "react";
import { FlatList } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useAchievements } from "./Contexts/useAchievements";

import { generateRandomNumber } from "Utils/mathHelpers";

import { useUpdateUserInfo } from "../../Hooks/useUpdateUserInfo";

import AchievementModal from "./Components/AchievementsModal";
import { AchievementCard } from "./Components/AchievementsCard";
import RewardsModal from "./Components/RewardsModal";
import Paragraph from "@Components/Paragraph";

export default function AchievementsContainer() {
  const { user, hasUserInfo } = useAuth();
  const { achievements } = useAchievements();
  const updateUserInfo = useUpdateUserInfo();

  const tipsIndex = useRef(generateRandomNumber());

  const tips = [
    "clique nas imagens para ver a descrição da conquista",
    "Faça níveis para completar as conquistas",
  ];

  useEffect(
    function updateAchievementsStatus() {
      if (!hasUserInfo) {
        router.replace("/");
        return;
      }

      updateUserInfo();
    },
    [user.collectedAchievements],
  );

  if (hasUserInfo)
    return (
      <>
        <Paragraph style={{ marginTop: 25 }}>
          Dica: {tips[tipsIndex.current]}
        </Paragraph>
        <FlatList
          data={achievements}
          numColumns={2}
          style={{
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 50,
          }}
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
