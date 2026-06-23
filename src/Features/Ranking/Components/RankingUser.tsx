import { useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

import Paragraph from "Components/Paragraph";
import { RankingUserStyles } from "../Styles/RankingUser.css";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const {
  container,
  firstRow,
  imageSection,
  position,
  avatar,
  usernameContainer,
  chevron,
  secondRow,
  xpContainer,
} = RankingUserStyles;

function RankingUser({
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
            <Image style={avatar} source={user_img} />
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

/* ===================== CHEVRON ===================== */
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
export default RankingUser;
