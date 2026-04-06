//#region Importações
import RN, { Pressable, View } from "react-native";

import { screenValues } from "Config/screenValues";

import Paragraph from "@Components/Paragraph";
import Button from "@Components/Button";
import Picture from "@Components/Picture";
import ProgressBar from "@Components/ProgressBar";

import { AchievementsStyles } from "../Styles/AchievementsCardsStyles.css";
const { card, progressBar, title } = AchievementsStyles;

import { Achievement } from "../Types/AchievementTypes";
import { useAchievements } from "../Contexts/useAchievements";
//#endregion

export function AchievementCard({
  achievement,
  imagePressEnabled = false,
  index,
  style,
  imageStyle,
}: {
  achievement: Achievement;
  index: number;
  imagePressEnabled?: boolean;
  style?: RN.StyleProp<RN.ViewStyle>;
  imageStyle?: RN.StyleProp<RN.ImageStyle>;
}) {
  const { setShowDescription, setSelectedAchievementIndex } = useAchievements();

  const { img, name } = achievement;

  const { deviceWidth } = screenValues();

  const CARD_IMAGE_SIZE = deviceWidth * 0.4;

  return (
    <>
      <View style={[card, style]}>
        <Pressable
          onPress={() => {
            if (!imagePressEnabled) return;

            setShowDescription(true);
            setSelectedAchievementIndex(index);
          }}
        >
          <Picture
            folder="achievements"
            source={img}
            style={[
              {
                width: CARD_IMAGE_SIZE,
                height: CARD_IMAGE_SIZE,
                backgroundColor: "white",
              },
              imageStyle,
            ]}
          />
        </Pressable>
        <Paragraph style={title}>{name}</Paragraph>
        <CardFooter achievement={achievement} index={index} />
      </View>
    </>
  );
}

function CardFooter({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const { setShowRewards, setSelectedAchievementIndex } = useAchievements();

  const { isCollected, isCompleted } = achievement;

  const isCollectable = isCompleted !== isCollected;

  const isFinished = isCompleted && isCollected;

  const actualProgress = achievement.progress.actual;
  const totalProgress = achievement.progress.total;

  const buttonColor = {
    backColor: isCollectable ? "rgb(221, 188, 0)" : "rgba(217,217,217, 0.5)",
    shadowColor: isCollectable ? undefined : "rgba(101,101,101, 0.78)",
  };

  function handlePressCollectable() {
    if (isFinished || !isCollectable) return;
    setShowRewards(true);
    setSelectedAchievementIndex(index);
  }

  return (
    <>
      {isCollectable || isFinished ? (
        <Button
          style={{
            width: "90%",
            margin: 5,
            backgroundColor: buttonColor.backColor,
          }}
          fontSize={20}
          shadowColor={buttonColor.shadowColor}
          disabled={!isCollectable}
          onPress={handlePressCollectable}
        >
          {isFinished ? "Coletado" : isCollectable ? "Coletar" : ""}
        </Button>
      ) : (
        <>
          <ProgressBar
            actualValue={actualProgress}
            maxValue={totalProgress}
            style={progressBar}
          />
          <Paragraph>
            {actualProgress !== null && actualProgress !== undefined
              ? `${actualProgress}/${totalProgress}`
              : "Incompleto"}
          </Paragraph>
        </>
      )}
    </>
  );
}
