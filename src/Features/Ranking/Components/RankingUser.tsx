import { useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
} from "react-native";

import { AppConfig } from "Config/appConfig";

import Paragraph from "Components/Paragraph";

export default function RankingUser({
  name,
  isYourUser,
  position: userPosition,
  user_img,
  xp,
  nivel,
}: {
  name: string;
  isYourUser: boolean;
  position: number;
  user_img: any;
  xp: number;
  nivel: number;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpand} activeOpacity={0.9}>
      <View
        style={[
          container,
          {
            backgroundColor: isYourUser ? "#006986" : "#02B1E2",
          },
        ]}
      >
        {/* PRIMEIRA LINHA: Posição, Avatar, Nome e Chevron */}
        <View style={firstRow}>
          <View style={imageSection}>
            <Paragraph fontWeight="bold" fontSize="big" style={position}>
              {userPosition}
            </Paragraph>
            <Image style={avatar as any} source={user_img} />
          </View>

          <View style={usernameContainer}>
            <Paragraph
              style={{ marginRight: 40 }}
              textAlign="right"
              fontWeight="bold"
              numberOfLines={1}
            >
              {name}
            </Paragraph>
          </View>

          <Chevron direction={expanded ? "up" : "down"} />
        </View>

        {/* SEGUNDA LINHA: Conteúdo expandido (Nível e XP) */}
        {expanded && (
          <View style={secondRow}>
            <Paragraph style={{ marginRight: 10 }}>Nível: {nivel}</Paragraph>
            <View>
              <Paragraph color="lightModeFont" style={xpContainer}>
                {xp} XP
              </Paragraph>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const Chevron = ({ direction = "down" }: { direction: "up" | "down" }) => (
  <View
    style={[
      chevron,
      {
        transform: [{ rotate: direction === "down" ? "45deg" : "-135deg" }],
        position: "absolute",
        right: 8,
        top: "35%",
      },
    ]}
  />
);

export const {
  avatar,
  chevron,
  container,
  firstRow,
  imageSection,
  position,
  secondRow,
  usernameContainer,
  xpContainer,
} = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginVertical: 6,
  },
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageSection: {
    flexDirection: "row",
    alignItems: "center",
    width: AppConfig.deviceWidth * 0.25,
    gap: 20,
  },
  position: {
    width: 32,
    textAlign: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "white",
  },
  usernameContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  chevron: {
    width: 12,
    height: 12,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#fff",
    transform: [{ rotate: "45deg" }],
    position: "absolute",
    right: 8,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 8,
    width: "100%",
  },
  xpContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
});
