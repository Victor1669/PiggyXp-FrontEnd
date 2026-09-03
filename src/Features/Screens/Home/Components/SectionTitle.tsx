import { Pressable, StyleSheet } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import Paragraph from "@Components/Paragraph";

export default function SectionTitle() {
  const { unitTitle } = useLevels();
  const { setShowSheet } = useShowSheet();

  function handleTitlePress() {
    setShowSheet(false);
  }

  return (
    <Pressable onPress={handleTitlePress} style={sectionTitleContainer}>
      <Paragraph style={sectionTitle}>{unitTitle}</Paragraph>
    </Pressable>
  );
}

const { sectionTitle, sectionTitleContainer } = StyleSheet.create({
  sectionTitleContainer: {
    width: "92%",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginBottom: 20,
  },
  sectionTitle: {
    width: "auto",
    margin: "auto",
    paddingHorizontal: 10,
    backgroundColor: colors.contentBackColor.Dark,
    transform: [{ translateY: 10 }],
  },
});
