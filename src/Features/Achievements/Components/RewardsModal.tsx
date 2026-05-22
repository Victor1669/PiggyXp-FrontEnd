import { ResizeMode, Video } from "expo-av";
import { StyleSheet, View } from "react-native";

import { useAchievements } from "../Contexts/useAchievements";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import Button from "@Components/Button";
import DefaultModal from "@Components/DefaultModal";
import Paragraph from "@Components/Paragraph";

export default function RewardsModal() {
  const { showRewards, setShowRewards } = useAchievements();

  const updateUserInfo = useUpdateUserInfo();

  async function handleUpdateRewards() {
    await updateUserInfo();
    setShowRewards(false);
  }

  return (
    <DefaultModal
      showModal={showRewards}
      containerStyle={styles.modalContainer}
    >
      <View style={styles.videoContainer}>
        <Video
          resizeMode={ResizeMode.CONTAIN}
          source={require("../Assets/congratulations.mp4")}
          shouldPlay
          isLooping={true}
          style={styles.video}
        />
      </View>

      <View style={styles.textContainer}>
        <Paragraph fontSize="title" color="lightModeFont" style={styles.title}>
          Parabéns!
        </Paragraph>
        <Paragraph style={styles.subtitle}>
          Você desbloqueou uma nova conquista e sua recompensa já está pronta.
        </Paragraph>
      </View>

      <Button style={styles.button} onPress={handleUpdateRewards}>
        Coletar recompensa
      </Button>
    </DefaultModal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 24,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    width: "90%",
    maxWidth: 340,
    alignSelf: "center",
  },
  videoContainer: {
    width: 200,
    height: 200,
    marginHorizontal: "auto",
    backgroundColor: "#f8f9fa",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 28,
    gap: 8,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
});
