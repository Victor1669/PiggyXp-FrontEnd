import { StyleSheet, View } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import Paragraph from "Components/Paragraph";

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
    width: AppConfig.deviceWidth * 0.55,
    marginHorizontal: "auto",
    transform: [{ translateY: 15 }],
    backgroundColor: colors.contentBackColor.Dark,
  },
});
