import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import {
  CARD_WIDTH,
  BOOK_HEIGHT,
  BROWN_MID,
  BROWN_DARK,
  GOLD,
} from "../constants";
import BookContent from "../Components/BookContent";

interface FlippableCardProps {
  leftText: string;
}

export default function FlippableCard({ leftText }: FlippableCardProps) {
  const [flipped, setFlipped] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const frontRotate = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "90deg", "90deg"],
  });

  const backRotate = rotation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["-90deg", "-90deg", "0deg"],
  });

  const handleFlip = () => {
    if (flipped) return;
    Animated.timing(rotation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setFlipped(true));
  };

  return (
    <View style={{ width: CARD_WIDTH, height: BOOK_HEIGHT }}>
      <Animated.View
        style={[
          styles.flipSide,
          {
            width: CARD_WIDTH,
            height: BOOK_HEIGHT,
            transform: [{ rotateY: frontRotate }],
          },
        ]}
        pointerEvents={flipped ? "none" : "auto"}
      >
        <TouchableWithoutFeedback onPress={handleFlip}>
          <View
            style={[
              styles.cardFront,
              { width: CARD_WIDTH, height: BOOK_HEIGHT },
            ]}
          >
            <View style={styles.cardOrnamentTop} />
            <Text style={styles.cardTitle}>Toque para abrir</Text>
            <View style={styles.cardDivider} />
            <View style={styles.cardOrnamentBottom} />
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>

      <Animated.View
        style={[
          styles.flipSide,
          {
            width: CARD_WIDTH,
            height: BOOK_HEIGHT,
            transform: [{ rotateY: backRotate }],
          },
        ]}
        pointerEvents={flipped ? "auto" : "none"}
      >
        <BookContent leftText={leftText} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  flipSide: {
    backfaceVisibility: "hidden",
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardFront: {
    backgroundColor: BROWN_MID,
    borderWidth: 3,
    borderColor: BROWN_DARK,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 20,
  },
  cardOrnamentTop: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: GOLD,
    transform: [{ rotate: "45deg" }],
  },
  cardOrnamentBottom: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: GOLD,
    transform: [{ rotate: "45deg" }],
  },
  cardTitle: {
    fontSize: 13,
    color: GOLD,
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  cardDivider: {
    width: 60,
    height: 1,
    backgroundColor: GOLD,
    opacity: 0.6,
  },
});
