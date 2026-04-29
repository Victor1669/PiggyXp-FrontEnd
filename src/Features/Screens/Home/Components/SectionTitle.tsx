import { Pressable } from "react-native";

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import Paragraph from "@Components/Paragraph";

import { HomeContentStyles } from "../Styles/HomeContent.css";
const { sectionTitle, sectionTitleContainer } = HomeContentStyles;

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
