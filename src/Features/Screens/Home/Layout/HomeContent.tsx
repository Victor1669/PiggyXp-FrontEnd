import { ActivityIndicator, ScrollView, View } from "react-native";

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import { getPathDirection } from "../Helpers/getPathDirection";

import SectionLevel from "../Components/SectionLevel";
import SectionTitle from "../Components/SectionTitle";

import { HomeContentStyles } from "../Styles/HomeContent.css";
const { scrollView } = HomeContentStyles;

export default function HomeContent() {
  const { setShowSheet } = useShowSheet();
  const { levels, isLoading } = useLevels();

  const CONTENT_STYLES = {
    height: levels.length * 130,
  };

  function handleScrollBegin() {
    setShowSheet(false);
  }

  return (
    <>
      {isLoading ? (
        <View style={{ transform: [{ scale: 2 }], marginVertical: 10 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <SectionTitle />
      )}
      <ScrollView
        style={scrollView}
        contentContainerStyle={CONTENT_STYLES}
        onScrollBeginDrag={handleScrollBegin}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        bounces={false}
        overScrollMode="never"
      >
        <Content />
      </ScrollView>
    </>
  );
}

function Content() {
  const { levels } = useLevels();

  return levels.map((level, i) => {
    const actualPosition = level.containerPosition;
    const nextPosition = levels[i + 1]?.containerPosition;

    const pathDirection = getPathDirection(i, actualPosition, nextPosition);

    return (
      <SectionLevel
        key={i}
        index={i}
        pathDirection={pathDirection}
        level={level}
      />
    );
  });
}
