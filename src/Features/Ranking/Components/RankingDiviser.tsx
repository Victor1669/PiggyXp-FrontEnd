import { StyleSheet, View } from "react-native";

import { screenValues } from "Config/screenValues";
const { deviceWidth } = screenValues();

import Paragraph from "Components/Paragraph";

import { GlobalColors } from "Assets/Colors";

export default function Divider() {
  return (
    <View style={dividerContainer}>
      <Paragraph style={divider} fontFamily="madimiOne">
        Os melhores de todos
      </Paragraph>
    </View>
  );
}

const { divider, dividerContainer } = StyleSheet.create({
  dividerContainer: {
    borderColor: "#fff",
    borderBottomWidth: 2,
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
  },
  divider: {
    width: deviceWidth * 0.55,
    marginHorizontal: "auto",
    transform: [{ translateY: 15 }],
    backgroundColor: GlobalColors.contentBackColor.Dark,
  },
});
