import { View } from "react-native";

import Paragraph from "Components/Paragraph";

import { RankingContainerStyles } from "../Styles/RankingContainer.css";
const { dividerContainer, divider } = RankingContainerStyles;

export default function Divider() {
  return (
    <View style={dividerContainer}>
      <Paragraph style={divider} fontFamily="madimiOne">
        Os melhores de todos
      </Paragraph>
    </View>
  );
}
