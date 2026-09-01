import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";

import { useStatus } from "Contexts/StatusContext";

import { usePodiumScaleAnimation } from "../Hooks/usePodiumScaleAnimation";

import { getByPosition } from "../Helpers/getByPosition";
import { AnimateSpringUtil } from "Utils/animationUtils";

import RankingPodiumUser from "./RankingPodiumUser";
import Paragraph from "Components/Paragraph";

import { RankingUserInfoType } from "../Types/RankingTypes";

export default function PodiumUserContainer({
  podiumUser,
  position,
}: {
  podiumUser: RankingUserInfoType;
  position: 1 | 2 | 3;
}) {
  const viewHeight = useRef(new Animated.Value(0)).current;
  const scaleAnim = usePodiumScaleAnimation(position);
  const { isVisible } = useStatus();

  const { img } = podiumUser;
  const userImg = img?.length ? { uri: img } : undefined;

  const finalHeight = getByPosition(150, 125, 100, position);

  const podiumColor = getByPosition("gold", "silver", "#CD7F32", position);

  const podiumBarStyle: ViewStyle = {
    width: "100%",
    height: isVisible ? 0 : viewHeight,
    backgroundColor: podiumColor,
  };

  useEffect(() => {
    if (!isVisible) {
      AnimateSpringUtil({
        animatedValue: viewHeight,
        speed: 3,
        bounciness: 10,
        toValue: finalHeight,
        useNativeDriver: false,
        delay: 900 - position * 200,
      });
    }
  }, [viewHeight, finalHeight, position]);

  return (
    <Animated.View style={[container, { transform: [{ scale: scaleAnim }] }]}>
      <RankingPodiumUser
        {...podiumUser}
        position={position}
        userImg={userImg}
      />
      <View style={podiumContainer}>
        <Animated.View style={podiumBarStyle}>
          <Paragraph
            fontSize="title"
            color="#000"
            textAlignVertical="center"
            style={positionText}
          >
            {position}
          </Paragraph>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const { container, podiumContainer, positionText } = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-end",
    gap: 20,
    width: `30%`,
  },
  podiumContainer: { justifyContent: "flex-end" },
  positionText: { flex: 1 },
});
