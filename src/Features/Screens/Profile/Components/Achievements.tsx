import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Link } from "expo-router";

import { screenValues } from "Config/screenValues";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { GlobalColors, GlobalFontColors } from "Assets/Colors";
import { ProfileImages } from "@Assets/ProfileImages";
const { trophy, invest } = ProfileImages;

export default function Achievements() {
  const { height } = useWindowDimensions();
  const {
    fontSizes: { BIGGER_FONT_SIZE },
  } = screenValues();

  const achievementsArray = [trophy, invest].slice(0, 2);

  return (
    <View style={[achievementsContainer, { height: height * 0.13 }]}>
      <Paragraph textAlign="left" style={{ margin: 5 }}>
        Conquistas
      </Paragraph>
      <View style={achievementList}>
        {achievementsArray.map((image, i) => (
          <View key={i} style={achievement}>
            <Picture
              folder="profile"
              style={{ width: "100%", height: "100%" }}
              source={image}
            />
            <View
              style={{
                height: "100%",
                width: 3,
                backgroundColor: "#fff",
              }}
            ></View>
          </View>
        ))}
        <Link
          href="/Achievements"
          style={[seeMore, { fontSize: BIGGER_FONT_SIZE }]}
        >
          Ver mais
        </Link>
      </View>
    </View>
  );
}

const { achievement, achievementList, achievementsContainer, seeMore } =
  StyleSheet.create({
    achievementsContainer: {
      width: "90%",
      justifyContent: "center",
      marginTop: 10,
    },
    achievementList: {
      width: "100%",
      backgroundColor: GlobalColors.sectionBackColor,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: GlobalFontColors.Dark,
      justifyContent: "space-evenly",
      flexDirection: "row",
    },
    achievement: {
      width: 80,
      height: 80,

      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    seeMore: {
      flex: 1,
      fontStyle: "italic",
      color: GlobalFontColors.Dark,
      textAlignVertical: "center",
      textAlign: "center",
    },
  });
