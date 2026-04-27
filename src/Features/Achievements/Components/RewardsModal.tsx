import { useEffect } from "react";

import { useAuth } from "@Auth/Contexts/useAuth";
import { useInternetConnection } from "Contexts/useInternetConnection";
import { useAchievements } from "../Contexts/useAchievements";

import { useAudio } from "@Hooks/useAudio";
import { useUpdateUserInfo } from "@Hooks/useUpdateUserInfo";

import { getAchievementsRewards } from "../AchievementsServices";

import Button from "@Components/Button";
import DefaultModal from "@Components/DefaultModal";
import Paragraph from "@Components/Paragraph";
import { ResizeMode, Video } from "expo-av";

export default function RewardsModal() {
  const { user } = useAuth();
  const { showRewards, setShowRewards, selectedAchievementIndex } =
    useAchievements();
  const updateUserInfo = useUpdateUserInfo();

  const { load, stop, play } = useAudio();
  const { getIsConnected } = useInternetConnection();

  useEffect(
    function receiveRewards() {
      if (!showRewards) return;
      try {
        (async () => {
          await Promise.all([
            handleReceiveRewards(),
            load(require("../Assets/applauses.wav")),
          ]);
          await play();
        })();
      } catch (err) {
        console.log(err);
      }

      return () => {
        stop();
      };
    },
    [showRewards],
  );

  async function handleReceiveRewards() {
    if (!getIsConnected()) return;

    await getAchievementsRewards(user.id, {
      achievementId: selectedAchievementIndex,
    });
  }

  async function handleUpdateRewards() {
    await updateUserInfo();
    setShowRewards(false);
  }

  return (
    <DefaultModal
      showModal={showRewards}
      containerStyle={{
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 15,
      }}
    >
      <Video
        resizeMode={ResizeMode.CONTAIN}
        source={require("../Assets/congratulations.mp4")}
        shouldPlay
        isLooping={true}
        style={{ width: 300, height: 300, marginHorizontal: "auto" }}
      />
      <Paragraph fontSize="title" color="lightModeFont">
        Parabéns!
      </Paragraph>
      <Button style={{ width: "100%" }} onPress={handleUpdateRewards}>
        Coletar recompensa
      </Button>
    </DefaultModal>
  );
}
